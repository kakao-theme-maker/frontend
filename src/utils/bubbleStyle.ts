// src/utils/bubbleStyle.ts
// "url 22px 17px" 문자열을 { url, width, height }로 파싱
export function parseAsset(value: string) {
  const [url = "", w, h] = value.trim().split(/\s+/);
  return { url, width: parseInt(w) || 0, height: parseInt(h) || 0 };
}

// url, 가로, 세로를 "url 22px 17px" 문자열로 변환
export function formatAsset(url: string, width: number, height: number) {
  return `${url} ${width}px ${height}px`;
}

// "top left bottom right" 형태의 여백 문자열을 파싱
export function parseEdgeInsets(insets: string) {
  const [top, left, bottom, right] = insets
    .trim()
    .split(/\s+/)
    .map((v) => parseInt(v) || 0);
  return { top, right, bottom, left };
}

// 말풍선 border-image 스타일 값 계산
export function getBubbleStyle(backgroundImage: string, titleEdgeInsets: string) {
  const { url, width: capY, height: capX } = parseAsset(backgroundImage);
  const { top, right, bottom, left } = parseEdgeInsets(titleEdgeInsets);

  const sliceTop = top + capY;
  const sliceRight = right + capX;
  const sliceBottom = bottom + capY;
  const sliceLeft = left + capX;

  return {
    borderImageSource: `url(${url})`,
    borderImageSlice: `${sliceTop} ${sliceRight} ${sliceBottom} ${sliceLeft} fill`,
    borderWidth: "10px",
  };
}
