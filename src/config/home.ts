// src/config/home.ts

// 비로그인 홈의 테마 제작 안내 단계
export const GUEST_STEPS = [
  { step: "01", description: ["간편 모드와 디자인 모드 중", "원하는 편집 방식을 선택해 주세요."] },
  { step: "02", description: ["배경, 이미지, 색상을 자유롭게 조합해", "나만의 테마를 완성해 보세요."] },
  { step: "03", description: ["완성한 테마를 저장하고", "다른 사람들과 멋진 디자인을 공유해 보세요."] },
] as const;

// 비로그인 홈에서 보여줄 다른 사람들의 테마 개수
export const GUEST_THEMES_COUNT = 18;

// 비로그인 홈의 "테마 만들러 가기"로 로그인한 뒤 이동할 주소
export const CREATE_THEME_PATH = "/themes/new/customize";
