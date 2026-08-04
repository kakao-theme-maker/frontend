import Button from "@/components/common/Button";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";

export default function CustomizeMain() {
  return (
    <div className="py-8 px-20">

      <div className="flex w-full">
        <h1>새 테마 만들기 - 간편모드</h1>
        <div className="ml-auto">
          <Button>임시저장</Button>
          <Button>다운로드</Button>
        </div>
      </div>
      {/* 테마 기본 설정 */}
      <div>
        <div className="bg-white rounded-xl p-4">
          <h2>테마 기본 설정</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
            <div className="">
              <span>테마 이름</span>
              <Input type="text" className="bg-[#E4EBFE] border border-dashed border-[#aab6d8]" />
            </div>
            <div className="">
              <span>제작자</span>
              <Input type="text" className="bg-[#E4EBFE] border border-dashed border-[#aab6d8]" />
            </div>

          </div>
          <div>
            <span>테마 이미지</span>

            <label className="w-100 h-24 border block rounded-xl cursor-pointer
            bg-[#E4EBFE] border-dashed border-[#aab6d8] items-center justify-center">
              <ImageUpload />
            </label>

            <span>기본 프로필</span>

            <label className="w-100 h-24 border block rounded-xl cursor-pointer
            bg-[#E4EBFE] border-dashed border-[#aab6d8] items-center justify-center">
              <ImageUpload />
            </label>


          </div>
        </div>
      </div>

    </div>
  )
}
