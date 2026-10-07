// src/hooks/useThemes.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Theme } from "@/api/types";
import {
  buildTheme, createTheme, getTheme, getThemeBuild, getThemeDownload, getThemes, getThemesByUser, updateTheme,
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

// 내가 만든 테마 목록(최신순) 조회 훅
export function useMyThemes() {
  const { data: me } = useMe();
  const publicUserId = me?.public_user_id ?? "";

  return useQuery({
    queryKey: ["themes", "user", publicUserId],
    // 내 테마 목록 요청
    queryFn: () => getThemesByUser(publicUserId),
    enabled: publicUserId !== "",
    select: sortByLatest,
  });
}

// 공개된 전체 테마 목록(최신순) 조회 훅
export function useAllThemes() {
  return useQuery({
    queryKey: ["themes", "all"],
    // 전체 테마 목록 요청
    queryFn: () => getThemes(),
    // 비공개 테마를 제외하고 최신순으로 정렬
    select: (themes) => sortByLatest(themes.filter((theme) => theme.isPublic)),
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
        me.user_email,
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
