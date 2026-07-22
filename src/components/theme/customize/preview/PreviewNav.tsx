
import { useThemeStore } from '@/store/customizeStore'

interface INavPreviewProps {
  selectedTab: 'friends' | 'chats' | 'openchats' | 'shopping' | 'more'
}

export default function PreviewNav({ selectedTab }: INavPreviewProps) {
  const tabBar = useThemeStore(
    (state) => state.theme.tabBar
  )

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="relative w-full">
        <img src={tabBar.bgImage} className="w-full"
          style={{
            backgroundColor: 'white',
            backgroundImage: `url(${tabBar.bgImage})`,
          }} />
        <nav className="absolute inset-0 grid grid-cols-5 justify-items-center items-center text-center text-gray-900">
          <img
            src={
              selectedTab === 'friends'
                ? tabBar.friendsSelected
                : tabBar.friends
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'chats'
                ? tabBar.chatsSelected
                : tabBar.chats
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'openchats'
                ? tabBar.nowSelected
                : tabBar.now
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'shopping'
                ? tabBar.shoppingSelected
                : tabBar.shopping
            }
            className="w-7"
          />

          <img
            src={
              selectedTab === 'more'
                ? tabBar.moreSelected
                : tabBar.more
            }
            className="w-7"
          />
        </nav>
      </div>
    </div>
  )
}