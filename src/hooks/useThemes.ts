// src/hooks/useThemes.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Theme } from "@/api/types";
import {
  buildTheme, createTheme, deleteTheme, getTheme, getThemeBuild, getThemeDownload, getPublicThemes, getThemesByUser, updateTheme,
} from "@/api/themes";
import type { Platform } from "@/api/types";
import { useThemeStore } from "@/store/customizeStore";
import { useUploadedImageStore } from "@/store/uploadedImageStore";
import { toThemeUpsertRequest } from "@/utils/themeRequest";
import useMe from "./useMe";

// 테마 목록을 최신 생성일 순으로 정렬
function sortByLatest(themes: Theme[]) {
  return [...themes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// 내 테마는 한 번에 넉넉히 받아 프론트에서 정렬/페이지 처리 (서버 기본 크기는 20개)
const MY_THEMES_FETCH_SIZE = 100;

// 내가 만든 테마 목록(최신순) 조회 훅
export function useMyThemes() {
  const { data: me } = useMe();
  const publicUserId = me?.publicUserId ?? "";

  return useQuery({
    queryKey: ["themes", "user", publicUserId],
    // 내 테마 목록 요청
    queryFn: () => getThemesByUser(publicUserId, { size: MY_THEMES_FETCH_SIZE }),
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
const BUILD_POLL_MAX = 30;

// 지정한 시간(ms)만큼 대기
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 테마 임시저장 훅 (themeId가 없으면 새로 만들고, 있으면 수정). 저장된 테마 id 반환
export function useSaveTheme() {
  const { data: me } = useMe();
  const queryClient = useQueryClient();

  return useMutation({
    // 현재 스토어의 테마 설정을 서버에 저장
    mutationFn: async ({ themeId, themeName }: { themeId?: number; themeName: string }) => {
      if (!me) throw new Error("로그인 정보를 불러오지 못했어요.");
      const body = toThemeUpsertRequest(
        useThemeStore.getState().theme,
        themeName,
        me.userEmail,
        useUploadedImageStore.getState().ids,
      );

      if (themeId === undefined) {
        const created = await createTheme(body);
        return created.themeComponentId;
      }
      await updateTheme(themeId, body);
      return themeId;
    },
    // 저장 후 테마 목록 캐시 무효화
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["themes"] }),
  });
}

// 테마 빌드 후 다운로드 URL을 반환하는 훅 (빌드 완료까지 상태 폴링)
export function useDownloadTheme() {
  return useMutation({
    mutationFn: async ({ themeId, platform }: { themeId: number; platform: Platform }) => {
      const { buildId } = await buildTheme(themeId);

      for (let i = 0; i < BUILD_POLL_MAX; i++) {
        const build = await getThemeBuild(buildId);
        if (build.status === "success") {
          const { downloadUrl } = await getThemeDownload(themeId, platform);
          return downloadUrl;
        }
        if (build.status === "failed") throw new Error("테마 빌드에 실패했어요.");
        await sleep(BUILD_POLL_INTERVAL);
      }
      throw new Error("테마 빌드 시간이 너무 오래 걸려요.");
    },
  });
}