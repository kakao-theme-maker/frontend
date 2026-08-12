import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import { useThemeStore } from "@/store/customizeStore";

export default function ThemeBasicSettings() {
  const common = useThemeStore((state) => state.theme.common);
  const setCommon = useThemeStore((state) => state.setCommon);

  return (
    <div className="bg-white rounded-xl p-4">
      <h2>테마 기본 설정</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>
          <span>테마 이름</span>
          <Input
            type="text"
            className="bg-[#E4EBFE] border border-dashed border-[#aab6d8]"
          />
        </div>
        <div>
          <span>제작자</span>
          <Input
            type="text"
            className="bg-[#E4EBFE] border border-dashed border-[#aab6d8]"
          />
        </div>
      </div>

      <div>
        <span>테마 이미지</span>
        <label
          className="w-100 h-24 border block rounded-xl cursor-pointer
            bg-[#E4EBFE] border-dashed border-[#aab6d8] items-center justify-center"
        >
          <ImageUpload />
        </label>

        <span>기본 프로필</span>
        <label
          className="w-100 h-24 border block rounded-xl cursor-pointer
            bg-[#E4EBFE] border-dashed border-[#aab6d8] items-center justify-center"
        >
          <ImageUpload />
        </label>

        <div className="flex gap-4">
          <ColorChip
            label="메인 컬러"
            hex={common.mainBGColor}
            onChange={(color) => setCommon({ mainBGColor: color })}
          />
          <ColorChip
            label="메인 텍스트"
            hex={common.mainTextColor}
            onChange={(color) => setCommon({ mainTextColor: color })}
          />
          <ColorChip
            label="서브 텍스트"
            hex={common.mainDescriptionColor}
            onChange={(color) => setCommon({ mainDescriptionColor: color })}
          />
        </div>
      </div>
    </div>
  );
}