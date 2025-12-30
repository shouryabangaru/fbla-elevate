import { NextRequest, NextResponse } from 'next/server';
import { fetchRoleplayScenarios, fetchRoleplayScenarioById, roleplayEventTables } from '@/lib/supabase';

// Event name mapping
const roleplayEventNames: Record<string, string> = {
  'banking-financial': 'Banking & Financial Systems',
  'business-management': 'Business Management',
  'customer-service': 'Customer Service',
  'entrepreneurship': 'Entrepreneurship',
  'hospitality-event': 'Hospitality & Event Management',
  'international-business': 'International Business',
  'management-information-systems': 'Management Information Systems',
  'marketing': 'Marketing',
  'network-design': 'Network Design',
  'parliamentary-procedure': 'Parliamentary Procedure',
  'sports-entertainment': 'Sports & Entertainment Management',
  'technology-support': 'Technology Support & Services',
};

// GET /api/roleplay/[eventId]/scenarios
// Query params: scenarioId=1 (optional, for fetching specific scenario)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const { searchParams } = new URL(request.url);
    const scenarioId = searchParams.get('scenarioId');
    const eventName = roleplayEventNames[eventId] || eventId;

    // Check if event exists
    if (!roleplayEventTables[eventId]) {
      return NextResponse.json(
        { error: 'Roleplay event not found', availableEvents: Object.keys(roleplayEventTables) },
        { status: 404 }
      );
    }

    // If scenarioId is provided, fetch specific scenario
    if (scenarioId) {
      const scenario = await fetchRoleplayScenarioById(eventId, parseInt(scenarioId, 10));
      if (!scenario) {
        return NextResponse.json(
          { error: 'Scenario not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        eventId,
        eventName,
        scenario: {
          ...scenario,
          scenarioNumber: scenario.id,
          eventName,
        },
      });
    }

    // Otherwise fetch all scenarios for the event
    const rawScenarios = await fetchRoleplayScenarios(eventId);
    
    // Transform scenarios to include scenarioNumber and eventName
    const scenarios = rawScenarios.map((scenario, index) => ({
      ...scenario,
      scenarioNumber: index + 1,
      eventName,
    }));

    return NextResponse.json({
      eventId,
      eventName,
      count: scenarios.length,
      scenarios,
    });
  } catch (error) {
    console.error('Error fetching roleplay scenarios:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
