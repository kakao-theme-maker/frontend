// src/pages/community/Detail.tsx
import { useState } from "react";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import defaultThemeImage from "@/assets/images/mainBgImage.png";
import defaultIcon from "@/assets/images/commonIcoTheme.png";
import ThemePostPreview from "@/components/community/ThemePostPreview";
import ThemeSelectCard from "@/components/community/ThemeSelectedCard";
import CommentItem from "@/components/community/CommentItem";

const PREVIEW_IMAGES = [
  defaultThemeImage,
  defaultThemeImage,
  defaultThemeImage,
  defaultThemeImage,
];

const ATTACHED_THEME = {
  title: "졸업기니테마",
  date: "2026.08.01.",
  image: defaultIcon,
};

const MOCK_COMMENTS = [
  {
    id: 0,
    name: "이다현",
    date: "3월 25일",
    content: "댓글 꼭 남겨주세요.. ㅜㅜ",
    isOwner: true,
  },
  {
    id: 1,
    name: "김용민",
    date: "3월 25일",
    content: "너무 귀여워요! 잘 사용할게요",
    isOwner: false,
  },
  {
    id: 2,
    name: "김용민",
    date: "3월 25일",
    content: "너무 귀여워요! 잘 사용할게요",
    isOwner: false,
  },
  {
    id: 3,
    name: "김용민",
    date: "3월 25일",
    content: "너무 귀여워요! 잘 사용할게요",
    isOwner: false,
  },
];

export default function Detail() {
  const [comment, setComment] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 lg:px-20">
      <ThemePostPreview images={PREVIEW_IMAGES} />

      <h1 className="mt-8 text-2xl font-bold sm:text-3xl">
        제가만든 테마 배포합니다당
      </h1>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 rounded-full bg-slate-200" />
          <div>
            <p className="font-bold">이다현</p>
            <p className="text-sm text-slate-400">3월 25일</p>
          </div>
        </div>

        <Button
          onClick={() => setIsFollowing((prev) => !prev)}
          className="rounded-full px-6 py-2.5"
        >
          {isFollowing ? "팔로잉" : "팔로우"}
        </Button>
      </div>

      <p className="mt-6 whitespace-pre-line text-slate-700">
        {"제가만든 테마 배포합니다~~\n2차 가공 금지\n사용하실때 좋아요 눌러주세욤"}
      </p>

      <div className="mt-6 max-w-xs">
        <ThemeSelectCard
          title={ATTACHED_THEME.title}
          date={ATTACHED_THEME.date}
          image={ATTACHED_THEME.image}
        />
      </div>

      <div className="mt-8 flex items-center justify-between border-y border-slate-200 py-4">
        <div className="flex items-center gap-4 text-slate-600">
          <span className="flex items-center gap-1.5">
            <Heart size={20} />
            192
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={20} />
            192
          </span>
        </div>

        <span className="flex items-center gap-1.5 text-slate-600">
          <Bookmark size={20} />
          192
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="flex-1 border-none bg-transparent px-0"
        />
        <Button
          onClick={() => setComment("")}
          className="shrink-0 rounded-lg px-5 py-2"
        >
          등록
        </Button>
      </div>

      <div className="mt-2 divide-y divide-slate-100">
        {MOCK_COMMENTS.map((c) => (
          <CommentItem
            key={c.id}
            name={c.name}
            date={c.date}
            content={c.content}
            isOwner={c.isOwner}
          />
        ))}
      </div>
    </div>
  );
}