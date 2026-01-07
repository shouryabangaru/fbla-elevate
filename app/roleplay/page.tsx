"use client";

import dynamic from 'next/dynamic';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const RoleplayPracticePage = dynamic(() => import('@/pages/RoleplayPracticePage'), { ssr: false });

export default function Roleplay() {
  return (
    <ProtectedRoute>
      <RoleplayPracticePage />
    </ProtectedRoute>
  );
}
