"use client";

import dynamic from 'next/dynamic';

const RoleplayPracticePage = dynamic(() => import('@/pages/RoleplayPracticePage'), { ssr: false });

export default function Roleplay() {
  return <RoleplayPracticePage />;
}
