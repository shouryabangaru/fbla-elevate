"use client";

import dynamic from 'next/dynamic';

const LearnMorePage = dynamic(() => import('@/pages/LearnMorePage'), { ssr: false });

export default function LearnMore() {
  return <LearnMorePage />;
}
