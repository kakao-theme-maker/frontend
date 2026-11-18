// src/utils/user.ts
import type { UserResponse } from "@/api/types";
import type { UserProfile } from "@/types/user";

// API 사용자 응답을 화면용 프로필 정보로 변환
export function toUserProfile(me: UserResponse): UserProfile {
  return {
    name: me.name,
    handle: me.publicUserId,
    bio: me.introduce ?? "",
    profileImage: me.profileImage || undefined,
    postCount: me.uploads,
    followerCount: me.followers,
    followingCount: me.following,
  };
}

// 게스트 사용자 여부 (임시 기준: 게스트는 /api/users/me가 200으로 오지만 이메일이 없음)
// 백엔드가 role 같은 필드를 내려주면 그 값으로 교체할 것
export function isGuestUser(me?: UserResponse | null): boolean {
  return !!me && !me.userEmail;
}