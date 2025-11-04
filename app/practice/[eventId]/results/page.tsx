import dynamic from 'next/dynamic';

const PracticeResultsPage = dynamic(() => import('@/pages/PracticeResultsPage'), { ssr: false });

export default function PracticeResults() {
  return <PracticeResultsPage />;
}
