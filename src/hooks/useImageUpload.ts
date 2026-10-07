// src/hooks/useImageUpload.ts
import { useMutation } from "@tanstack/react-query";
import { createDesignComponent } from "@/api/designComponents";
import { useUploadedImageStore } from "@/store/uploadedImageStore";

// 이미지 업로드 훅 (성공 시 업로드한 이미지 URL과 designComponentId를 기억)
export default function useImageUpload() {
  const register = useUploadedImageStore((state) => state.register);

  return useMutation({
    mutationFn: (file: File) => createDesignComponent(file),
    // 업로드 결과 등록
    onSuccess: (component) => register(component.image_url, component.design_component_id),
  });
}
