/**
 * FBLA Roleplay Events Database
 * 
 * A comprehensive data management system for FBLA competitive roleplay events
 * and their associated practice prompts. This module provides CRUD operations
 * for managing events and prompts in a structured format.
 */

// Main database structure containing all FBLA roleplay events and prompts
const roleplayDatabase = {
  events: {
    "business-management": {
      name: "Business Management",
      description: "Leadership scenarios involving team management, strategic planning, and operational challenges.",
      prompts: [
        "Your team is consistently missing project deadlines. As a manager, how do you address this performance issue and implement solutions to improve productivity?",
        "Two department heads are in conflict over resource allocation for their respective projects. How do you mediate this dispute while maintaining team cohesion?",
        "You need to implement a new company policy that employees are resistant to. How do you manage this change and ensure smooth adoption?",
        "A key employee has submitted their resignation during a critical project phase. How do you handle this situation and minimize disruption?",
        "Your department is over budget for the quarter by 25%. What steps do you take to address this financial challenge while maintaining operations?",
        "An employee reports workplace harassment by a colleague. How do you handle this sensitive situation while protecting all parties involved?",
        "You need to downsize your team due to budget cuts. How do you approach this difficult decision and communicate changes effectively?",
        "A major client is threatening to cancel their contract due to service issues. How do you resolve this crisis and retain the relationship?",
        "Your team's productivity has declined significantly over the past month. How do you identify root causes and implement improvement strategies?",
        "An employee is struggling with work-life balance and it's affecting their performance. How do you provide support while maintaining standards?",
        "You need to promote someone from your team, but two equally qualified candidates are available. How do you make this decision fairly?",
        "A competitor is poaching your best employees with higher salary offers. How do you develop retention strategies to keep your talent?",
        "Your company is expanding internationally and you need to prepare your team for global operations. How do you manage this transition?",
        "A major supplier has failed to deliver critical materials on time, jeopardizing your project timeline. How do you manage this supply chain crisis?",
        "You need to present a business case for additional funding to senior management. How do you prepare and structure your proposal for maximum impact?"
      ]
    },
    "customer-service": {
      name: "Customer Service",
      description: "Master customer interaction techniques, complaint resolution, and service excellence in various business contexts.",
      prompts: [
        "A customer is extremely angry about a delayed delivery that caused them to miss an important deadline. They're demanding a full refund and threatening negative reviews. How do you handle this escalated situation?",
        "A customer received a damaged product and wants immediate replacement, but you're currently out of stock with a 2-week wait time. How do you address their urgent need?",
        "A customer is complaining about poor service they received from another department in your company. How do you handle this interdepartmental issue professionally?",
        "A customer is requesting a service that your company doesn't currently offer, but they're insisting you should provide it. How do you handle this situation?",
        "A customer is comparing your prices to a competitor's lower rates and demanding immediate price matching. How do you respond while protecting profit margins?",
        "A customer has been waiting on hold for 20 minutes due to high call volume and is extremely frustrated when you answer. How do you turn this negative experience around?",
        "A customer is asking to speak to a supervisor because they're dissatisfied with your proposed solution. How do you handle this escalation request?",
        "A customer made a purchase three months ago but now wants to return it, which is well outside your return policy window. How do you address this request?",
        "A customer is having technical difficulties with your product and is becoming increasingly frustrated with troubleshooting attempts. How do you provide effective support?",
        "A customer is questioning your company's policies and calling them unreasonable compared to competitors. How do you respond professionally while defending company standards?",
        "A customer wants to cancel their service subscription, but you believe they might benefit from staying with modifications. How do you approach this retention opportunity?",
        "A customer is upset about a billing error that occurred several months ago and is now affecting their credit. How do you resolve this complex situation?",
        "A customer is demanding to speak to the CEO about what you consider a minor billing issue. How do you handle this disproportionate escalation request?",
        "A customer is actively spreading negative reviews about your company online due to a single bad experience. How do you address this reputation management challenge?",
        "A customer has a significant language barrier and is having trouble communicating their issue clearly. How do you ensure you provide effective assistance despite communication challenges?"
      ]
    },
    "entrepreneurship": {
      name: "Entrepreneurship",
      description: "Navigate startup challenges, investor relations, and entrepreneurial decision-making scenarios.",
      prompts: [
        "An angel investor is interested in your startup but wants you to pivot your entire business model to focus on a different market. How do you evaluate and respond to this proposal?",
        "Your main competitor has just launched a product remarkably similar to yours with significant funding behind it. How do you differentiate your offering and compete effectively?",
        "You're running critically low on funding with only 3 months of runway remaining. How do you prioritize expenses and make strategic decisions about your team and operations?",
        "A potential business partner with complementary skills wants to join your venture, but their personal values and business ethics don't align with yours. How do you handle this situation?",
        "Your product launch failed to meet projected sales expectations by 60%. How do you analyze what went wrong and determine whether to pivot or persevere?",
        "A large corporation has approached you with an acquisition offer that would provide financial security but potentially compromise your original vision. How do you evaluate this opportunity?",
        "Your co-founder wants to take the company in a completely different strategic direction than you originally envisioned. How do you resolve this fundamental disagreement?",
        "You need to raise Series A funding, but investors are expressing concerns about the size of your addressable market. How do you address these concerns and strengthen your pitch?",
        "A key employee is demanding equity in the company in exchange for staying, threatening to leave for a competitor if denied. How do you negotiate this delicate situation?",
        "Your business is experiencing rapid growth, but you're struggling to maintain product quality and customer satisfaction. How do you scale effectively without compromising standards?",
        "A major customer wants to use your product for a purpose you hadn't originally intended, opening up a potentially lucrative new market. How do you evaluate and pursue this opportunity?",
        "You're considering international expansion but have limited resources and no experience in global markets. How do you prioritize target markets and develop an entry strategy?",
        "A respected mentor is giving you strategic advice that conflicts with your instincts and vision for the company. How do you handle this challenging relationship dynamic?",
        "Your startup has been operating for 18 months but is still struggling to achieve product-market fit despite multiple iterations. How do you approach this persistent challenge?",
        "You need to terminate a founding team member who isn't performing adequately, but they hold significant equity and have personal relationships with other team members. How do you handle this sensitive situation?"
      ]
    },
    "banking-financial": {
      name: "Banking and Financial Systems",
      description: "Master banking operations, customer financial guidance, and comprehensive financial services across all complexity levels.",
      prompts: [
        // Easy Level (1-5)
        "You are a customer service representative helping Maya, a high school student with her first part-time job, choose between a savings account, checking account, or both. Explain the purpose of each account type, discuss interest rates and fees, and help her set up digital banking tools for managing her money safely.",
        "As a junior banker, help Leo, a college-bound student, understand credit concepts for his first credit card application. Explain how credit cards differ from debit cards, discuss interest charges and fees, define key terms like credit limit and APR, and provide tips for building strong credit as a young adult.",
        "You're a digital banking assistant helping Mr. Thompson, who traditionally banks in person, learn about online banking tools. Walk him through login procedures, explain features like mobile check deposit and bill pay, address security concerns, and set up alerts and automatic payments.",
        "As a bank associate, help Mrs. Garcia understand certificates of deposit (CDs) for her $5,000 inheritance. Explain how CDs work compared to savings accounts, discuss interest rates and early withdrawal penalties, and help her choose the best CD option for her financial goals.",
        "You're helping Amir, a college student with a new restaurant job, set up direct deposit for his paychecks. Explain the direct deposit process, walk him through employer forms, discuss deposit timing and safety, and show him how to confirm deposits using online banking.",
        
        // Medium Level (6-10)
        "As a financial consultant, advise John, a small retail store owner planning expansion, on whether to choose a business loan or line of credit. Compare both options, gather his financial information, discuss payroll services, and refer him to appropriate bank specialists for next steps.",
        "You're a financial advisor helping Maria and Leo, a couple whose income increased from $85,000 to $130,000, explore investment options beyond their current mutual funds and CDs. Explain different investment vehicles, assess their risk tolerance, discuss tax implications, and recommend next steps.",
        "As a loan specialist, help Talia choose between a fixed-rate or adjustable-rate mortgage. She plans to live in the home 5-10 years and has a growing business that may affect her income. Compare both mortgage types, assess her situation, and discuss long-term financial impacts.",
        "You're a financial planning associate helping Darren, age 52, improve his retirement preparation. He has $80,000 in a 401(k) and wants to retire at 65. Explain IRA options, discuss catch-up strategies, address inflation and tax concerns, and recommend comprehensive planning resources.",
        "As a digital banking representative, help Mr. Chen transition his online retail business to digital banking tools. Explain business platform features, recommend efficiency improvements, address cybersecurity concerns, and outline onboarding and training processes.",
        
        // Hard Level (11-15)
        "You're a commercial banking officer advising Ms. Patel on financing a $1.2 million property for her fitness center chain. Compare SBA loans versus traditional commercial mortgages, analyze debt service coverage ratios, evaluate her liquidity situation, and recommend appropriate bank specialists.",
        "As a senior loan underwriter, evaluate Devonte's $50,000 personal loan application for his startup. He has limited credit history and high debt-to-income ratio. Review credit evaluation factors, explain risk management approaches, propose alternative products, and recommend next steps.",
        "You're the operations lead helping a business client implement stronger wire transfer controls after an attempted fraud incident. Explain common fraud methods, recommend prevention strategies, review liability policies, and balance security with operational efficiency.",
        "As a wealth management advisor, help a high-net-worth client optimize their portfolio during market volatility. Assess their current allocation, discuss rebalancing strategies, explain tax-loss harvesting, and recommend risk management techniques for preserving wealth.",
        "You're a commercial lending officer structuring a complex multi-million dollar acquisition loan for a manufacturing company. Analyze cash flow projections, negotiate loan covenants, assess collateral requirements, and coordinate with legal and compliance teams to close the transaction."
      ]
    }
  }
};

/**
 * Database Management Functions
 * These functions provide a clean API for interacting with the roleplay database
 */

/**
 * Get a list of all available event names
 * @returns {string[]} Array of event names
 */
function getAllEventNames() {
  return Object.keys(roleplayDatabase.events);
}

/**
 * Get detailed information about all events
 * @returns {Object[]} Array of event objects with id, name, and description
 */
function getAllEvents() {
  return Object.entries(roleplayDatabase.events).map(([id, event]) => ({
    id,
    name: event.name,
    description: event.description,
    promptCount: event.prompts.length
  }));
}

/**
 * Get all prompts for a specific event
 * @param {string} eventId - The event identifier
 * @returns {string[]|null} Array of prompts or null if event doesn't exist
 */
function getEventPrompts(eventId) {
  const event = roleplayDatabase.events[eventId];
  return event ? event.prompts : null;
}

/**
 * Get complete event details including prompts
 * @param {string} eventId - The event identifier
 * @returns {Object|null} Event object with all details or null if not found
 */
function getEventDetails(eventId) {
  const event = roleplayDatabase.events[eventId];
  if (!event) return null;
  
  return {
    id: eventId,
    name: event.name,
    description: event.description,
    prompts: event.prompts,
    promptCount: event.prompts.length
  };
}

/**
 * Add a new event to the database
 * @param {string} eventId - Unique identifier for the event
 * @param {string} name - Display name of the event
 * @param {string} description - Description of the event
 * @returns {boolean} Success status
 */
function addNewEvent(eventId, name, description = "") {
  if (roleplayDatabase.events[eventId]) {
    console.warn(`Event with ID '${eventId}' already exists`);
    return false;
  }
  
  roleplayDatabase.events[eventId] = {
    name,
    description,
    prompts: []
  };
  
  return true;
}

/**
 * Add a new prompt to an existing event
 * @param {string} eventId - The event identifier
 * @param {string} prompt - The prompt text to add
 * @returns {boolean} Success status
 */
function addPromptToEvent(eventId, prompt) {
  const event = roleplayDatabase.events[eventId];
  if (!event) {
    console.warn(`Event with ID '${eventId}' does not exist`);
    return false;
  }
  
  event.prompts.push(prompt);
  return true;
}

/**
 * Update an existing prompt in an event
 * @param {string} eventId - The event identifier
 * @param {number} promptIndex - Index of the prompt to update
 * @param {string} newPrompt - New prompt text
 * @returns {boolean} Success status
 */
function updateEventPrompt(eventId, promptIndex, newPrompt) {
  const event = roleplayDatabase.events[eventId];
  if (!event) {
    console.warn(`Event with ID '${eventId}' does not exist`);
    return false;
  }
  
  if (promptIndex < 0 || promptIndex >= event.prompts.length) {
    console.warn(`Invalid prompt index: ${promptIndex}`);
    return false;
  }
  
  event.prompts[promptIndex] = newPrompt;
  return true;
}

/**
 * Remove a prompt from an event
 * @param {string} eventId - The event identifier
 * @param {number} promptIndex - Index of the prompt to remove
 * @returns {boolean} Success status
 */
function removePromptFromEvent(eventId, promptIndex) {
  const event = roleplayDatabase.events[eventId];
  if (!event) {
    console.warn(`Event with ID '${eventId}' does not exist`);
    return false;
  }
  
  if (promptIndex < 0 || promptIndex >= event.prompts.length) {
    console.warn(`Invalid prompt index: ${promptIndex}`);
    return false;
  }
  
  event.prompts.splice(promptIndex, 1);
  return true;
}

/**
 * Remove an entire event from the database
 * @param {string} eventId - The event identifier
 * @returns {boolean} Success status
 */
function removeEvent(eventId) {
  if (!roleplayDatabase.events[eventId]) {
    console.warn(`Event with ID '${eventId}' does not exist`);
    return false;
  }
  
  delete roleplayDatabase.events[eventId];
  return true;
}

/**
 * Get database statistics
 * @returns {Object} Statistics about the database
 */
function getDatabaseStats() {
  const events = Object.values(roleplayDatabase.events);
  const totalPrompts = events.reduce((sum, event) => sum + event.prompts.length, 0);
  
  return {
    totalEvents: events.length,
    totalPrompts,
    averagePromptsPerEvent: Math.round(totalPrompts / events.length * 100) / 100,
    eventNames: getAllEventNames()
  };
}

/**
 * Search for prompts containing specific keywords
 * @param {string} searchTerm - Term to search for in prompts
 * @returns {Object[]} Array of matching prompts with event context
 */
function searchPrompts(searchTerm) {
  const results = [];
  const searchLower = searchTerm.toLowerCase();
  
  Object.entries(roleplayDatabase.events).forEach(([eventId, event]) => {
    event.prompts.forEach((prompt, index) => {
      if (prompt.toLowerCase().includes(searchLower)) {
        results.push({
          eventId,
          eventName: event.name,
          promptIndex: index,
          prompt
        });
      }
    });
  });
  
  return results;
}

// Export all functions for use in other modules (ES Module syntax)
export {
  // Core data access
  getAllEventNames,
  getAllEvents,
  getEventPrompts,
  getEventDetails,
  
  // Data modification
  addNewEvent,
  addPromptToEvent,
  updateEventPrompt,
  removePromptFromEvent,
  removeEvent,
  
  // Utility functions
  getDatabaseStats,
  searchPrompts
};

// Export database as default
export default roleplayDatabase;

// Example usage and testing (uncomment to test)
/*
console.log("=== FBLA Roleplay Database Test ===");
console.log("Available events:", getAllEventNames());
console.log("Database stats:", getDatabaseStats());
console.log("Business Management prompts:", getEventPrompts("business-management")?.length);
console.log("Search results for 'customer':", searchPrompts("customer").length);

// Test adding new event
addNewEvent("test-event", "Test Event", "A test event for demonstration");
addPromptToEvent("test-event", "This is a test prompt for the new event.");
console.log("After adding test event:", getDatabaseStats());
*/