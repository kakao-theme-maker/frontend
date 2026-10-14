// src/hooks/useImageUpload.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDesignComponent, getComponentTypes } from "@/api/designComponents";
import { useUploadedImageStore } from "@/store/uploadedImageStore";

// 이미지 업로드 훅 (typeCode: 이 이미지가 쓰일 슬롯, 성공 시 업로드한 이미지 URL과 designComponentId를 기억)
export default function useImageUpload(typeCode: string) {
  const queryClient = useQueryClient();
  const register = useUploadedImageStore((state) => state.register);

  return useMutation({
    mutationFn: async (file: File) => {
      // 이미지 종류 목록은 바뀌지 않으므로 한 번만 받아 재사용
      const types = await queryClient.fetchQuery({
        queryKey: ["component-types"],
        queryFn: getComponentTypes,
        staleTime: Infinity,
      });
      // 같은 typeCode의 플랫폼별 종류를 모두 연결
      const componentTypeIds = types
        .filter((type) => type.typeCode === typeCode)
        .map((type) => type.componentTypeId);
      if (componentTypeIds.length === 0) throw new Error("이미지 종류를 찾지 못했어요.");

      return createDesignComponent(file, componentTypeIds);
    },
    // 업로드 결과 등록
    onSuccess: (component) => register(component.imageUrl, component.designComponentId),
  });
}