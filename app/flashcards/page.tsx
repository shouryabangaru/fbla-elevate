import dynamic from 'next/dynamic';

const FlashcardsPage = dynamic(() => import('@/pages/FlashcardsPage'), { ssr: false });

export default function Flashcards() {
  return <FlashcardsPage />;
}
