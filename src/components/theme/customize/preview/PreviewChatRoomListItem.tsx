import { useThemeStore } from "@/store/customizeStore"

export default function PreviewChatRoomListItem() {
  const common = useThemeStore(
    (state) => state.theme.common
  )

  return (
    <div className="flex flex-row gap-2">
      <img
        src={common.profileImage01}
        className="w-10 h-10 object-cover rounded-2xl"
      />
      <div className="flex-1 flex flex-col">
        <span>어피치</span>
        <span>오늘의 장보기 목록</span>
      </div>
      <div>
        <span className='text-gray-500'>오후 3:45</span>
      </div>
    </div>
  )
}
