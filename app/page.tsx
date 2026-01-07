"use client";

import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';

const LandingPage = dynamic(() => import('@/pages/LandingPage'), { ssr: false });
const DashboardPage = dynamic(() => import('@/pages/DashboardPage'), { ssr: false });

export default function Home() {
  const { user, loading } = useAuth();

  // Show nothing while loading auth state
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          border: '3px solid rgba(148, 163, 184, 0.2)',
          borderTopColor: '#f59e0b',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Show dashboard if logged in, landing page if not
  return user ? <DashboardPage /> : <LandingPage />;
}
