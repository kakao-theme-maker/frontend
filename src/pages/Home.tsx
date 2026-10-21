// src/pages/Home.tsx
import { Loader, Sliders } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import QueryStatus from "@/components/common/QueryStatus";
import GuestHome from "@/components/home/GuestHome";
import ModeCard from "@/components/home/ModeCard";
import HomeHeader from "@/components/home/HomeHeader";
import ThemeCard from "@/components/home/ThemeCard";
import ThemeSection from "@/components/home/ThemeSection";
import { CREATE_THEME_PATH, OTHERS_THEMES_SECTION } from "@/config/home";
import useMe from "@/hooks/useMe";
import { useAllThemes, useMyThemes } from "@/hooks/useThemes";

const RECENT_THEMES_COUNT = 8;
const OTHER_THEMES_COUNT = 6;

const MODE_DESCRIPTION = ["몇 번의 터치로", "나만의 테마를 완성하세요"];

// 로그인한 사용자의 홈 화면
function MemberHome() {
  const { data: me } = useMe();
  const myThemes = useMyThemes();
  const allThemes = useAllThemes();

  const recentThemes = (myThemes.data ?? []).slice(0, RECENT_THEMES_COUNT);
  const otherThemes = (allThemes.data ?? [])
    .filter((theme) => theme.userEmail !== me?.userEmail)
    .slice(0, OTHER_THEMES_COUNT);

  return (
    <PageContainer>
      <HomeHeader
        srTitle="komentum - 나만의 카카오톡 테마 만들기"
        title={me ? `안녕하세요 ${me.name}님` : "안녕하세요"}
        description="오늘은 어떤 테마를 만들어 볼까요"
      />

      <section>
        <h2 className="sr-only">테마 생성 모드 선택</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <ModeCard icon={Loader} title="간편모드" description={MODE_DESCRIPTION} variant="light" to={CREATE_THEME_PATH} />
          <ModeCard icon={Sliders} title="디자이너 모드" description={MODE_DESCRIPTION} variant="dark" />
        </div>
      </section>

      <ThemeSection
        title="내가 최근에 만든 디자인"
        actionLabel="전체보기"
        to="/themes/manage"
        emptyMessage="아직 만든 테마가 없어요."
        isLoading={myThemes.isLoading}
        isError={myThemes.isError}
        isEmpty={recentThemes.length === 0}
      >
        {recentThemes.map((theme) => (
          <ThemeCard
            key={theme.themeComponentId}
            theme={theme}
            to={`/themes/${theme.themeComponentId}/customize`}
          />
        ))}
      </ThemeSection>

      <ThemeSection
        {...OTHERS_THEMES_SECTION}
        isLoading={allThemes.isLoading}
        isError={allThemes.isError}
        isEmpty={otherThemes.length === 0}
      >
        {otherThemes.map((theme) => (
          <ThemeCard key={theme.themeComponentId} theme={theme} />
        ))}
      </ThemeSection>
    </PageContainer>
  );
}

// 홈 화면 페이지 (로그인 여부에 따라 화면 분기)
export default function Home() {
  const { data: me, isLoading } = useMe();

  if (isLoading) {
    return (
      <PageContainer>
        <QueryStatus isLoading isError={false} />
      </PageContainer>
    );
  }

  return me ? <MemberHome /> : <GuestHome />;
}