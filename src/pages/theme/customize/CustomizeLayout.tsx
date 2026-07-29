// import { Outlet } from "react-router-dom";
// // import { BottomSheet } from "@/components/bottomsheet/BottomSheet";
// import { useEffect, useRef, useState } from "react";
// import { ChevronLeft, EllipsisVertical } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// // import type { SettingSection } from "@/types/customize";

import { Outlet } from "react-router-dom";

// export default function CustomizeLayout() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();
//   // const [sheetHeight, setSheetHeight] = useState(140);
//   const [sheetHeight] = useState(140);
//   const [previewScale, setPreviewScale] = useState(0.9);
//   // const [sections, setSections] = useState<SettingSection[]>([]);
//   const [setSections] = useState(140);

//   useEffect(() => {
//     const availableHeight = 700 - sheetHeight; // 바텀시트 뺀 나머지 공간
//     const newScale = Math.max(0.5, availableHeight / 700);
//     setPreviewScale(newScale);
//   }, [sheetHeight]);


//   return (
//     <div>
//       <div className="flex min-h-screen items-start justify-center py-4">
//         <div id="phone-root" ref={containerRef}
//           className="relative flex h-[700px] w-[340px] flex-col overflow-hidden border border-secondary-200 bg-white">
//           {/* 헤더 */}
//           <div className="flex justify-between items-center p-2">
//             <ChevronLeft size={24} className="s text-gray-500"
//               onClick={() => navigate("/custom")} />
//             <p className="text-center text-sm font-semibold py-2">Untitled</p>
//             <EllipsisVertical size={24} className="text-gray-500" />
//           </div>
//           <div className="relative w-[90%] max-w-[330px] aspect-[390/700]  origin-top
//         border border-gray-300 rounded-2xl p-1 text-xs overflow-hidden mx-auto"
//             style={{ transform: `scale(${previewScale})` }}>
//             <Outlet context={{ setSections }} />
//           </div>
//           {/* <BottomSheet sections={sections} onHeightChange={setSheetHeight} /> */}
//         </div>
//       </div>
//     </div>
//   )
// }


export default function CustomizeLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}