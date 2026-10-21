// src/components/home/GuestHome.tsx
import { Link } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import BoardLinkCard from "@/components/community/BoardLinkCard";
import GuestStepCard from "@/components/home/GuestStepCard";
import HomeHeader from "@/components/home/HomeHeader";
import ThemeSection from "@/components/home/ThemeSection";
import { CREATE_THEME_PATH, GUEST_STEPS, GUEST_THEMES_COUNT, OTHERS_THEMES_SECTION } from "@/config/home";
import { useThemeBoardPreview } from "@/hooks/useThemeBoards";

// 비로그인 홈 화면 (제작 안내 + 로그인 유도 + 다른 사람들의 테마 둘러보기)
export default function GuestHome() {
  const { data: boards = [], isLoading, isError } = useThemeBoardPreview(GUEST_THEMES_COUNT);

  return (
    <PageContainer>
      <HomeHeader
        title="나만의 테마를 만들어보세요"
        description="로그인하고 나만의 테마를 제작하고 공유하세요"
      />

      <section aria-label="테마 만드는 순서" className="grid gap-4 sm:grid-cols-3">
        {GUEST_STEPS.map(({ step, description }) => (
          <GuestStepCard key={step} step={step} description={description} />
        ))}
      </section>

      <Link
        to="/login"
        state={{ from: CREATE_THEME_PATH }}
        className="mx-auto mt-6 block w-full rounded-full bg-primary px-5 py-3 text-center text-base font-medium text-white transition-colors hover:bg-primary-dark sm:mt-8 lg:w-[90%]"
      >
        로그인하고 테마 만들러 가기
      </Link>

      <ThemeSection
        {...OTHERS_THEMES_SECTION}
        isLoading={isLoading}
        isError={isError}
        isEmpty={boards.length === 0}
      >
        {boards.map((board) => (
          <BoardLinkCard
            key={board.postId}
            postId={board.postId}
            title={board.title}
            likeCount={board.prefers}
            image={board.previewImageUrl[0] || undefined}
          />
        ))}
      </ThemeSection>
    </PageContainer>
  );
}
