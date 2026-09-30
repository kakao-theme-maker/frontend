import type { UserProfile } from "@/types/user";

interface ProfileSummaryProps {
  user: UserProfile;
}

export default function ProfileSummary({ user }: ProfileSummaryProps) {
  const stats = [
    { label: "게시물", value: user.postCount },
    { label: "팔로워", value: user.followerCount },
    { label: "팔로잉", value: user.followingCount },
  ];

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${user.name} 프로필 이미지`}
            className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32 lg:h-36 lg:w-36"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-24 w-24 rounded-full bg-slate-300 sm:h-32 sm:w-32 lg:h-36 lg:w-36"
          />
        )}

        <div>
          <h2 className="text-xl font-bold text-slate-600 sm:text-2xl lg:text-3xl">{user.name}</h2>
          <p className="text-base text-slate-600 sm:text-lg lg:text-2xl">@{user.handle}</p>
        </div>

        {user.bio && <p className="break-words text-base lg:text-xl">{user.bio}</p>}
      </div>

      <dl className="mt-8 flex justify-center gap-8 sm:gap-12">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col-reverse items-center gap-1">
            <dt className="text-sm sm:text-base lg:text-2xl">{label}</dt>
            <dd className="text-xl font-bold sm:text-2xl lg:text-3xl">
              {value.toLocaleString("ko-KR")}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
