export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  profileImage?: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export interface ProfileFormValues {
  name: string;
  bio: string;
}
