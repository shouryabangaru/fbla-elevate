"use client";

import dynamic from 'next/dynamic';

const AboutUsPage = dynamic(() => import('@/pages/AboutUsPage'), { ssr: false });

export default function About() {
  return <AboutUsPage />;
}
