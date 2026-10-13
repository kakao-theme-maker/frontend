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