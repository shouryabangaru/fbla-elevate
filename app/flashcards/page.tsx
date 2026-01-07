"use client";

import dynamic from 'next/dynamic';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const FlashcardsPage = dynamic(() => import('@/pages/FlashcardsPage'), { ssr: false });

export default function Flashcards() {
  return (
    <ProtectedRoute>
      <FlashcardsPage />
    </ProtectedRoute>
  );
}
