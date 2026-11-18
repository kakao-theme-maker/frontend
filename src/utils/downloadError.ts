// src/utils/downloadError.ts
import { isAxiosError } from "axios";
import { DownloadStepError, type DownloadStep } from "@/hooks/useThemes";

// 실패한 단계 이름 (어느 API에서 실패했는지 안내용)
const STEP_LABEL: Record<DownloadStep, string> = {
  build: "빌드 시작",
  status: "빌드 상태 조회",
  download: "다운로드 주소 발급",
};

export interface DownloadFailure {
  // 실패 원인 안내 문구
  reason: string;
  // 실패한 단계 안내 문구 (단계를 알 수 없으면 null)
  stepLabel: string | null;
}

// 빌드·다운로드 에러를 화면에 보여줄 원인/단계 문구로 변환 (빌드 시작·상태 조회는 소유자 또는 관리자만 가능)
export function toDownloadFailure(error: unknown): DownloadFailure {
  const step = error instanceof DownloadStepError ? error.step : undefined;
  const cause = error instanceof DownloadStepError ? error.original : error;
  const stepLabel = step ? `${STEP_LABEL[step]} 단계에서 실패했어요.` : null;

  if (isAxiosError(cause)) {
    const status = cause.response?.status;
    if (status === 401) return { reason: "인증이 만료되었거나 이 작업을 할 수 없는 상태예요. 페이지를 새로고침한 뒤 다시 시도해 주세요.", stepLabel };
    if (status === 403) return { reason: "이 테마를 빌드할 권한이 없어요.", stepLabel };
    if (status === 404) return { reason: "테마 또는 빌드 결과를 찾지 못했어요.", stepLabel };
    return { reason: "다운로드에 실패했어요. 잠시 후 다시 시도해 주세요.", stepLabel };
  }
  return {
    reason: cause instanceof Error ? cause.message : "다운로드에 실패했어요.",
    stepLabel,
  };
}
