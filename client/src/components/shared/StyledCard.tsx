import { ReactNode } from 'react';
import './StyledCard.css';

interface StyledCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
}

export function StyledCard({ children, className = '', hover = true, variant = 'default' }: StyledCardProps) {
  return (
    <div className={`styled-card ${variant} ${hover ? 'hover-enabled' : ''} ${className}`}>
      <div className="card-background"></div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}