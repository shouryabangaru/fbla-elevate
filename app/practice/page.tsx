"use client";

import dynamic from 'next/dynamic';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const PracticeQuestionsPage = dynamic(() => import('@/pages/PracticeQuestionsPage'), { ssr: false });

export default function Practice() {
  return (
    <ProtectedRoute>
      <PracticeQuestionsPage />
    </ProtectedRoute>
  );
}
