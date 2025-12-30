"use client";

import dynamic from 'next/dynamic';

// Import the HomePage component from the client directory
const HomePage = dynamic(() => import('@/pages/AboutUsPage'), { ssr: false });

export default function Home() {
  return <HomePage />;
}
