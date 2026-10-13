// src/hooks/useAccount.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/api/auth";
import type { UserProfileUpdateRequest } from "@/api/types";
import { changePassword, updateUserProfile, updateUserProfileImage } from "@/api/users";

// 로그아웃 훅 (성공 시 캐시를 비우고 홈으로 이동)
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    // 로그인 상태 캐시 제거 후 홈으로 이동
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
  });
}

// 프로필(이름/한줄소개) 수정 훅 (바뀐 값만 보냄)
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserProfileUpdateRequest) => updateUserProfile(body),
    // 내 정보 캐시 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}

// 프로필 이미지 수정 훅
export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => updateUserProfileImage(file),
    // 내 정보 캐시 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}

// 비밀번호 변경 훅
export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}