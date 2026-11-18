// src/pages/theme/ThemeDownload.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultThemeIcon from "@/assets/images/commonIcoTheme.png";
import type { Platform } from "@/api/types";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Checkbox from "@/components/common/Checkbox";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import QueryStatus from "@/components/common/QueryStatus";
import SectionTitle from "@/components/common/SectionTitle";
import PreviewFrame from "@/components/theme/customize/PreviewFrame";
import { TABS } from "@/config/customizeTabs";
import useMe, { useMember } from "@/hooks/useMe";
import { useDownloadTheme, useTheme } from "@/hooks/useThemes";
import { useThemeStore } from "@/store/customizeStore";
import { usePendingImageStore } from "@/store/pendingImageStore";
import { toDownloadFailure } from "@/utils/downloadError";
import { fromThemeDetail } from "@/utils/themeRequest";

const PLATFORM_LABEL: Record<Platform, string> = { ANDROID: "안드로이드", IOS: "IOS" };

// 테마 다운로드 페이지 (다운로드 확인 -> 빌드 진행 -> 완료 / 실패)
export default function ThemeDownload() {
  const navigate = useNavigate();
  const { id } = useParams();
  const themeId = id !== undefined && !Number.isNaN(Number(id)) ? Number(id) : undefined;

  const [platform, setPlatform] = useState<Platform>("ANDROID");
  const [downloadedPlatform, setDownloadedPlatform] = useState<Platform | null>(null);

  const { data: loadedTheme, isLoading, isError } = useTheme(themeId);
  const { data: me } = useMe();
  const { data: member } = useMember();
  const applyServerTheme = useThemeStore((state) => state.applyServerTheme);
  const themeName = useThemeStore((state) => state.themeName);
  const themeIcon = useThemeStore((state) => state.theme.common.icon);
  const downloadTheme = useDownloadTheme();

  // 서버의 테마를 스토어에 반영해 미리보기에 사용 (새로고침해도 같은 화면이 보이도록)
  useEffect(() => {
    if (!loadedTheme) return;
    const { themeName: name, patch } = fromThemeDetail(loadedTheme);
    usePendingImageStore.getState().clear();
    applyServerTheme(name, patch);
  }, [loadedTheme, applyServerTheme]);

  const phase = downloadTheme.isPending
    ? "building"
    : downloadTheme.isSuccess
      ? "success"
      : downloadTheme.isError
        ? "failed"
        : "confirm";

  // 빌드 시작 -> 완료되면 받은 주소로 파일 다운로드
  const handleDownload = () => {
    if (themeId === undefined) return;
    const target = platform;
    downloadTheme.mutate(
      { themeId, platform: target },
      {
        onSuccess: (url) => {
          setDownloadedPlatform(target);
          window.location.assign(url);
        },
      },
    );
  };

  // 실패 후 다시 확인 화면으로
  const handleRetry = () => downloadTheme.reset();

  if (themeId === undefined) {
    return (
      <PageContainer>
        <QueryStatus isLoading={false} isError />
      </PageContainer>
    );
  }

  const failure = downloadTheme.isError ? toDownloadFailure(downloadTheme.error) : null;
  const shownPlatform = downloadedPlatform ?? platform;
  const TITLES = {
    confirm: "테마를 다운로드 하시겠습니까?",
    building: "테마 빌드 중 ...",
    success: "테마 다운로드가 완료되었습니다!",
    failed: "테마 빌드를 실패했습니다!",
  } as const;

  return (
    <PageContainer>
      <PageTitle className={phase === "failed" ? "text-danger" : ""}>{TITLES[phase]}</PageTitle>

      {failure && (
        <Card className="mt-6 flex flex-col gap-2 font-bold text-danger">
          <p>{failure.reason}</p>
          {failure.stepLabel && <p>{failure.stepLabel}</p>}
        </Card>
      )}

      <QueryStatus isLoading={isLoading} isError={isError} />

      {loadedTheme && (
        <>
          <Card className="mt-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={themeIcon || defaultThemeIcon}
                alt=""
                className="aspect-square w-40 shrink-0 rounded-2xl border-2 border-primary-soft-hover object-cover sm:w-56"
              />

              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">{themeName}</h2>
                <p className="font-bold text-heading">{me?.name ?? "게스트"}</p>

                {phase === "confirm" ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-heading">테마 종류</p>
                    <div className="flex gap-4">
                      {(["IOS", "ANDROID"] as const).map((p) => (
                        <Checkbox
                          key={p}
                          label={`${PLATFORM_LABEL[p]} 테마`}
                          checked={platform === p}
                          onChange={() => setPlatform(p)}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="font-bold text-heading">{PLATFORM_LABEL[shownPlatform]}</p>
                )}
              </div>
            </div>

            {phase === "confirm" && (
              <Button size="xl" rounded="lg" className="mt-6 font-bold" onClick={handleDownload}>
                {PLATFORM_LABEL[platform]} 다운로드 하기
              </Button>
            )}
          </Card>

          <Card className="mt-4">
            <SectionTitle size="md" className="mb-4">미리보기</SectionTitle>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {TABS.map(({ key, label, Screen }) => (
                <div key={key} className="min-w-0 bg-app-bg p-3">
                  <h3 className="mb-2 truncate text-xs font-semibold">{label}</h3>
                  <PreviewFrame Screen={Screen} />
                </div>
              ))}
            </div>
          </Card>

          {phase === "success" && member && (
            <div className="mt-4 flex justify-end">
              <Button size="lg" rounded="lg" className="font-bold" onClick={() => navigate(`/community/write?themeId=${themeId}`)}>
                게시글로 내 테마 자랑하러 가기
              </Button>
            </div>
          )}

          {phase === "failed" && (
            <div className="mt-4 flex justify-end">
              <Button size="lg" rounded="lg" variant="outline" onClick={handleRetry}>
                다시 시도하기
              </Button>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
