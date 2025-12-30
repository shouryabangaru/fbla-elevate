import { NextResponse } from 'next/server';
import { roleplayEventTables } from '@/lib/supabase';

// Roleplay event metadata
const roleplayEventsMetadata: Record<string, {
  name: string;
  description: string;
  category: string;
  color: string;
}> = {
  'banking-financial': {
    name: 'Banking & Financial Systems',
    description: 'Master banking operations, customer financial guidance, and comprehensive financial services across all complexity levels.',
    category: 'Banking & Financial Systems',
    color: 'from-green-600 to-emerald-700',
  },
  'business-management': {
    name: 'Business Management',
    description: 'Leadership scenarios involving team management, strategic planning, and operational challenges.',
    category: 'Business Management',
    color: 'from-blue-600 to-cyan-700',
  },
  'customer-service': {
    name: 'Customer Service',
    description: 'Master customer interaction techniques, complaint resolution, and service excellence in various business contexts.',
    category: 'Customer Service',
    color: 'from-purple-500 to-violet-600',
  },
  'entrepreneurship': {
    name: 'Entrepreneurship',
    description: 'Navigate startup challenges, investor relations, and entrepreneurial decision-making scenarios.',
    category: 'Entrepreneurship',
    color: 'from-yellow-500 to-orange-600',
  },
  'hospitality-event': {
    name: 'Hospitality & Event Management',
    description: 'Hotel, restaurant, and event planning scenarios with customer service focus.',
    category: 'Hospitality & Event Management',
    color: 'from-teal-500 to-cyan-600',
  },
  'international-business': {
    name: 'International Business',
    description: 'Cross-cultural business scenarios, global trade situations, and international relations.',
    category: 'International Business',
    color: 'from-indigo-500 to-purple-600',
  },
  'management-information-systems': {
    name: 'Management Information Systems',
    description: 'IT management scenarios, system implementation, and technology decision-making in business contexts.',
    category: 'Management Information Systems',
    color: 'from-blue-500 to-indigo-600',
  },
  'marketing': {
    name: 'Marketing',
    description: 'Marketing strategy challenges, campaign management, and brand positioning scenarios.',
    category: 'Marketing',
    color: 'from-pink-600 to-rose-700',
  },
  'network-design': {
    name: 'Network Design',
    description: 'Network architecture scenarios, IT infrastructure planning, and technical problem-solving.',
    category: 'Network Design',
    color: 'from-gray-500 to-slate-600',
  },
  'parliamentary-procedure': {
    name: 'Parliamentary Procedure',
    description: 'Meeting management scenarios, procedural knowledge, and leadership in formal settings.',
    category: 'Parliamentary Procedure',
    color: 'from-red-600 to-orange-700',
  },
  'sports-entertainment': {
    name: 'Sports & Entertainment Management',
    description: 'Sports business scenarios, entertainment industry challenges, and event management.',
    category: 'Sports & Entertainment Management',
    color: 'from-red-500 to-orange-600',
  },
  'technology-support': {
    name: 'Technology Support & Services',
    description: 'Technical support scenarios, customer service in technology contexts, and IT problem resolution.',
    category: 'Technology Support & Services',
    color: 'from-violet-500 to-purple-600',
  },
};

// Icon mapping (can't store React components in JSON, so we'll handle this on the frontend)
export const roleplayIconMapping: Record<string, string> = {
  'banking-financial': 'DollarSign',
  'business-management': 'Building2',
  'customer-service': 'HeadsetIcon',
  'entrepreneurship': 'Lightbulb',
  'hospitality-event': 'Hotel',
  'international-business': 'Globe',
  'management-information-systems': 'Monitor',
  'marketing': 'TrendingUp',
  'network-design': 'Network',
  'parliamentary-procedure': 'Scale',
  'sports-entertainment': 'Trophy',
  'technology-support': 'Users',
};

// GET /api/roleplay/events - Get all available roleplay events
export async function GET() {
  try {
    // Build list of events with their metadata
    const events = Object.entries(roleplayEventTables).map(([id, tableName]) => {
      const metadata = roleplayEventsMetadata[id] || {
        name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: 'Roleplay scenarios for this FBLA competitive event.',
        category: 'General',
        color: 'from-gray-600 to-gray-700',
      };

      return {
        id,
        tableName,
        icon: roleplayIconMapping[id] || 'Users',
        ...metadata,
      };
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching roleplay events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
