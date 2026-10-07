// src/pages/Home.tsx
import { Loader, Sliders } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import QueryStatus from "@/components/common/QueryStatus";
import ThemeGrid from "@/components/common/ThemeGrid";
import GuestHome from "@/components/home/GuestHome";
import ModeCard from "@/components/home/ModeCard";
import SectionHeader from "@/components/home/SectionHeader";
import ThemeCard from "@/components/home/ThemeCard";
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
    .filter((theme) => theme.userEmail !== me?.user_email)
    .slice(0, OTHER_THEMES_COUNT);

  return (
    <PageContainer>
      <header>
        <h1 className="sr-only">komentum - 나만의 카카오톡 테마 만들기</h1>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {me ? `안녕하세요 ${me.name}님` : "안녕하세요"}
        </p>
        <p className="text-sm sm:text-base text-slate-400 pt-2 pb-5 sm:pt-3 sm:pb-6">오늘은 어떤 테마를 만들어 볼까요</p>
      </header>

      <section>
        <h2 className="sr-only">테마 생성 모드 선택</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <ModeCard icon={Loader} title="간편모드" description={MODE_DESCRIPTION} variant="light" />
          <ModeCard icon={Sliders} title="디자이너 모드" description={MODE_DESCRIPTION} variant="dark" />
        </div>
      </section>

      <section>
        <SectionHeader title="내가 최근에 만든 디자인" actionLabel="전체보기" />
        <QueryStatus
          isLoading={myThemes.isLoading}
          isError={myThemes.isError}
          isEmpty={recentThemes.length === 0}
          emptyMessage="아직 만든 테마가 없어요."
        />
        <ThemeGrid>
          {recentThemes.map((theme) => (
            <ThemeCard key={theme.themeComponentId} theme={theme} />
          ))}
        </ThemeGrid>
      </section>

      <section>
        <SectionHeader title="다른 사람들의 테마 둘러보기" actionLabel="더보기" />
        <QueryStatus
          isLoading={allThemes.isLoading}
          isError={allThemes.isError}
          isEmpty={otherThemes.length === 0}
          emptyMessage="아직 공개된 테마가 없어요."
        />
        <ThemeGrid>
          {otherThemes.map((theme) => (
            <ThemeCard key={theme.themeComponentId} theme={theme} />
          ))}
        </ThemeGrid>
      </section>
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
