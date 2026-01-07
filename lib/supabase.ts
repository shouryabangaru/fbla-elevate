import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client for browser/authenticated operations
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
});

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceRoleKey || supabaseAnonKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// ==========================================
// PRACTICE QUESTIONS TYPES & FUNCTIONS
// ==========================================

// Question type matching your database structure
export interface PracticeQuestion {
  id: number;
  question: string;
  answer_choice_a: string;
  answer_choice_b: string;
  answer_choice_c: string;
  answer_choice_d: string;
  correct_answer: string; // 'A', 'B', 'C', or 'D'
  explanation: string;
  topic?: string;
  created_at?: string;
}

// Event configuration - maps event IDs to their Supabase table names
export const practiceEventTables: Record<string, string> = {
  // Accounting & Finance
  'accounting-i': 'accounting-i',
  'accounting-ii': 'accounting-ii',
  'banking-financial-systems': 'banking-financial-systems',
  'economics': 'economics',
  'personal-finance': 'personal-finance',
  'securities-investments': 'securities-investments',
  'insurance-risk-management': 'insurance-risk-management',
  'real-estate': 'real-estate',
  
  // Business & Management
  'business-management': 'business-management',
  'business-ethics': 'business-ethics',
  'business-law': 'business-law',
  'entrepreneurship': 'entrepreneurship',
  'international-business': 'international-business',
  'agribusiness': 'agribusiness',
  'healthcare-administration': 'healthcare-administration',
  'hospitality-event-management': 'hospitality-event-management',
  'human-resource-management': 'human-resource-management',
  'project-management': 'project-management',
  'public-administration-management': 'public-administration-management',
  'retail-management': 'retail-management',
  'sports-entertainment-management': 'sports-entertainment-management',
  
  // Marketing & Communication
  'marketing': 'marketing',
  'advertising': 'advertising',
  'business-communication': 'business-communication',
  'journalism': 'journalism',
  'customer-service': 'customer-service',
  
  // Technology
  'computer-problem-solving': 'computer-problem-solving',
  'cybersecurity': 'cybersecurity',
  'data-science-ai': 'data-science-ai',
  'management-information-systems': 'management-information-systems',
  'network-design': 'network-design',
  'networking-infrastructures': 'networking-infrastructures',
  'technology-support-services': 'technology-support-services',
  
  // Leadership
  'organizational-leadership': 'organizational-leadership',
  'parliamentary-procedure': 'parliamentary-procedure',
  
  // Introduction Events
  'intro-business-communication': 'intro-business-communication',
  'intro-business-concepts': 'intro-business-concepts',
  'intro-business-procedures': 'intro-business-procedures',
  'intro-fbla': 'intro-fbla',
  'intro-information-technology': 'intro-information-technology',
  'intro-marketing-concepts': 'intro-marketing-concepts',
  'intro-parliamentary-procedure': 'intro-parliamentary-procedure',
  'intro-retail-merchandising': 'intro-retail-merchandising',
  'intro-supply-chain-management': 'intro-supply-chain-management',
};

// Fetch questions for a specific event
export async function fetchPracticeQuestions(eventId: string): Promise<PracticeQuestion[]> {
  const tableName = practiceEventTables[eventId];
  
  if (!tableName) {
    console.error(`No table mapping found for event: ${eventId}`);
    return [];
  }

  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) {
    console.error(`Error fetching questions for ${eventId}:`, error);
    return [];
  }

  return data || [];
}

// Fetch a random subset of questions for a practice session
export async function fetchRandomQuestions(eventId: string, count: number = 25): Promise<PracticeQuestion[]> {
  const tableName = practiceEventTables[eventId];
  
  if (!tableName) {
    console.error(`No table mapping found for event: ${eventId}`);
    return [];
  }

  // Get total count first
  const { count: totalCount, error: countError } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true });

  if (countError || !totalCount) {
    console.error(`Error getting count for ${eventId}:`, countError);
    return [];
  }

  // Generate random offset
  const maxOffset = Math.max(0, totalCount - count);
  const randomOffset = Math.floor(Math.random() * (maxOffset + 1));

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .range(randomOffset, randomOffset + count - 1);

  if (error) {
    console.error(`Error fetching random questions for ${eventId}:`, error);
    return [];
  }

  // Shuffle the results for extra randomness
  return shuffleArray(data || []);
}

// ==========================================
// ROLEPLAY EVENTS TYPES & FUNCTIONS
// ==========================================

// Roleplay scenario type matching your structure
export interface RoleplayScenario {
  id: number;
  background: string;
  scenario: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives?: string[];
}

// Event configuration - maps roleplay event IDs to their Supabase table names
export const roleplayEventTables: Record<string, string> = {
  'banking-financial': 'roleplay_banking_financial',
  'business-management': 'roleplay_business_management',
  'customer-service': 'roleplay_customer_service',
  'entrepreneurship': 'roleplay_entrepreneurship',
  'hospitality-event': 'roleplay_hospitality_event',
  'international-business': 'roleplay_international_business',
  'management-information-systems': 'roleplay_management_information_systems',
  'marketing': 'roleplay_marketing',
  'network-design': 'roleplay_network_design',
  'parliamentary-procedure': 'roleplay_parliamentary_procedure',
  'sports-entertainment': 'roleplay_sports_entertainment',
  'technology-support': 'roleplay_technology_support',
};

// Fetch all scenarios for a roleplay event
export async function fetchRoleplayScenarios(eventId: string): Promise<RoleplayScenario[]> {
  const tableName = roleplayEventTables[eventId];
  
  if (!tableName) {
    console.error(`No table mapping found for roleplay event: ${eventId}`);
    return [];
  }

  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) {
    console.error(`Error fetching roleplay scenarios for ${eventId}:`, error);
    return [];
  }

  return data || [];
}

// Fetch a specific scenario by ID
export async function fetchRoleplayScenarioById(eventId: string, scenarioId: number): Promise<RoleplayScenario | null> {
  const tableName = roleplayEventTables[eventId];
  
  if (!tableName) {
    console.error(`No table mapping found for roleplay event: ${eventId}`);
    return null;
  }

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', scenarioId)
    .single();

  if (error) {
    console.error(`Error fetching roleplay scenario ${scenarioId} for ${eventId}:`, error);
    return null;
  }

  return data;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get list of all practice events
export function getAllPracticeEvents() {
  return Object.keys(practiceEventTables);
}

// Get list of all roleplay events
export function getAllRoleplayEvents() {
  return Object.keys(roleplayEventTables);
}
