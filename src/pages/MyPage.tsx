// src/pages/MyPage.tsx
import { useState } from "react";
import Card from "@/components/common/Card";
import PasswordEditForm from "@/components/mypage/PasswordEditForm";
import PillButton from "@/components/mypage/PillButton";
import ProfileEditForm from "@/components/mypage/ProfileEditForm";
import ProfileSummary from "@/components/mypage/ProfileSummary";
import SettingRow from "@/components/mypage/SettingRow";
import type { ProfileFormValues } from "@/types/user";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import QueryStatus from "@/components/common/QueryStatus";
import { useChangePassword, useLogout, useUpdateName } from "@/hooks/useAccount";
import useMe from "@/hooks/useMe";
import { toUserProfile } from "@/utils/user";

type Mode = "view" | "editProfile" | "editPassword";

const CARD_CLASS = "lg:px-15";

// 마이페이지 (보기/프로필 수정/비밀번호 수정 모드 전환)
export default function MyPage() {
  const [mode, setMode] = useState<Mode>("view");
  const [edits, setEdits] = useState<Partial<ProfileFormValues>>({});
  const { data: me, isLoading, isError } = useMe();
  const updateName = useUpdateName();
  const changePassword = useChangePassword();
  const logout = useLogout();

  // 이름은 서버에 저장하고, 한줄소개는 저장 API가 없어 화면에만 반영한 뒤 보기 모드로 복귀
  const handleProfileSubmit = (values: ProfileFormValues) => {
    const finish = () => {
      setEdits({ bio: values.bio });
      setMode("view");
    };

    if (values.name === me?.name) {
      finish();
      return;
    }
    updateName.mutate(values.name, {
      onSuccess: finish,
      onError: () => window.alert("프로필 수정에 실패했어요. 다시 시도해 주세요."),
    });
  };

  // 비밀번호 변경 후 보기 모드로 복귀
  const handlePasswordSubmit = (values: { currentPassword: string; newPassword: string }) => {
    changePassword.mutate(values, {
      onSuccess: () => setMode("view"),
      onError: () => window.alert("비밀번호 변경에 실패했어요. 현재 비밀번호를 확인해 주세요."),
    });
  };

  // 로그아웃 요청
  const handleLogout = () => {
    logout.mutate(undefined, {
      onError: () => window.alert("로그아웃에 실패했어요. 다시 시도해 주세요."),
    });
  };

  // 회원탈퇴 확인 후 처리
  const handleWithdraw = () => {
    if (!window.confirm("정말 탈퇴하시겠어요? 이 작업은 되돌릴 수 없어요.")) return;
    // 탈퇴 API가 아직 없어서 확인까지만 처리
  };

  if (!me) {
    return (
      <PageContainer>
        <PageTitle>마이페이지</PageTitle>
        <QueryStatus isLoading={isLoading} isError={isError} />
      </PageContainer>
    );
  }

  const user = { ...toUserProfile(me), ...edits };

  return (
    <PageContainer>
      <PageTitle>마이페이지</PageTitle>

      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
        <Card className={CARD_CLASS}>
          <ProfileSummary user={user} />
        </Card>

        {mode === "editProfile" ? (
          <>
            <Card className={CARD_CLASS}>
              <ProfileEditForm
                defaultValues={{ name: user.name, bio: user.bio }}
                onSubmit={handleProfileSubmit}
              />
            </Card>
            <Card className={CARD_CLASS}>
              <SettingRow
                label="비밀번호 수정"
                actionLabel="수정하기"
                onAction={() => setMode("editPassword")}
              />
            </Card>
          </>
        ) : (
          <>
            <PillButton onClick={() => setMode("editProfile")}>기본 정보 수정하기</PillButton>
            {mode === "editPassword" && (
              <Card className={CARD_CLASS}>
                <PasswordEditForm onSubmit={handlePasswordSubmit} />
              </Card>
            )}
          </>
        )}

        <Card className={CARD_CLASS}>
          <div className="flex flex-col gap-6 sm:gap-8">
            <SettingRow label="로그아웃" actionLabel="로그아웃" onAction={handleLogout} />
            <SettingRow label="회원탈퇴" actionLabel="회원탈퇴" danger onAction={handleWithdraw} />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}