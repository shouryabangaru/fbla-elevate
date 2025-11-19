import 'dotenv/config';
import { db } from '../lib/db';
import { events, questions } from '@shared/schema';
import type { InsertEvent } from '@shared/schema';

// 2025 FBLA Competitive Events
const fblaEvents: InsertEvent[] = [
  { name: "Accounting I", description: "Introduction to basic accounting principles and practices" },
  { name: "Advanced Accounting", description: "Advanced accounting concepts and financial statement analysis" },
  { name: "Advertising", description: "Advertising campaign development and marketing communications" },
  { name: "Agribusiness", description: "Agricultural business management and operations" },
  { name: "Banking & Financial Systems", description: "Banking operations, financial services, and monetary systems" },
  { name: "Business Communication", description: "Professional business communication skills and practices" },
  { name: "Business Ethics", description: "Ethical decision-making in business environments" },
  { name: "Business Law", description: "Legal principles affecting business operations and transactions" },
  { name: "Business Management", description: "Management principles, planning, organizing, and controlling business operations" },
  { name: "Computer Problem Solving", description: "Solving technical problems using computational thinking" },
  { name: "Customer Service", description: "Customer service skills and client relationship management" },
  { name: "Cybersecurity", description: "Information security and cybersecurity practices" },
  { name: "Data Science & AI", description: "Data analysis, interpretation, and artificial intelligence applications" },
  { name: "Economics", description: "Microeconomic and macroeconomic principles and their applications" },
  { name: "Entrepreneurship", description: "Business startup concepts, innovation, and entrepreneurial skills" },
  { name: "Healthcare Administration", description: "Management and administration of healthcare organizations" },
  { name: "Hospitality & Event Management", description: "Hotel, restaurant, tourism, and event management" },
  { name: "Human Resource Management", description: "Personnel management, recruitment, and employee relations" },
  { name: "Insurance & Risk Management", description: "Insurance principles and risk management strategies" },
  { name: "International Business", description: "Global business operations and international trade" },
  { name: "Introduction to Business Communication", description: "Fundamental business communication concepts and techniques" },
  { name: "Introduction to Business Concepts", description: "Fundamental business concepts and terminology" },
  { name: "Introduction to Business Procedures", description: "Basic business procedures and administrative practices" },
  { name: "Introduction to FBLA", description: "FBLA history, mission, and organization structure" },
  { name: "Introduction to Information Technology", description: "Fundamental IT concepts and applications" },
  { name: "Introduction to Marketing Concepts", description: "Basic marketing principles and consumer behavior" },
  { name: "Introduction to Parliamentary Procedure", description: "Rules and procedures for conducting business meetings" },
  { name: "Introduction to Retail & Merchandising", description: "Retail operations and merchandising fundamentals" },
  { name: "Introduction to Supply Chain Management", description: "Supply chain concepts and logistics management" },
  { name: "Journalism", description: "News writing, reporting, and journalistic practices" },
  { name: "Management Information Systems", description: "Business information systems and technology management" },
  { name: "Marketing", description: "Advanced marketing strategies and market analysis" },
  { name: "Network Design", description: "Network design and infrastructure planning" },
  { name: "Networking Infrastructures", description: "Network systems and infrastructure management" },
  { name: "Organizational Leadership", description: "Leadership principles and organizational management" },
  { name: "Parliamentary Procedure", description: "Advanced parliamentary procedure and meeting management" },
  { name: "Personal Finance", description: "Individual financial planning and money management" },
  { name: "Project Management", description: "Project planning, execution, and management principles" },
  { name: "Public Administration & Management", description: "Government and public sector administration" },
  { name: "Real Estate", description: "Real estate principles, transactions, and property management" },
  { name: "Retail Management", description: "Retail operations and store management" },
  { name: "Securities & Investments", description: "Investment principles, securities markets, and portfolio management" },
  { name: "Sports & Entertainment Management", description: "Management of sports and entertainment organizations" },
  { name: "Technology Support & Services", description: "Technical support and IT service delivery" },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await db.delete(questions);
    await db.delete(events);
    
    // Insert events
    console.log('📝 Inserting events...');
    const insertedEvents = await db.insert(events).values(fblaEvents).returning();
    console.log(`✅ Inserted ${insertedEvents.length} events`);
    
    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
