// BubbleEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import { useThemeStore } from "@/store/customizeStore";

// "url 22px 17px" <-> { url, width, height }
function parseAsset(value: string) {
  const [url = "", w, h] = value.trim().split(/\s+/);
  return { url, width: parseInt(w) || 0, height: parseInt(h) || 0 };
}
function formatAsset(url: string, width: number, height: number) {
  return `${url} ${width}px ${height}px`;
}

export default function BubbleEditor() {
  const bubble = useThemeStore((state) => state.theme.bubble);
  const setBubble = useThemeStore((state) => state.setBubble);

  const receive01 = parseAsset(bubble.receive01);
  const receive02 = parseAsset(bubble.receive02);
  const send01 = parseAsset(bubble.send01);
  const send02 = parseAsset(bubble.send02);

  return (
    <div className="flex flex-col gap-6">
      {/* 받는 말풍선 */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">받는 말풍선</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="mb-1.5 block text-sm text-[#5B6C9B]">배경 이미지 1</span>
            <ImageUpload
              size={100}
              value={receive01.url}
              onChange={(url) =>
                setBubble({ receive01: formatAsset(url, receive01.width, receive01.height) })
              }
              onRemove={() =>
                setBubble({ receive01: formatAsset("", receive01.width, receive01.height) })
              }
              alt="받는 말풍선 배경 이미지 1"
            />
            <div className="mt-2 flex gap-2">
              <Input
                type="number"
                value={receive01.width}
                onChange={(e) =>
                  setBubble({ receive01: formatAsset(receive01.url, Number(e.target.value), receive01.height) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
              <Input
                type="number"
                value={receive01.height}
                onChange={(e) =>
                  setBubble({ receive01: formatAsset(receive01.url, receive01.width, Number(e.target.value)) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm text-[#5B6C9B]">배경 이미지 2</span>
            <ImageUpload
              size={100}
              value={receive02.url}
              onChange={(url) =>
                setBubble({ receive02: formatAsset(url, receive02.width, receive02.height) })
              }
              onRemove={() =>
                setBubble({ receive02: formatAsset("", receive02.width, receive02.height) })
              }
              alt="받는 말풍선 배경 이미지 2"
            />
            <div className="mt-2 flex gap-2">
              <Input
                type="number"
                value={receive02.width}
                onChange={(e) =>
                  setBubble({ receive02: formatAsset(receive02.url, Number(e.target.value), receive02.height) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
              <Input
                type="number"
                value={receive02.height}
                onChange={(e) =>
                  setBubble({ receive02: formatAsset(receive02.url, receive02.width, Number(e.target.value)) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
            </div>
          </div>

          <ColorChip
            label="텍스트 색상"
            hex={bubble.receiveTextColor}
            onChange={(color) => setBubble({ receiveTextColor: color })}
          />
        </div>

        <p className="mb-1.5 mt-4 text-sm text-[#5B6C9B]">여백 (padding)</p>
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="mb-1.5 block text-xs text-[#8494bf]">개별 말풍선</span>
            <Input
              type="text"
              value={bubble.receiveEdgeInsets}
              onChange={(e) => setBubble({ receiveEdgeInsets: e.target.value })}
              className="border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
            />
          </div>
          <div>
            <span className="mb-1.5 block text-xs text-[#8494bf]">연속 그룹 말풍선</span>
            <Input
              type="text"
              value={bubble.receiveGroupEdgeInsets}
              onChange={(e) => setBubble({ receiveGroupEdgeInsets: e.target.value })}
              className="border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
            />
          </div>
        </div>
      </div>

      {/* 보내는 말풍선 */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">보내는 말풍선</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="mb-1.5 block text-sm text-[#5B6C9B]">배경 이미지 1</span>
            <ImageUpload
              size={100}
              value={send01.url}
              onChange={(url) =>
                setBubble({ send01: formatAsset(url, send01.width, send01.height) })
              }
              onRemove={() =>
                setBubble({ send01: formatAsset("", send01.width, send01.height) })
              }
              alt="보내는 말풍선 배경 이미지 1"
            />
            <div className="mt-2 flex gap-2">
              <Input
                type="number"
                value={send01.width}
                onChange={(e) =>
                  setBubble({ send01: formatAsset(send01.url, Number(e.target.value), send01.height) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
              <Input
                type="number"
                value={send01.height}
                onChange={(e) =>
                  setBubble({ send01: formatAsset(send01.url, send01.width, Number(e.target.value)) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
            </div>
          </div>

          <div>
            <span className="mb-1.5 block text-sm text-[#5B6C9B]">배경 이미지 2</span>
            <ImageUpload
              size={100}
              value={send02.url}
              onChange={(url) =>
                setBubble({ send02: formatAsset(url, send02.width, send02.height) })
              }
              onRemove={() =>
                setBubble({ send02: formatAsset("", send02.width, send02.height) })
              }
              alt="보내는 말풍선 배경 이미지 2"
            />
            <div className="mt-2 flex gap-2">
              <Input
                type="number"
                value={send02.width}
                onChange={(e) =>
                  setBubble({ send02: formatAsset(send02.url, Number(e.target.value), send02.height) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
              <Input
                type="number"
                value={send02.height}
                onChange={(e) =>
                  setBubble({ send02: formatAsset(send02.url, send02.width, Number(e.target.value)) })
                }
                className="w-16 border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
              />
            </div>
          </div>

          <ColorChip
            label="텍스트 색상"
            hex={bubble.sendTextColor}
            onChange={(color) => setBubble({ sendTextColor: color })}
          />
        </div>

        <p className="mb-1.5 mt-4 text-sm text-[#5B6C9B]">여백 (padding)</p>
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="mb-1.5 block text-xs text-[#8494bf]">개별 말풍선</span>
            <Input
              type="text"
              value={bubble.sendEdgeInsets}
              onChange={(e) => setBubble({ sendEdgeInsets: e.target.value })}
              className="border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
            />
          </div>
          <div>
            <span className="mb-1.5 block text-xs text-[#8494bf]">연속 그룹 말풍선</span>
            <Input
              type="text"
              value={bubble.sendGroupEdgeInsets}
              onChange={(e) => setBubble({ sendGroupEdgeInsets: e.target.value })}
              className="border border-dashed border-[#aab6d8] bg-[#E4EBFE]"
            />
          </div>
        </div>
      </div>

      {/* 기타 */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">기타</h3>
        <div className="flex gap-4">
          <ColorChip
            label="안읽음 숫자 색상"
            hex={bubble.unreadCountColor}
            onChange={(color) => setBubble({ unreadCountColor: color })}
          />
        </div>
      </div>
    </div>
  );
}