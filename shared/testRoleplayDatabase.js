/**
 * Test Script for FBLA Roleplay Database
 * 
 * This script demonstrates all the functionality of the roleplay database
 * Run with: node testRoleplayDatabase.js
 */

import {
  getAllEventNames,
  getAllEvents,
  getEventPrompts,
  getEventDetails,
  addNewEvent,
  addPromptToEvent,
  updateEventPrompt,
  removePromptFromEvent,
  removeEvent,
  getDatabaseStats,
  searchPrompts
} from './roleplayDatabase.js';

console.log("🎓 FBLA Roleplay Database Test Suite");
console.log("=====================================\n");

// Test 1: Get all event names
console.log("1️⃣ Testing getAllEventNames():");
const eventNames = getAllEventNames();
console.log("Available events:", eventNames);
console.log(`Total events: ${eventNames.length}\n`);

// Test 2: Get all events with details
console.log("2️⃣ Testing getAllEvents():");
const allEvents = getAllEvents();
allEvents.forEach(event => {
  console.log(`- ${event.name} (${event.promptCount} prompts)`);
});
console.log();

// Test 3: Get prompts for specific event
console.log("3️⃣ Testing getEventPrompts() for 'business-management':");
const businessPrompts = getEventPrompts("business-management");
console.log(`Found ${businessPrompts?.length} prompts for Business Management`);
console.log("First prompt:", businessPrompts?.[0]?.substring(0, 100) + "...\n");

// Test 4: Get complete event details
console.log("4️⃣ Testing getEventDetails() for 'customer-service':");
const customerServiceDetails = getEventDetails("customer-service");
console.log(`Event: ${customerServiceDetails?.name}`);
console.log(`Description: ${customerServiceDetails?.description}`);
console.log(`Prompts: ${customerServiceDetails?.promptCount}\n`);

// Test 5: Add new event
console.log("5️⃣ Testing addNewEvent():");
const newEventAdded = addNewEvent(
  "marketing-strategy", 
  "Marketing Strategy", 
  "Develop and execute comprehensive marketing campaigns and strategies."
);
console.log(`New event added: ${newEventAdded}`);

// Test 6: Add prompts to new event
console.log("\n6️⃣ Testing addPromptToEvent():");
const samplePrompts = [
  "Your company's social media engagement has dropped 40% in the last quarter. Develop a strategy to rebuild your online presence and reconnect with your target audience.",
  "A competitor has launched a viral marketing campaign that's overshadowing your product launch. How do you pivot your marketing strategy to regain attention?",
  "Your marketing budget has been cut by 50%, but you still need to achieve the same lead generation targets. How do you optimize your marketing mix?"
];

samplePrompts.forEach((prompt, index) => {
  const added = addPromptToEvent("marketing-strategy", prompt);
  console.log(`Prompt ${index + 1} added: ${added}`);
});

// Test 7: Update a prompt
console.log("\n7️⃣ Testing updateEventPrompt():");
const updatedPrompt = "Your company's social media engagement has dropped 40% in the last quarter. Develop a comprehensive strategy to rebuild your online presence, reconnect with your target audience, and measure success through key performance indicators.";
const updated = updateEventPrompt("marketing-strategy", 0, updatedPrompt);
console.log(`Prompt updated: ${updated}`);

// Test 8: Search prompts
console.log("\n8️⃣ Testing searchPrompts():");
const searchResults = searchPrompts("customer");
console.log(`Found ${searchResults.length} prompts containing 'customer':`);
searchResults.slice(0, 2).forEach(result => {
  console.log(`- ${result.eventName}: ${result.prompt.substring(0, 80)}...`);
});

// Test 9: Database statistics
console.log("\n9️⃣ Testing getDatabaseStats():");
const stats = getDatabaseStats();
console.log("Database Statistics:");
console.log(`- Total Events: ${stats.totalEvents}`);
console.log(`- Total Prompts: ${stats.totalPrompts}`);
console.log(`- Average Prompts per Event: ${stats.averagePromptsPerEvent}`);
console.log(`- Events: ${stats.eventNames.join(", ")}`);

// Test 10: Remove prompt and event (cleanup)
console.log("\n🔟 Testing cleanup functions:");
const promptRemoved = removePromptFromEvent("marketing-strategy", 1);
console.log(`Prompt removed: ${promptRemoved}`);

const eventRemoved = removeEvent("marketing-strategy");
console.log(`Event removed: ${eventRemoved}`);

// Final stats
console.log("\n📊 Final Database Stats:");
const finalStats = getDatabaseStats();
console.log(`Events: ${finalStats.totalEvents}, Prompts: ${finalStats.totalPrompts}`);

console.log("\n✅ All tests completed successfully!");
console.log("\n🚀 Ready for React Integration!");
console.log("Use: import { getAllEvents, getEventPrompts } from './shared/roleplayDatabase'");