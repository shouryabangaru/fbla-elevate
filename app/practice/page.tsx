import dynamic from 'next/dynamic';

const PracticeQuestionsPage = dynamic(() => import('@/pages/PracticeQuestionsPage'), { ssr: false });

export default function Practice() {
  return <PracticeQuestionsPage />;
}
