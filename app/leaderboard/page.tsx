import dynamic from 'next/dynamic';

const LeaderboardPage = dynamic(() => import('@/pages/LeaderboardPage'), { ssr: false });

export default function Leaderboard() {
  return <LeaderboardPage />;
}
