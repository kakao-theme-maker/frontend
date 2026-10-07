// src/components/mypage/ProfileSummary.tsx
import Avatar from "@/components/common/Avatar";
import type { UserProfile } from "@/types/user";

interface ProfileSummaryProps {
  user: UserProfile;
}

// 프로필 요약(이름, 소개, 게시물/팔로워/팔로잉) 컴포넌트
export default function ProfileSummary({ user }: ProfileSummaryProps) {
  const stats = [
    { label: "게시물", value: user.postCount },
    { label: "팔로워", value: user.followerCount },
    { label: "팔로잉", value: user.followingCount },
  ];

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <Avatar src={user.profileImage} alt={`${user.name} 프로필 이미지`} size="xl" />

        <div>
          <h2 className="text-lg font-bold text-slate-600 sm:text-xl lg:text-2xl">{user.name}</h2>
          <p className="text-sm text-slate-600 sm:text-base">@{user.handle}</p>
        </div>

        {user.bio && <p className="break-words text-sm sm:text-base">{user.bio}</p>}
      </div>

      <dl className="mt-8 flex justify-center gap-8 sm:gap-12">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col-reverse items-center gap-1">
            <dt className="text-sm">{label}</dt>
            <dd className="text-lg font-bold sm:text-xl">
              {value.toLocaleString("ko-KR")}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
