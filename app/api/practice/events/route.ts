import { NextResponse } from 'next/server';
import { practiceEventTables } from '@/lib/supabase';

// Practice event metadata
const practiceEventsMetadata: Record<string, {
  name: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}> = {
  // Accounting & Finance
  'accounting-i': {
    name: 'Accounting I',
    description: 'Fundamental accounting principles, financial statements, and basic bookkeeping.',
    icon: '📊',
    difficulty: 'Intermediate',
    category: 'Finance',
  },
  'accounting-ii': {
    name: 'Accounting II',
    description: 'Advanced accounting concepts including corporate accounting, partnerships, and cost accounting.',
    icon: '🧮',
    difficulty: 'Advanced',
    category: 'Finance',
  },
  'banking-financial-systems': {
    name: 'Banking & Financial Systems',
    description: 'Banking operations, financial services, and monetary systems.',
    icon: '🏦',
    difficulty: 'Intermediate',
    category: 'Finance',
  },
  'economics': {
    name: 'Economics',
    description: 'Micro and macroeconomic principles, market structures, and economic policy.',
    icon: '📈',
    difficulty: 'Intermediate',
    category: 'Finance',
  },
  'personal-finance': {
    name: 'Personal Finance',
    description: 'Budgeting, savings, investing, and personal financial planning.',
    icon: '💰',
    difficulty: 'Beginner',
    category: 'Finance',
  },
  'securities-investments': {
    name: 'Securities & Investments',
    description: 'Stock markets, investment strategies, and financial securities.',
    icon: '📊',
    difficulty: 'Advanced',
    category: 'Finance',
  },
  'insurance-risk-management': {
    name: 'Insurance & Risk Management',
    description: 'Insurance principles, risk assessment, and risk mitigation strategies.',
    icon: '🛡️',
    difficulty: 'Intermediate',
    category: 'Finance',
  },
  'real-estate': {
    name: 'Real Estate',
    description: 'Real estate principles, property management, and real estate transactions.',
    icon: '🏠',
    difficulty: 'Intermediate',
    category: 'Finance',
  },
  
  // Business & Management
  'business-management': {
    name: 'Business Management',
    description: 'Management principles, organizational behavior, and business operations.',
    icon: '💼',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'business-ethics': {
    name: 'Business Ethics',
    description: 'Ethical decision-making, corporate social responsibility, and professional conduct.',
    icon: '🎯',
    difficulty: 'Intermediate',
    category: 'Business',
  },
  'business-law': {
    name: 'Business Law',
    description: 'Legal principles, contracts, business regulations, and commercial law.',
    icon: '⚖️',
    difficulty: 'Advanced',
    category: 'Legal',
  },
  'entrepreneurship': {
    name: 'Entrepreneurship',
    description: 'Starting and managing a business, innovation, and business planning.',
    icon: '🚀',
    difficulty: 'Advanced',
    category: 'Business',
  },
  'international-business': {
    name: 'International Business',
    description: 'Global business operations, international trade, and cross-cultural management.',
    icon: '🌍',
    difficulty: 'Advanced',
    category: 'Business',
  },
  'agribusiness': {
    name: 'Agribusiness',
    description: 'Agricultural business operations, farm management, and agribusiness marketing.',
    icon: '🌾',
    difficulty: 'Intermediate',
    category: 'Business',
  },
  'healthcare-administration': {
    name: 'Healthcare Administration',
    description: 'Healthcare management, medical office operations, and healthcare policy.',
    icon: '🏥',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'hospitality-event-management': {
    name: 'Hospitality & Event Management',
    description: 'Hotel management, event planning, and hospitality industry operations.',
    icon: '🏨',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'human-resource-management': {
    name: 'Human Resource Management',
    description: 'HR practices, employee relations, recruitment, and workforce management.',
    icon: '👥',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'project-management': {
    name: 'Project Management',
    description: 'Project planning, execution, monitoring, and project leadership.',
    icon: '📊',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'public-administration-management': {
    name: 'Public Administration & Management',
    description: 'Government operations, public policy, and public sector management.',
    icon: '🏢',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'retail-management': {
    name: 'Retail Management',
    description: 'Retail operations, merchandising, and retail business strategies.',
    icon: '🛒',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  'sports-entertainment-management': {
    name: 'Sports & Entertainment Management',
    description: 'Sports business, entertainment industry, and event management.',
    icon: '🎭',
    difficulty: 'Intermediate',
    category: 'Management',
  },
  
  // Marketing & Communication
  'marketing': {
    name: 'Marketing',
    description: 'Marketing principles, consumer behavior, and marketing strategies.',
    icon: '📈',
    difficulty: 'Intermediate',
    category: 'Marketing',
  },
  'advertising': {
    name: 'Advertising',
    description: 'Advertising principles, campaign development, and media planning.',
    icon: '📢',
    difficulty: 'Intermediate',
    category: 'Marketing',
  },
  'business-communication': {
    name: 'Business Communication',
    description: 'Professional communication, business writing, and presentation skills.',
    icon: '💬',
    difficulty: 'Intermediate',
    category: 'Communication',
  },
  'journalism': {
    name: 'Journalism',
    description: 'News writing, media ethics, and journalistic practices.',
    icon: '📰',
    difficulty: 'Intermediate',
    category: 'Communication',
  },
  'customer-service': {
    name: 'Customer Service',
    description: 'Customer relations, service excellence, and complaint resolution.',
    icon: '🤝',
    difficulty: 'Beginner',
    category: 'Communication',
  },
  
  // Technology
  'computer-problem-solving': {
    name: 'Computer Problem Solving',
    description: 'Programming concepts, algorithms, and computational thinking.',
    icon: '💻',
    difficulty: 'Advanced',
    category: 'Technology',
  },
  'cybersecurity': {
    name: 'Cybersecurity',
    description: 'Information security, threat prevention, and cybersecurity practices.',
    icon: '🔒',
    difficulty: 'Advanced',
    category: 'Technology',
  },
  'data-science-ai': {
    name: 'Data Science & AI',
    description: 'Data analysis, machine learning concepts, and artificial intelligence.',
    icon: '🤖',
    difficulty: 'Advanced',
    category: 'Technology',
  },
  'management-information-systems': {
    name: 'Management Information Systems',
    description: 'Business technology, information systems, and IT management.',
    icon: '💾',
    difficulty: 'Advanced',
    category: 'Technology',
  },
  'network-design': {
    name: 'Network Design',
    description: 'Network architecture, infrastructure planning, and network security.',
    icon: '🔗',
    difficulty: 'Advanced',
    category: 'Technology',
  },
  'networking-infrastructures': {
    name: 'Networking Infrastructures',
    description: 'Network administration, protocols, and infrastructure management.',
    icon: '🌐',
    difficulty: 'Advanced',
    category: 'Technology',
  },
  'technology-support-services': {
    name: 'Technology Support & Services',
    description: 'IT support, troubleshooting, and technical customer service.',
    icon: '🔧',
    difficulty: 'Intermediate',
    category: 'Technology',
  },
  
  // Leadership
  'organizational-leadership': {
    name: 'Organizational Leadership',
    description: 'Leadership principles, team building, and organizational development.',
    icon: '👑',
    difficulty: 'Intermediate',
    category: 'Leadership',
  },
  'parliamentary-procedure': {
    name: 'Parliamentary Procedure',
    description: 'Meeting procedures, Robert\'s Rules of Order, and formal business meetings.',
    icon: '🏛️',
    difficulty: 'Intermediate',
    category: 'Leadership',
  },
  
  // Introduction Events
  'intro-business-communication': {
    name: 'Introduction to Business Communication',
    description: 'Basic business communication skills and professional writing.',
    icon: '📝',
    difficulty: 'Beginner',
    category: 'Communication',
  },
  'intro-business-concepts': {
    name: 'Introduction to Business Concepts',
    description: 'Fundamental business principles and terminology.',
    icon: '📋',
    difficulty: 'Beginner',
    category: 'Business',
  },
  'intro-business-procedures': {
    name: 'Introduction to Business Procedures',
    description: 'Basic business operations and office procedures.',
    icon: '📑',
    difficulty: 'Beginner',
    category: 'Business',
  },
  'intro-fbla': {
    name: 'Introduction to FBLA',
    description: 'FBLA organization history, structure, and competitive events.',
    icon: '🏛️',
    difficulty: 'Beginner',
    category: 'Leadership',
  },
  'intro-information-technology': {
    name: 'Introduction to Information Technology',
    description: 'Basic computer concepts, software applications, and digital literacy.',
    icon: '🖥️',
    difficulty: 'Beginner',
    category: 'Technology',
  },
  'intro-marketing-concepts': {
    name: 'Introduction to Marketing Concepts',
    description: 'Basic marketing principles and consumer behavior.',
    icon: '📢',
    difficulty: 'Beginner',
    category: 'Marketing',
  },
  'intro-parliamentary-procedure': {
    name: 'Introduction to Parliamentary Procedure',
    description: 'Basic meeting procedures and Robert\'s Rules of Order.',
    icon: '🏛️',
    difficulty: 'Beginner',
    category: 'Leadership',
  },
  'intro-retail-merchandising': {
    name: 'Introduction to Retail & Merchandising',
    description: 'Basic retail operations and merchandising concepts.',
    icon: '🛍️',
    difficulty: 'Beginner',
    category: 'Business',
  },
  'intro-supply-chain-management': {
    name: 'Introduction to Supply Chain Management',
    description: 'Basic supply chain concepts and logistics.',
    icon: '📦',
    difficulty: 'Beginner',
    category: 'Business',
  },
};

// GET /api/practice/events - Get all available practice events
export async function GET() {
  try {
    // Build list of events with their metadata
    const events = Object.entries(practiceEventTables).map(([id, tableName]) => {
      const metadata = practiceEventsMetadata[id] || {
        name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: 'Practice questions for this FBLA competitive event.',
        icon: '📝',
        difficulty: 'Intermediate' as const,
        category: 'General',
      };

      return {
        id,
        tableName,
        ...metadata,
      };
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching practice events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
