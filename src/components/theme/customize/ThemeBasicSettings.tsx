import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import { useThemeStore } from "@/store/customizeStore";

export default function ThemeBasicSettings() {
  const common = useThemeStore((state) => state.theme.common);
  const setCommon = useThemeStore((state) => state.setCommon);

  return (
    <div className="rounded-xl bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">테마 기본 설정</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="mb-1.5 block text-sm text-[#5B6C9B]">테마 이름</span>
          <Input
            type="text"
            className="border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
          />
        </div>
        <div>
          <span className="mb-1.5 block text-sm text-[#5B6C9B]">제작자</span>
          <Input
            type="text"
            className="border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <span className="mb-1.5 block text-sm text-[#5B6C9B]">테마 이미지</span>
          <ImageUpload
            value={common.mainBGImage}
            onChange={(url) => setCommon({ mainBGImage: url })}
            onRemove={() => setCommon({ mainBGImage: "" })}
            alt="테마 배경 이미지"
          />
        </div>

        <div>
          <span className="mb-1.5 block text-sm text-[#5B6C9B]">기본 프로필</span>
          <ImageUpload
            value={common.profileImage01}
            onChange={(url) => setCommon({ profileImage01: url })}
            onRemove={() => setCommon({ profileImage01: "" })}
            alt="기본 프로필 이미지"
          />
        </div>

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