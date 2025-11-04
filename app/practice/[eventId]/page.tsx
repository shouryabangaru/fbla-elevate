import dynamic from 'next/dynamic';

const PracticeModePage = dynamic(() => import('@/pages/PracticeModePage'), { ssr: false });

export default function PracticeMode() {
  return <PracticeModePage />;
}
