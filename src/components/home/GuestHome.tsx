// src/components/home/GuestHome.tsx
import { Link } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import QueryStatus from "@/components/common/QueryStatus";
import ThemeGrid from "@/components/common/ThemeGrid";
import CommunityThemeCard from "@/components/community/CommunityThemeCard";
import GuestStepCard from "@/components/home/GuestStepCard";
import SectionHeader from "@/components/home/SectionHeader";
import { CREATE_THEME_PATH, GUEST_STEPS, GUEST_THEMES_COUNT } from "@/config/home";
import { useThemeBoardPreview } from "@/hooks/useThemeBoards";

// 비로그인 홈 화면 (제작 안내 + 로그인 유도 + 다른 사람들의 테마 둘러보기)
export default function GuestHome() {
  const { data: boards = [], isLoading, isError } = useThemeBoardPreview(GUEST_THEMES_COUNT);

  return (
    <PageContainer>
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">나만의 테마를 만들어보세요</h1>
        <p className="pb-5 pt-2 text-sm text-slate-400 sm:pb-6 sm:pt-3 sm:text-base">
          로그인하고 나만의 테마를 제작하고 공유하세요
        </p>
      </header>

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

      <section>
        <SectionHeader title="다른 사람들의 테마 둘러보기" actionLabel="더보기" to="/community" />
        <QueryStatus
          isLoading={isLoading}
          isError={isError}
          isEmpty={boards.length === 0}
          emptyMessage="아직 공개된 테마가 없어요."
        />
        <ThemeGrid>
          {boards.map((board) => (
            <Link key={board.post_id} to={`/community/${board.post_id}`} className="block min-w-0">
              <CommunityThemeCard
                title={board.title}
                likeCount={board.prefers}
                image={board.preview_image_url || undefined}
              />
            </Link>
          ))}
        </ThemeGrid>
      </section>
    </PageContainer>
  );
}
