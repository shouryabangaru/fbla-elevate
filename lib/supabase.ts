import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// ==========================================
// PRACTICE QUESTIONS TYPES & FUNCTIONS
// ==========================================

// Question type matching your JSON structure
export interface PracticeQuestion {
  id: number;
  question: string;
  answer_choice_a: string;
  answer_choice_b: string;
  answer_choice_c: string;
  answer_choice_d: string;
  correct_answer: string; // 'A', 'B', 'C', or 'D'
  explanation: string;
}

// Event configuration - maps event IDs to their Supabase table names
export const practiceEventTables: Record<string, string> = {
  // Accounting & Finance
  'accounting-i': 'accounting_i_questions',
  'accounting-ii': 'accounting_ii_questions',
  'banking-financial-systems': 'banking_financial_systems_questions',
  'economics': 'economics_questions',
  'personal-finance': 'personal_finance_questions',
  'securities-investments': 'securities_investments_questions',
  'insurance-risk-management': 'insurance_risk_management_questions',
  'real-estate': 'real_estate_questions',
  
  // Business & Management
  'business-management': 'business_management_questions',
  'business-ethics': 'business_ethics_questions',
  'business-law': 'business_law_questions',
  'entrepreneurship': 'entrepreneurship_questions',
  'international-business': 'international_business_questions',
  'agribusiness': 'agribusiness_questions',
  'healthcare-administration': 'healthcare_administration_questions',
  'hospitality-event-management': 'hospitality_event_management_questions',
  'human-resource-management': 'human_resource_management_questions',
  'project-management': 'project_management_questions',
  'public-administration-management': 'public_administration_management_questions',
  'retail-management': 'retail_management_questions',
  'sports-entertainment-management': 'sports_entertainment_management_questions',
  
  // Marketing & Communication
  'marketing': 'marketing_questions',
  'advertising': 'advertising_questions',
  'business-communication': 'business_communication_questions',
  'journalism': 'journalism_questions',
  'customer-service': 'customer_service_questions',
  
  // Technology
  'computer-problem-solving': 'computer_problem_solving_questions',
  'cybersecurity': 'cybersecurity_questions',
  'data-science-ai': 'data_science_ai_questions',
  'management-information-systems': 'management_information_systems_questions',
  'network-design': 'network_design_questions',
  'networking-infrastructures': 'networking_infrastructures_questions',
  'technology-support-services': 'technology_support_services_questions',
  
  // Leadership
  'organizational-leadership': 'organizational_leadership_questions',
  'parliamentary-procedure': 'parliamentary_procedure_questions',
  
  // Introduction Events
  'intro-business-communication': 'intro_business_communication_questions',
  'intro-business-concepts': 'intro_business_concepts_questions',
  'intro-business-procedures': 'intro_business_procedures_questions',
  'intro-fbla': 'intro_fbla_questions',
  'intro-information-technology': 'intro_information_technology_questions',
  'intro-marketing-concepts': 'intro_marketing_concepts_questions',
  'intro-parliamentary-procedure': 'intro_parliamentary_procedure_questions',
  'intro-retail-merchandising': 'intro_retail_merchandising_questions',
  'intro-supply-chain-management': 'intro_supply_chain_management_questions',
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
