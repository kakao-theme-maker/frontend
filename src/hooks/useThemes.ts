// src/hooks/useThemes.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Platform, ThemeDetailResponse } from "@/api/types";
import {
  buildTheme, createTheme, deleteTheme, getTheme, getThemeBuild, getThemeDownload, getPublicThemes, getThemesByUser, updateTheme,
} from "@/api/themes";
import { MY_LIST_FETCH_SIZE } from "@/config/pagination";
import { useThemeStore } from "@/store/customizeStore";
import { usePendingImageStore } from "@/store/pendingImageStore";
import { sortByLatest } from "@/utils/sort";
import { toThemeUpdateRequest } from "@/utils/themeRequest";
import useMe from "./useMe";

// 빌드·다운로드 중 어느 단계에서 실패했는지 함께 담는 에러 (원인 API를 구분해 안내하기 위함)
export type DownloadStep = "build" | "status" | "download";
export class DownloadStepError extends Error {
  readonly step: DownloadStep;
  readonly original: unknown;
  constructor(step: DownloadStep, original: unknown) {
    super(`theme ${step} failed`);
    this.step = step;
    this.original = original;
  }
}
async function inStep<T>(step: DownloadStep, task: Promise<T>): Promise<T> {
  try {
    return await task;
  } catch (error) {
    throw new DownloadStepError(step, error);
  }
}

// 내가 만든 테마 목록(최신순) 조회 훅
export function useMyThemes() {
  const { data: me } = useMe();
  const publicUserId = me?.publicUserId ?? "";

  return useQuery({
    queryKey: ["themes", "user", publicUserId],
    // 내 테마 목록 요청
    queryFn: () => getThemesByUser(publicUserId, { size: MY_LIST_FETCH_SIZE }),
    enabled: publicUserId !== "",
    select: sortByLatest,
  });
}

// 홈에서 보여줄 공개 테마를 받아오는 개수 (내 테마를 제외하고도 충분하도록 넉넉히)
const PUBLIC_THEMES_FETCH_SIZE = 20;

// 공개된 테마 목록(최신순) 조회 훅
export function useAllThemes() {
  return useQuery({
    queryKey: ["themes", "public"],
    // 공개 테마를 최신순으로 요청 (서버 기본 정렬은 오래된순)
    queryFn: () => getPublicThemes({ size: PUBLIC_THEMES_FETCH_SIZE, sort: ["createdAt,desc"] }),
    select: sortByLatest,
  });
}

// 테마 삭제 훅
export function useDeleteTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (themeId: number) => deleteTheme(themeId),
    // 테마 목록 캐시 무효화
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["themes"] }),
  });
}

// 테마 한 건 조회 훅
export function useTheme(themeId?: number) {
  return useQuery({
    queryKey: ["themes", "detail", themeId],
    // 테마 한 건 요청
    queryFn: () => getTheme(themeId as number),
    enabled: themeId !== undefined,
  });
}

const BUILD_POLL_INTERVAL = 2000;
const BUILD_POLL_MAX = 90;

// 지정한 시간(ms)만큼 대기
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 테마 임시저장 훅 (themeId가 없으면 새로 만들고, 있으면 수정). 저장된 테마 id 반환
export function useSaveTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    // 현재 스토어의 테마 설정을 서버에 저장
    mutationFn: async ({ themeId, themeName }: { themeId?: number; themeName: string }) => {
      let id = themeId;
      let base: ThemeDetailResponse;
      const isNewTheme = id === undefined;

      if (id === undefined) {
        // 새 테마: 기본 이미지·색상이 채워진 테마를 먼저 만든 뒤, 편집한 내용을 덮어씀
        base = await createTheme();
        id = base.themeComponentId;
      } else {
        base = await queryClient.fetchQuery({
          queryKey: ["themes", "detail", id],
          queryFn: () => getTheme(id as number),
        });
      }

      const pending = usePendingImageStore.getState();
      const body = toThemeUpdateRequest(
        useThemeStore.getState().theme,
        themeName,
        { files: pending.files, removed: pending.removed },
        base,
      );
      try {
        // 서버가 검증·저장에 실패하면 수정 내용 전체를 롤백하므로, 성공했을 때만 보관 중인 이미지 변경분을 비움
        await updateTheme(id, body, pending.files);
      } catch (error) {
        // 롤백 대상은 수정 요청뿐이라, 방금 새로 만든 테마는 서버에 남음 -> 재시도 때 빈 테마가 쌓이지 않게 정리
        if (isNewTheme) await deleteTheme(id).catch(() => undefined);
        throw error;
      }
      usePendingImageStore.getState().clear();
      return id;
    },
    // 저장 후 테마 목록·상세 캐시 무효화 (상세를 다시 받으면 blob 미리보기가 서버 이미지 URL로 교체됨)
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["themes"] }),
  });
}

// 테마 빌드 후 다운로드 URL을 반환하는 훅 (빌드 완료까지 상태 폴링)
// - 빌드 상태 응답의 downloadUrl은 항상 null이므로 SUCCESS 확인 뒤 download API로 따로 발급받음
// - download API는 "최신 성공 빌드"의 URL을 주므로 반드시 이번 빌드가 SUCCESS인 것을 확인한 뒤 호출
// - 링크는 발급 후 48시간만 유효하므로 저장·캐시하지 않고 다운로드할 때마다 새로 발급
export function useDownloadTheme() {
  return useMutation({
    mutationFn: async ({ themeId, platform }: { themeId: number; platform: Platform }) => {
      const { buildId } = await inStep("build", buildTheme(themeId, platform));

      for (let i = 0; i < BUILD_POLL_MAX; i++) {
        const build = await inStep("status", getThemeBuild(buildId));
        if (build.status === "SUCCESS") {
          const { downloadUrl } = await inStep("download", getThemeDownload(themeId, platform));
          if (!downloadUrl) throw new Error("다운로드 주소를 받지 못했어요. 다시 시도해 주세요.");
          return downloadUrl;
        }
        if (build.status === "FAILED") throw new Error("테마 빌드에 실패했어요.");
        await sleep(BUILD_POLL_INTERVAL);
      }
      throw new Error("테마 빌드 시간이 너무 오래 걸려요.");
    },
  });
}