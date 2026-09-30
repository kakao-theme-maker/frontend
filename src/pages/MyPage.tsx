import { useState, type ReactNode } from "react";
import PasswordEditForm from "@/components/mypage/PasswordEditForm";
import PillButton from "@/components/mypage/PillButton";
import ProfileEditForm from "@/components/mypage/ProfileEditForm";
import ProfileSummary from "@/components/mypage/ProfileSummary";
import SettingRow from "@/components/mypage/SettingRow";
import type { ProfileFormValues, UserProfile } from "@/types/user";

// TODO(api): GET /api/users/me 로 교체
const MOCK_USER: UserProfile = {
  name: "이다현",
  handle: "rkwhr5471",
  bio: "제가만든 테마 배포합니다~~ 2차 가공 금지",
  postCount: 24,
  followerCount: 100,
  followingCount: 3,
};

// 한 번에 하나의 편집 영역만 열린다 (Figma: 기본 / 기본 정보 수정 / 비밀번호 수정)
type Mode = "view" | "editProfile" | "editPassword";

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-3xl bg-white px-5 py-6 sm:px-8 sm:py-8 lg:px-15">{children}</div>;
}

export default function MyPage() {
  const [mode, setMode] = useState<Mode>("view");
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  const handleProfileSubmit = (values: ProfileFormValues) => {
    // TODO(api): 이름/한줄소개 수정 API 연동
    setUser((prev) => ({ ...prev, ...values }));
    setMode("view");
  };

  const handlePasswordSubmit = () => {
    // TODO(api): 비밀번호 변경 API 연동 (인자로 받은 password 사용)
    setMode("view");
  };

  const handleLogout = () => {
    // TODO(api): POST /api/auth/local/sign-out → authStore.clear() → navigate("/")
  };

  const handleWithdraw = () => {
    if (!window.confirm("정말 탈퇴하시겠어요? 이 작업은 되돌릴 수 없어요.")) return;
    // TODO(api): 회원탈퇴 API 연동
  };

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 lg:px-20">
      <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">마이페이지</h1>

      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
        <Card>
          <ProfileSummary user={user} />
        </Card>

        {mode === "editProfile" ? (
          <>
            <Card>
              <ProfileEditForm
                defaultValues={{ name: user.name, bio: user.bio }}
                onSubmit={handleProfileSubmit}
              />
            </Card>
            <Card>
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
              <Card>
                <PasswordEditForm onSubmit={handlePasswordSubmit} />
              </Card>
            )}
          </>
        )}

        <Card>
          <div className="flex flex-col gap-6 sm:gap-8">
            <SettingRow label="로그아웃" actionLabel="로그아웃" onAction={handleLogout} />
            <SettingRow label="회원탈퇴" actionLabel="회원탈퇴" danger onAction={handleWithdraw} />
          </div>
        </Card>
      </div>
    </div>
  );
}