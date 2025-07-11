import { ReactNode } from 'react';
import { Navbar } from '@/components/homepage/Navbar';
import { Footer } from '@/components/homepage/Footer';
import './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageLayout({ children, title, subtitle, className = '' }: PageLayoutProps) {
  return (
    <div className={`page-layout ${className}`}>
      <Navbar />
      
      <div className="page-header">
        <div className="page-header-background">
          <div className="header-gradient"></div>
          <div className="header-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
        </div>
        
        <div className="page-header-content">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      
      <main className="page-main">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}