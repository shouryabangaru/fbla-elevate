import { db } from "./db";
import { events, questions } from "@shared/schema";
import type { InsertEvent, InsertQuestion } from "@shared/schema";
import { eq } from "drizzle-orm";

// FBLA Competitive Events List
const fblaEvents: InsertEvent[] = [
  { name: "Accounting I", description: "Introduction to basic accounting principles and practices" },
  { name: "Accounting II", description: "Advanced accounting concepts and financial statement analysis" },
  { name: "Banking & Financial Systems", description: "Banking operations, financial services, and monetary systems" },
  { name: "Business Management", description: "Management principles, planning, organizing, and controlling business operations" },
  { name: "Business Law", description: "Legal principles affecting business operations and transactions" },
  { name: "Client Service", description: "Customer service skills and client relationship management (roleplay event)" },
  { name: "Economics", description: "Microeconomic and macroeconomic principles and their applications" },
  { name: "Entrepreneurship", description: "Business startup concepts, innovation, and entrepreneurial skills" },
  { name: "Introduction to Business Concepts", description: "Fundamental business concepts and terminology" },
  { name: "Introduction to Financial Math", description: "Mathematical concepts applied to business and finance" },
  { name: "Introduction to Marketing Concepts", description: "Basic marketing principles and consumer behavior" },
  { name: "Introduction to Parliamentary Procedure", description: "Rules and procedures for conducting business meetings" },
  { name: "Management Information Systems", description: "Business information systems and technology management" },
  { name: "Personal Finance", description: "Individual financial planning and money management" },
  { name: "Securities & Investments", description: "Investment principles, securities markets, and portfolio management" },
  { name: "Business Ethics", description: "Ethical decision-making in business environments" },
  { name: "International Business", description: "Global business operations and international trade" },
  { name: "Marketing", description: "Advanced marketing strategies and market analysis" },
  { name: "Sports & Entertainment Marketing", description: "Marketing in the sports and entertainment industries" },
  { name: "Hospitality Management", description: "Hotel, restaurant, and tourism industry management" },
  { name: "Human Resource Management", description: "Personnel management, recruitment, and employee relations" },
  { name: "Public Speaking", description: "Communication skills and presentation techniques" },
  { name: "Future Business Leader", description: "Leadership skills and FBLA knowledge" },
  { name: "Introduction to Event Planning", description: "Event coordination and management fundamentals" },
  { name: "Sales Presentation", description: "Sales techniques and product presentation skills" },
];

export async function seedEvents() {
  console.log("🌱 Seeding FBLA events...");
  
  try {
    // Insert events (on conflict, do nothing to avoid duplicates)
    for (const event of fblaEvents) {
      await db.insert(events)
        .values(event)
        .onConflictDoNothing();
    }
    
    console.log(`✅ Successfully seeded ${fblaEvents.length} FBLA events`);
    
    // Show inserted events
    const insertedEvents = await db.select().from(events);
    console.log(`📊 Total events in database: ${insertedEvents.length}`);
    
    return insertedEvents;
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    throw error;
  }
}

export async function addQuestion(
  eventId: number,
  questionText: string,
  optionA: string,
  optionB: string,
  optionC: string,
  optionD: string,
  correctAnswer: 'A' | 'B' | 'C' | 'D',
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
  points: number = 1
): Promise<void> {
  try {
    const newQuestion: InsertQuestion = {
      eventId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      difficulty,
      points,
    };

    await db.insert(questions).values(newQuestion);
    console.log(`✅ Added question for event ID ${eventId}`);
  } catch (error) {
    console.error("❌ Error adding question:", error);
    throw error;
  }
}

export async function getEventByName(name: string) {
  const event = await db.select().from(events).where(eq(events.name, name));
  return event[0] || null;
}

export async function seedAccountingIIQuestions() {
  console.log("🌱 Seeding Accounting II questions...");
  
  const accountingQuestions = [
    {
      question: "A company issues 5,000 shares of $10 par common stock for $75,000. What amount is credited to the Paid-in Capital in Excess of Par account?",
      optionA: "$25,000",
      optionB: "$75,000",
      optionC: "$50,000",
      optionD: "$10,000",
      correctAnswer: 'A' as const,
      explanation: "The total cash received is $75,000. The par value of the shares is calculated as 5,000 shares × $10 par = $50,000. The excess amount paid over par is $75,000 - $50,000 = $25,000. This excess is credited to the Paid-in Capital in Excess of Par account."
    },
    {
      question: "Which of the following accounts would not appear on the post-closing trial balance?",
      optionA: "Accumulated Depreciation",
      optionB: "Retained Earnings",
      optionC: "Sales Revenue",
      optionD: "Notes Payable",
      correctAnswer: 'C' as const,
      explanation: "The post-closing trial balance only contains permanent accounts (assets, liabilities, and equity). Sales Revenue is a temporary account (revenue) that is closed to Retained Earnings at the end of the accounting period, so it will have a zero balance and not appear on the post-closing trial balance."
    },
    {
      question: "Using the FIFO method, what is the cost of goods sold if 80 units are sold from inventory with the following: 40 units at $20, 50 units at $22, 60 units at $24?",
      optionA: "$1,800",
      optionB: "$1,680",
      optionC: "$1,720",
      optionD: "$1,760",
      correctAnswer: 'B' as const,
      explanation: "Under FIFO (First-In, First-Out), the oldest units are sold first. To find the cost of 80 units: Sell the first 40 units @ $20 = $800. Sell the next 40 units from the following purchase @ $22 = $880. Total Cost of Goods Sold = $800 + $880 = $1,680."
    },
    {
      question: "Which transaction increases both assets and liabilities?",
      optionA: "Collection from a customer",
      optionB: "Purchase of equipment for cash",
      optionC: "Purchase of supplies on account",
      optionD: "Payment of a note payable",
      correctAnswer: 'C' as const,
      explanation: "Purchasing supplies increases the asset account 'Supplies'. Purchasing them \"on account\" means you haven't paid yet, which increases the liability account 'Accounts Payable'."
    },
    {
      question: "The current ratio is 2.5. If current liabilities total $40,000, what are current assets?",
      optionA: "$100,000",
      optionB: "$60,000",
      optionC: "$50,000",
      optionD: "$90,000",
      correctAnswer: 'A' as const,
      explanation: "The current ratio formula is Current Assets / Current Liabilities = 2.5. Plugging in the known value: Current Assets / $40,000 = 2.5. Therefore, Current Assets = 2.5 × $40,000 = $100,000."
    },
    {
      question: "A flexible budget is best used to:",
      optionA: "Set long-term strategic goals",
      optionB: "Evaluate performance at different activity levels",
      optionC: "Track depreciation of assets",
      optionD: "Allocate capital expenditures",
      correctAnswer: 'B' as const,
      explanation: "A flexible budget adjusts or \"flexes\" for changes in actual volume or activity levels. This allows managers to compare actual results to what the budget should have been at that level of activity, making it an excellent tool for performance evaluation."
    },
    {
      question: "If a partner contributes non-cash assets to a partnership, at what amount are they recorded?",
      optionA: "Book value",
      optionB: "Appraised value",
      optionC: "Market value agreed by partners",
      optionD: "Whichever is higher between book and market value",
      correctAnswer: 'C' as const,
      explanation: "When a partner contributes a non-cash asset, it is recorded at its fair market value on the date of contribution. This value must be agreed upon by all partners to ensure equity in the partnership."
    },
    {
      question: "The company has the following balances: Net Income: $20,000; Dividends Paid: $5,000; Beginning Retained Earnings: $40,000. What is the ending retained earnings?",
      optionA: "$45,000",
      optionB: "$55,000",
      optionC: "$65,000",
      optionD: "$60,000",
      correctAnswer: 'B' as const,
      explanation: "The formula for Ending Retained Earnings is: Beginning Retained Earnings + Net Income - Dividends Paid. $40,000 + $20,000 - $5,000 = $55,000."
    },
    {
      question: "Which cost would be considered indirect labor in a manufacturing firm?",
      optionA: "Factory line worker",
      optionB: "Assembly supervisor salary",
      optionC: "Sales department wages",
      optionD: "Raw materials handler",
      correctAnswer: 'B' as const,
      explanation: "Indirect labor is the cost of employees who are necessary for the manufacturing process but are not directly involved in hands-on production of the product. A supervisor's salary fits this description, unlike the wages of a factory line worker or raw materials handler (direct labor)."
    },
    {
      question: "In accrual accounting, when should revenue be recorded?",
      optionA: "When cash is received",
      optionB: "When the service is performed",
      optionC: "When the invoice is paid",
      optionD: "When the contract is signed",
      correctAnswer: 'B' as const,
      explanation: "The core principle of accrual accounting is the revenue recognition principle. This principle states that revenue should be recorded when it is earned (i.e., when the service is performed or the good is delivered), regardless of when the cash is actually received."
    },
    {
      question: "A corporation declares a 10% stock dividend when there are 100,000 shares outstanding, and the market value is $30/share. The par value is $1. What is the total amount transferred from retained earnings?",
      optionA: "$10,000",
      optionB: "$30,000",
      optionC: "$300,000",
      optionD: "$3,000",
      correctAnswer: 'C' as const,
      explanation: "A stock dividend is based on the market value of the stock. The number of new shares issued is 10% of 100,000 = 10,000 shares. The total amount transferred from Retained Earnings to equity accounts is 10,000 shares × $30 market value per share = $300,000."
    },
    {
      question: "Which type of depreciation would result in the highest expense in the first year?",
      optionA: "Straight-line",
      optionB: "Units-of-production",
      optionC: "Sum-of-the-years'-digits",
      optionD: "Declining balance",
      correctAnswer: 'D' as const,
      explanation: "The declining balance method is an accelerated depreciation method. It calculates depreciation based on a fixed percentage of the asset's book value, which is highest in the first year, resulting in a larger depreciation expense upfront compared to straight-line or units-of-production."
    },
    {
      question: "A factory incurs $5,000 in direct materials, $2,500 in direct labor, and $1,500 in overhead. What is the cost of goods manufactured?",
      optionA: "$9,000",
      optionB: "$8,000",
      optionC: "$6,500",
      optionD: "$7,500",
      correctAnswer: 'A' as const,
      explanation: "The cost of goods manufactured is the total cost of all goods completed during the period. It is calculated as: Direct Materials + Direct Labor + Manufacturing Overhead. $5,000 + $2,500 + $1,500 = $9,000."
    },
    {
      question: "Which ratio best indicates how efficiently a company is using its assets to generate profit?",
      optionA: "Current ratio",
      optionB: "Gross profit margin",
      optionC: "Return on assets",
      optionD: "Debt-to-equity",
      correctAnswer: 'C' as const,
      explanation: "Return on Assets (ROA) is calculated as Net Income / Average Total Assets. It measures how profitably a company uses its assets to generate earnings, making it a key efficiency ratio."
    },
    {
      question: "What is the main difference between LIFO and FIFO during periods of rising prices?",
      optionA: "FIFO results in lower taxes",
      optionB: "LIFO results in lower net income",
      optionC: "FIFO results in higher cost of goods sold",
      optionD: "LIFO increases gross profit",
      correctAnswer: 'B' as const,
      explanation: "In a period of rising prices, LIFO (Last-In, First-Out) assigns the most recent, higher costs to Cost of Goods Sold (COGS). This higher COGS results in a lower gross profit and, consequently, a lower net income compared to FIFO."
    },
    {
      question: "Which of the following is not part of cash flows from operating activities?",
      optionA: "Dividends received",
      optionB: "Interest paid",
      optionC: "Sale of inventory",
      optionD: "Purchase of equipment",
      correctAnswer: 'D' as const,
      explanation: "Operating activities are related to a company's core business operations (e.g., selling goods, providing services). The purchase of equipment is an investment in long-term assets and is classified as an investing activity on the statement of cash flows."
    },
    {
      question: "A business pays $12,000 in rent covering 12 months. After two months, what is the balance in the Prepaid Rent account?",
      optionA: "$12,000",
      optionB: "$10,000",
      optionC: "$2,000",
      optionD: "$1,000",
      correctAnswer: 'B' as const,
      explanation: "The monthly rent is $12,000 / 12 months = $1,000 per month. After 2 months, 2 months' worth of expense has been recorded, leaving 10 months of rent still prepaid. The balance in the Prepaid Rent (asset) account is 10 months × $1,000 = $10,000."
    },
    {
      question: "Which method best allocates overhead based on multiple cost drivers?",
      optionA: "Direct method",
      optionB: "Plantwide rate",
      optionC: "Activity-based costing",
      optionD: "Traditional costing",
      correctAnswer: 'C' as const,
      explanation: "Activity-based costing (ABC) is a precise method that identifies key activities in a process and assigns overhead costs to products based on the products' consumption of each activity, using multiple cost drivers."
    },
    {
      question: "An accounts receivable aging report shows $1,500 in likely uncollectible accounts. The current Allowance for Doubtful Accounts has a $200 credit balance. What is the required adjustment?",
      optionA: "Debit Bad Debt Expense $1,700",
      optionB: "Debit Bad Debt Expense $1,500",
      optionC: "Debit Bad Debt Expense $1,300",
      optionD: "Debit Allowance for Doubtful Accounts $1,300",
      correctAnswer: 'C' as const,
      explanation: "The aging report indicates the desired ending balance in the Allowance for Doubtful Accounts should be a $1,500 credit. Since there is already a $200 credit balance, only an additional $1,300 is needed to reach the desired balance. The adjusting entry is a debit to Bad Debt Expense and a credit to Allowance for Doubtful Accounts for $1,300."
    },
    {
      question: "When recording payroll, the employer portion of FICA taxes is recorded as:",
      optionA: "A debit to Payroll Expense",
      optionB: "A credit to Cash",
      optionC: "A credit to FICA Payable",
      optionD: "A debit to Payroll Tax Expense",
      correctAnswer: 'D' as const,
      explanation: "The employer's share of FICA (Social Security and Medicare) taxes is an additional expense to the company, separate from the wages earned by the employee. It is recorded as a debit to an expense account (e.g., Payroll Tax Expense) and a credit to a liability account (e.g., FICA Taxes Payable) until it is paid."
    },
    {
      question: "What is the primary purpose of adjusting entries in the accounting cycle?",
      optionA: "To correct errors made in the general journal",
      optionB: "To record transactions that occurred after the accounting period",
      optionC: "To update account balances before preparing financial statements",
      optionD: "To reconcile the bank statement with the general ledger",
      correctAnswer: 'C' as const,
      explanation: "Adjusting entries are made at the end of an accounting period to ensure that revenues are recorded in the period they are earned and expenses are recorded in the period they are incurred (matching principle). This updates balance sheet and income statement accounts so the financial statements reflect the correct financial position and performance."
    },
    {
      question: "Which of the following accounts would typically require an adjusting entry?",
      optionA: "Common Stock",
      optionB: "Notes Payable",
      optionC: "Prepaid Insurance",
      optionD: "Accounts Receivable",
      correctAnswer: 'C' as const,
      explanation: "Prepaid Insurance is an asset that expires over time. An adjusting entry is needed to recognize the portion of the prepaid asset that has expired (i.e., insurance expense for the period)."
    },
    {
      question: "Under the perpetual inventory system, what entry is made when merchandise is sold?",
      optionA: "Debit Inventory, Credit Sales",
      optionB: "Debit Sales, Credit Inventory",
      optionC: "Debit Accounts Receivable, Credit Sales and Inventory",
      optionD: "Debit Accounts Receivable, Credit Sales; Debit Cost of Goods Sold, Credit Inventory",
      correctAnswer: 'D' as const,
      explanation: "In a perpetual system, two entries are made at the point of sale: 1) To record the sale and receivable/revenue, and 2) To simultaneously update the inventory record and recognize the cost of the goods that were sold."
    },
    {
      question: "Which inventory costing method results in the highest net income during a period of rising prices?",
      optionA: "LIFO",
      optionB: "FIFO",
      optionC: "Weighted Average",
      optionD: "Specific Identification",
      correctAnswer: 'B' as const,
      explanation: "In rising prices, FIFO (First-In, First-Out) assigns the oldest, lowest costs to Cost of Goods Sold. This results in a lower COGS, a higher gross profit, and consequently, the highest net income compared to LIFO or weighted average."
    },
    {
      question: "What is the primary purpose of a flexible budget?",
      optionA: "To reflect the cost of production at varying levels of output",
      optionB: "To remain unchanged regardless of sales volume",
      optionC: "To ensure consistent spending",
      optionD: "To track depreciation expenses only",
      correctAnswer: 'A' as const,
      explanation: "A flexible budget is designed to adjust or \"flex\" based on changes in actual activity levels (e.g., units produced, units sold). It shows what revenues and costs should have been at the actual level of activity, which is crucial for accurate performance evaluation."
    },
    {
      question: "Which of the following is not typically included in a master budget?",
      optionA: "Capital expenditures budget",
      optionB: "Sales budget",
      optionC: "Production budget",
      optionD: "Trial balance",
      correctAnswer: 'D' as const,
      explanation: "A master budget is a comprehensive set of future budgeted financial statements and supporting schedules (sales, production, etc.). A trial balance is an actual internal accounting report from the general ledger, not a budget."
    },
    {
      question: "Which document authorizes a payment to a vendor?",
      optionA: "Sales invoice",
      optionB: "Purchase order",
      optionC: "Receiving report",
      optionD: "Voucher",
      correctAnswer: 'D' as const,
      explanation: "A voucher is an internal document, often part of a voucher system, that summarizes the supporting documents (invoice, purchase order, receiving report) and is used to authorize payment to a vendor."
    },
    {
      question: "A company uses the allowance method for bad debts. What entry is made when an account is written off?",
      optionA: "Debit Bad Debt Expense, Credit Accounts Receivable",
      optionB: "Debit Allowance for Doubtful Accounts, Credit Accounts Receivable",
      optionC: "Debit Accounts Receivable, Credit Allowance for Doubtful Accounts",
      optionD: "Debit Retained Earnings, Credit Accounts Receivable",
      correctAnswer: 'B' as const,
      explanation: "Writing off a specific uncollectible account removes the receivable from the books. Since the loss was already estimated and recorded via the Allowance account, the write-off entry reduces both the Allowance (a contra-asset) and the Accounts Receivable (an asset). There is no expense recorded at the time of write-off."
    },
    {
      question: "Which tax is only paid by the employer and not withheld from the employee's paycheck?",
      optionA: "Federal income tax",
      optionB: "Social Security tax",
      optionC: "Medicare tax",
      optionD: "Federal unemployment tax",
      correctAnswer: 'D' as const,
      explanation: "Federal Unemployment Tax Act (FUTA) tax is paid solely by the employer to fund state unemployment agencies. It is not deducted from an employee's wages."
    },
    {
      question: "What is the purpose of a Form W-4?",
      optionA: "To calculate an employee's Social Security contributions",
      optionB: "To report annual wages and tax withheld",
      optionC: "To determine federal income tax withholding",
      optionD: "To summarize total payroll for the employer",
      correctAnswer: 'C' as const,
      explanation: "Form W-4, the Employee's Withholding Certificate, is completed by the employee. It provides the employer with information (like filing status and number of allowances) to calculate how much federal income tax to withhold from the employee's paycheck."
    },
    {
      question: "Which depreciation method results in higher depreciation expense in the earlier years of an asset's life?",
      optionA: "Straight-line",
      optionB: "Units-of-production",
      optionC: "Declining-balance",
      optionD: "Sum-of-the-years-digits",
      correctAnswer: 'C' as const,
      explanation: "The declining-balance method is an accelerated depreciation method. It applies a constant depreciation rate to the asset's declining book value each year, resulting in higher expenses in the early years and lower expenses in the later years."
    },
    {
      question: "When a company disposes of an asset for more than its book value, what is the result?",
      optionA: "A loss on disposal",
      optionB: "No financial effect",
      optionC: "A gain on disposal",
      optionD: "An increase in depreciation expense",
      correctAnswer: 'C' as const,
      explanation: "The book value is Cost - Accumulated Depreciation. If the cash received from the sale is greater than the book value, the company has sold the asset for more than its accounting value, resulting in a gain."
    },
    {
      question: "Which of the following accounts is affected when a company issues common stock for cash?",
      optionA: "Treasury Stock",
      optionB: "Additional Paid-in Capital",
      optionC: "Retained Earnings",
      optionD: "Dividends Payable",
      correctAnswer: 'B' as const,
      explanation: "When stock is issued for cash, the Common Stock account is credited for the par value of the shares. The amount received above par value is credited to Additional Paid-in Capital."
    },
    {
      question: "Which dividend date requires a journal entry on the corporation's books?",
      optionA: "Date of declaration",
      optionB: "Date of record",
      optionC: "Date of stockholder meeting",
      optionD: "Date of incorporation",
      correctAnswer: 'A' as const,
      explanation: "On the date of declaration, the board of directors formally announces the dividend. This action creates a legal liability for the corporation, requiring a journal entry to debit Retained Earnings and credit Dividends Payable."
    },
    {
      question: "Which of the following would be included in a partnership agreement?",
      optionA: "Number of employees",
      optionB: "Division of net income and losses",
      optionC: "Depreciation method to be used",
      optionD: "Type of business license required",
      correctAnswer: 'B' as const,
      explanation: "A partnership agreement is a contract between partners. A fundamental element of this contract is how profits and losses will be divided among the partners, which may not necessarily be based on their capital contributions."
    },
    {
      question: "When a partner contributes a non-cash asset to a partnership, it should be recorded at:",
      optionA: "Historical cost",
      optionB: "Fair market value",
      optionC: "Salvage value",
      optionD: "Appraised value minus depreciation",
      correctAnswer: 'B' as const,
      explanation: "To ensure equity among partners, a contributed non-cash asset is recorded at its fair market value on the date it is contributed to the partnership. This value is agreed upon by all partners."
    },
    {
      question: "Which of the following actions would violate the AICPA Code of Professional Conduct?",
      optionA: "Preparing a client's tax return",
      optionB: "Charging an hourly rate for audit work",
      optionC: "Disclosing client financial data without consent",
      optionD: "Preparing financial forecasts",
      correctAnswer: 'C' as const,
      explanation: "The AICPA Code of Professional Conduct includes a rule on confidential client information. Disclosing this information without specific consent from the client is a major violation of ethical standards, unless there is a legal or professional duty to do so."
    },
    {
      question: "Which law protects whistleblowers who report fraudulent accounting practices?",
      optionA: "Sherman Antitrust Act",
      optionB: "Sarbanes-Oxley Act",
      optionC: "Securities Act of 1933",
      optionD: "Dodd-Frank Act",
      correctAnswer: 'B' as const,
      explanation: "The Sarbanes-Oxley Act of 2002 (SOX) contains specific provisions that protect employees of public companies who act as whistleblowers and report suspected fraud."
    },
    {
      question: "Which ratio best measures a company's ability to meet short-term obligations?",
      optionA: "Price-to-Earnings Ratio",
      optionB: "Current Ratio",
      optionC: "Debt-to-Equity Ratio",
      optionD: "Return on Equity",
      correctAnswer: 'B' as const,
      explanation: "The Current Ratio (Current Assets / Current Liabilities) is a primary liquidity ratio. It measures a company's ability to pay its short-term debts with its short-term assets."
    },
    {
      question: "Which financial statement shows the profitability of a company over a specific period?",
      optionA: "Balance Sheet",
      optionB: "Statement of Retained Earnings",
      optionC: "Income Statement",
      optionD: "Statement of Cash Flows",
      correctAnswer: 'C' as const,
      explanation: "The Income Statement summarizes a company's revenues and expenses over a period of time (e.g., a month, quarter, or year), resulting in its net income or loss, which is a measure of profitability."
    },
    {
      question: "What is the correct order of the steps in the accounting cycle?",
      optionA: "Journalize, post, prepare trial balance, prepare financial statements",
      optionB: "Post, journalize, adjust entries, prepare financial statements",
      optionC: "Prepare financial statements, post, journalize, prepare trial balance",
      optionD: "Adjust entries, journalize, post, prepare financial statements",
      correctAnswer: 'A' as const,
      explanation: "The core sequence of the accounting cycle is: 1) Analyze and Journalize transactions, 2) Post to the general ledger, 3) Prepare an unadjusted trial balance, 4) Prepare adjusting entries, 5) Prepare an adjusted trial balance, 6) Prepare financial statements, and 7) Close temporary accounts."
    },
    {
      question: "Which of the following errors will not affect the trial balance totals?",
      optionA: "Posting a debit as a credit",
      optionB: "Omitting a transaction entirely",
      optionC: "Recording a transaction in the wrong account",
      optionD: "Recording unequal debits and credits",
      correctAnswer: 'C' as const,
      explanation: "If a transaction is recorded with the correct debit and credit amounts but posted to the wrong account (e.g., debiting Supplies instead of Prepaid Rent), the total debits will still equal the total credits, and the trial balance will still balance. The error is one of classification, not arithmetic."
    },
    {
      question: "In a periodic inventory system, the cost of goods sold is calculated:",
      optionA: "After each sale",
      optionB: "At the end of the accounting period",
      optionC: "When goods are purchased",
      optionD: "Every time physical inventory is counted",
      correctAnswer: 'B' as const,
      explanation: "Under a periodic system, inventory and Cost of Goods Sold (COGS) are not updated continuously. COGS is calculated only at the end of the period using a formula: Beginning Inventory + Net Purchases - Ending Inventory = COGS."
    },
    {
      question: "Which of the following is not included in the cost of inventory under the periodic system?",
      optionA: "Freight-in",
      optionB: "Purchase returns",
      optionC: "Purchase discounts",
      optionD: "Freight-out",
      correctAnswer: 'D' as const,
      explanation: "Freight-out (or delivery expense) is the cost of shipping goods to a customer. This is a selling expense, not a cost of acquiring or preparing inventory for sale. Freight-in, however, is part of inventory cost."
    },
    {
      question: "A variance in budgeting refers to:",
      optionA: "A delay in preparing a budget",
      optionB: "A difference between actual and budgeted figures",
      optionC: "An error in the accounting ledger",
      optionD: "An adjustment made to fixed assets",
      correctAnswer: 'B' as const,
      explanation: "Variance analysis is a key budgeting tool. A variance is simply the difference between an actual amount and the budgeted or standard amount. They are classified as favorable or unfavorable."
    },
    {
      question: "Which type of analysis compares financial data over several periods?",
      optionA: "Vertical analysis",
      optionB: "Ratio analysis",
      optionC: "Horizontal analysis",
      optionD: "Break-even analysis",
      correctAnswer: 'C' as const,
      explanation: "Horizontal analysis (or trend analysis) looks at financial statement data across multiple time periods (e.g., comparing revenue growth year-over-year). It focuses on changes in dollar amounts and percentages over time."
    },
    {
      question: "What is the primary purpose of an aging schedule?",
      optionA: "To identify errors in payroll",
      optionB: "To track the status of inventory",
      optionC: "To estimate uncollectible accounts",
      optionD: "To allocate depreciation expense",
      correctAnswer: 'C' as const,
      explanation: "An accounts receivable aging schedule categorizes customer balances based on how long they have been outstanding. This analysis is used to estimate the amount of uncollectible accounts for the period, which is the basis for the adjusting entry for bad debt expense."
    },
    {
      question: "If a note receivable is dishonored, the payee should:",
      optionA: "Write off the amount immediately",
      optionB: "Reverse the original sales transaction",
      optionC: "Transfer the amount to accounts receivable",
      optionD: "Notify the bank for a chargeback",
      correctAnswer: 'C' as const,
      explanation: "When a note is dishonored (not paid at maturity), the holder of the note should remove the Note Receivable from the books and transfer the full amount (principal + any accrued interest) to an Accounts Receivable account from the maker, as the debt is still owed."
    },
    {
      question: "Which form is issued to employees annually to summarize their earnings and tax withholdings?",
      optionA: "W-2",
      optionB: "W-4",
      optionC: "1099-NEC",
      optionD: "1040",
      correctAnswer: 'A' as const,
      explanation: "Form W-2, the Wage and Tax Statement, is provided by employers to employees and the IRS after the end of the year. It summarizes the employee's total annual earnings and the amounts withheld for taxes (federal income, Social Security, Medicare)."
    },
    {
      question: "Net pay is equal to:",
      optionA: "Gross pay plus taxes",
      optionB: "Gross pay minus voluntary deductions",
      optionC: "Gross pay minus taxes and other deductions",
      optionD: "Payroll tax liability of the employer",
      correctAnswer: 'C' as const,
      explanation: "Net pay is the amount of the paycheck the employee actually gets to take home. It is calculated as Gross Pay (total earnings) minus all mandatory and voluntary deductions (e.g., income taxes, FICA, health insurance, retirement contributions)."
    },
    {
      question: "The book value of a long-term asset is calculated as:",
      optionA: "Historical cost + salvage value",
      optionB: "Salvage value - accumulated depreciation",
      optionC: "Historical cost - accumulated depreciation",
      optionD: "Replacement cost - salvage value",
      correctAnswer: 'C' as const,
      explanation: "Book value (or carrying value) represents the net amount of the asset reported on the balance sheet. It is the original historical cost of the asset minus the total accumulated depreciation recorded to date."
    },
    {
      question: "Which of the following would not be capitalized as part of the cost of equipment?",
      optionA: "Sales tax",
      optionB: "Delivery fees",
      optionC: "Installation costs",
      optionD: "Annual maintenance fees",
      correctAnswer: 'D' as const,
      explanation: "Costs to acquire and prepare an asset for use are capitalized (added to its cost). However, annual maintenance fees are recurring costs incurred to maintain the asset's operating efficiency and are expensed as incurred in the period they are paid."
    },
    {
      question: "A company repurchases its own stock. This transaction is recorded as:",
      optionA: "A reduction in assets",
      optionB: "An increase in liabilities",
      optionC: "Treasury stock, a contra-equity account",
      optionD: "An increase in retained earnings",
      correctAnswer: 'C' as const,
      explanation: "When a company buys back its own shares, the cost of the repurchased stock is recorded in a contra-equity account called Treasury Stock. This account has a normal debit balance and is subtracted from total stockholders' equity on the balance sheet. It represents a reduction of equity."
    }
  ];

  const accountingEvent = await getEventByName("Accounting II");
  if (!accountingEvent) {
    console.error("❌ Accounting II event not found");
    return;
  }

  for (let i = 0; i < accountingQuestions.length; i++) {
    const q = accountingQuestions[i];
    await addQuestion(
      accountingEvent.id,
      q.question,
      q.optionA,
      q.optionB,
      q.optionC,
      q.optionD,
      q.correctAnswer,
      'Intermediate',
      1
    );
  }
  
  console.log(`✅ Successfully added ${accountingQuestions.length} questions to Accounting II`);
}

export async function seedAccountingIIExtensionQuestions() {
  console.log("🌱 Seeding Accounting II additional questions (54-100)...");
  
  const additionalQuestions = [
    {
      question: "When declaring a cash dividend, which account is debited?",
      optionA: "Common Stock",
      optionB: "Cash",
      optionC: "Retained Earnings",
      optionD: "Additional Paid-in Capital",
      correctAnswer: 'C' as const,
      explanation: "Declaring a cash dividend reduces the company's retained earnings (the pool of profits available for distribution). The entry is a debit to Retained Earnings and a credit to Dividends Payable."
    },
    {
      question: "How are profits typically divided in the absence of a partnership agreement?",
      optionA: "According to capital contributions",
      optionB: "Equally among partners",
      optionC: "Based on time invested",
      optionD: "Based on seniority",
      correctAnswer: 'B' as const,
      explanation: "The Uniform Partnership Act, which governs partnerships in the absence of a specific agreement, states that profits and losses are to be shared equally among the partners, regardless of their capital contributions or time invested."
    },
    {
      question: "If a partner withdraws from a partnership, the remaining partners must:",
      optionA: "Pay the departing partner a salary",
      optionB: "Revalue the partnership assets",
      optionC: "Reallocate ownership interests",
      optionD: "Liquidate the business",
      correctAnswer: 'B' as const,
      explanation: "When a partner leaves, the old partnership is legally dissolved. To ensure fairness in the final settlement with the withdrawing partner, the partnership's assets and liabilities are revalued to their current fair market value. This establishes the true worth of the partner's capital balance."
    },
    {
      question: "Which organization issues the Generally Accepted Accounting Principles (GAAP) in the U.S.?",
      optionA: "IRS",
      optionB: "AICPA",
      optionC: "SEC",
      optionD: "FASB",
      correctAnswer: 'D' as const,
      explanation: "The Financial Accounting Standards Board (FASB) is the private, non-profit organization responsible for establishing and improving financial accounting and reporting standards (GAAP) for public and private companies in the United States."
    },
    {
      question: "Which of the following is considered unethical in accounting?",
      optionA: "Delaying revenue recognition to the next period",
      optionB: "Accrual-based revenue reporting",
      optionC: "Using estimated depreciation",
      optionD: "Providing financial forecasts",
      correctAnswer: 'A' as const,
      explanation: "The revenue recognition principle requires that revenue be recorded in the period it is earned. Intentionally delaying revenue recognition to manipulate financial results (e.g., to smooth income) is a violation of ethical standards and accounting principles."
    },
    {
      question: "Which financial statement reports a company's assets and liabilities at a specific point in time?",
      optionA: "Statement of Cash Flows",
      optionB: "Balance Sheet",
      optionC: "Income Statement",
      optionD: "Statement of Stockholders' Equity",
      correctAnswer: 'B' as const,
      explanation: "The Balance Sheet (or Statement of Financial Position) is a snapshot of a company's assets, liabilities, and equity at a specific point in time, such as the end of a quarter or year."
    },
    {
      question: "Return on equity (ROE) is calculated by dividing net income by:",
      optionA: "Total liabilities",
      optionB: "Total assets",
      optionC: "Average stockholders' equity",
      optionD: "Retained earnings",
      correctAnswer: 'C' as const,
      explanation: "Return on Equity (ROE) measures profitability relative to shareholders' investment. The formula is Net Income / Average Stockholders' Equity. Using the average equity accounts for changes that occurred during the period."
    },
    {
      question: "Which of the following accounts would normally have a credit balance?",
      optionA: "Accounts Receivable",
      optionB: "Sales Revenue",
      optionC: "Supplies",
      optionD: "Cash",
      correctAnswer: 'B' as const,
      explanation: "Revenue accounts, like Sales Revenue, have normal credit balances because they increase equity. Assets (like Accounts Receivable, Supplies, and Cash) have normal debit balances."
    },
    {
      question: "What type of account is Unearned Revenue?",
      optionA: "Asset",
      optionB: "Revenue",
      optionC: "Liability",
      optionD: "Expense",
      correctAnswer: 'C' as const,
      explanation: "Unearned Revenue represents cash received from a customer for services or goods not yet provided. Because the company has an obligation (a liability) to deliver the product or service in the future, it is classified as a liability."
    },
    {
      question: "Which inventory costing method tends to result in higher income during periods of rising prices?",
      optionA: "FIFO",
      optionB: "LIFO",
      optionC: "Weighted Average",
      optionD: "Specific Identification",
      correctAnswer: 'A' as const,
      explanation: "During rising prices, FIFO (First-In, First-Out) assigns the oldest, lowest costs to Cost of Goods Sold. This results in a lower COGS and a higher reported net income compared to other methods like LIFO."
    },
    {
      question: "If ending inventory is overstated, what is the impact on net income?",
      optionA: "No impact",
      optionB: "Net income is understated",
      optionC: "Net income is overstated",
      optionD: "Cannot be determined",
      correctAnswer: 'C' as const,
      explanation: "The formula for Cost of Goods Sold is: Beginning Inventory + Purchases - Ending Inventory. If Ending Inventory is overstated, COGS is understated. If COGS is understated, Net Income is overstated."
    },
    {
      question: "Break-even point is the level of sales at which:",
      optionA: "Total revenue equals total expenses",
      optionB: "Profit is maximized",
      optionC: "Variable costs are minimized",
      optionD: "Fixed costs are zero",
      correctAnswer: 'A' as const,
      explanation: "The break-even point is the exact sales volume where a company's total revenues equal its total expenses, resulting in zero profit or loss."
    },
    {
      question: "The formula for computing contribution margin is:",
      optionA: "Sales – Fixed Costs",
      optionB: "Sales – Variable Costs",
      optionC: "Net Income + Operating Expenses",
      optionD: "Gross Profit – Operating Expenses",
      correctAnswer: 'B' as const,
      explanation: "Contribution Margin is the amount of revenue remaining after subtracting all variable costs. It is the amount that \"contributes\" to covering fixed costs and generating profit."
    },
    {
      question: "A company uses the allowance method to account for uncollectible accounts. What is the journal entry to write off a specific account?",
      optionA: "Debit Bad Debt Expense; Credit Accounts Receivable",
      optionB: "Debit Allowance for Doubtful Accounts; Credit Accounts Receivable",
      optionC: "Debit Accounts Receivable; Credit Allowance for Doubtful Accounts",
      optionD: "Debit Cash; Credit Allowance for Doubtful Accounts",
      correctAnswer: 'B' as const,
      explanation: "When a specific customer account is deemed uncollectible, it is written off. This entry reduces both the Allowance for Doubtful Accounts (the estimate) and Accounts Receivable (the specific asset). No expense is recorded at the time of write-off under the allowance method."
    },
    {
      question: "Which of the following documents initiates the accounts payable process?",
      optionA: "Purchase order",
      optionB: "Sales invoice",
      optionC: "Shipping document",
      optionD: "Purchase invoice",
      correctAnswer: 'A' as const,
      explanation: "The purchase order is the document issued by the buyer to the vendor authorizing the purchase. It is the first document in the sequence that initiates the accounts payable process."
    },
    {
      question: "Which of the following taxes is only paid by the employer?",
      optionA: "Federal income tax",
      optionB: "FICA–Social Security",
      optionC: "FICA–Medicare",
      optionD: "FUTA",
      correctAnswer: 'D' as const,
      explanation: "Federal Unemployment Tax (FUTA) is paid solely by the employer to fund state unemployment agencies. It is not withheld from the employee's wages."
    },
    {
      question: "Which document is completed by an employee to indicate tax withholding preferences?",
      optionA: "W-2",
      optionB: "W-4",
      optionC: "1099-MISC",
      optionD: "1040EZ",
      correctAnswer: 'B' as const,
      explanation: "Form W-4, the Employee's Withholding Certificate, is filled out by the employee upon hire. It provides information on filing status and allowances so the employer can calculate how much federal income tax to withhold."
    },
    {
      question: "Depreciation expense is reported on which financial statement?",
      optionA: "Balance Sheet",
      optionB: "Statement of Owner's Equity",
      optionC: "Income Statement",
      optionD: "Statement of Cash Flows",
      correctAnswer: 'C' as const,
      explanation: "Depreciation Expense is an operating expense and is reported on the Income Statement. The related accumulated depreciation account is reported on the Balance Sheet."
    },
    {
      question: "Which depreciation method results in the same depreciation expense each year?",
      optionA: "Straight-line",
      optionB: "Double declining balance",
      optionC: "Units-of-production",
      optionD: "Sum-of-the-years'-digits",
      correctAnswer: 'A' as const,
      explanation: "The straight-line method allocates the depreciable cost of an asset evenly over its useful life, resulting in the same depreciation expense each full year."
    },
    {
      question: "Preferred stock differs from common stock in that it typically:",
      optionA: "Has voting rights",
      optionB: "Is convertible into liabilities",
      optionC: "Pays fixed dividends",
      optionD: "Has a lower par value",
      correctAnswer: 'C' as const,
      explanation: "The key feature of preferred stock is that it usually pays a fixed dividend rate. Preferred stockholders typically do not have voting rights, unlike common stockholders."
    },
    {
      question: "What is the effect of issuing common stock above par value?",
      optionA: "Increase in liabilities",
      optionB: "Increase in paid-in capital",
      optionC: "Decrease in retained earnings",
      optionD: "Decrease in assets",
      correctAnswer: 'B' as const,
      explanation: "When stock is issued above par value, the Common Stock account is credited for the par value. The amount received above par is credited to Additional Paid-in Capital, which increases total paid-in capital."
    },
    {
      question: "In a partnership, drawings by a partner:",
      optionA: "Are treated as a business expense",
      optionB: "Increase the partner's capital account",
      optionC: "Reduce the partner's capital account",
      optionD: "Are not recorded in the books",
      correctAnswer: 'C' as const,
      explanation: "Drawings are withdrawals of assets from the partnership by a partner for personal use. These withdrawals reduce that partner's capital account balance."
    },
    {
      question: "What happens when a new partner is admitted into an existing partnership?",
      optionA: "Assets are distributed to old partners",
      optionB: "The old partnership ends, and a new one begins",
      optionC: "The partnership dissolves permanently",
      optionD: "Only the capital account changes",
      correctAnswer: 'B' as const,
      explanation: "Legally, the admission of a new partner dissolves the old partnership and creates a new partnership entity. This often requires revaluation of assets and a new partnership agreement."
    },
    {
      question: "Which of the following best describes ethical behavior in accounting?",
      optionA: "Following internal company policies",
      optionB: "Recording revenues early to boost performance",
      optionC: "Providing accurate and honest financial information",
      optionD: "Manipulating data for investor confidence",
      correctAnswer: 'C' as const,
      explanation: "The cornerstone of ethical behavior in accounting is integrity, which involves being honest, candid, and free of conflicts of interest. This means providing financial information that is accurate and honest."
    },
    {
      question: "The Sarbanes-Oxley Act was passed to:",
      optionA: "Lower corporate tax rates",
      optionB: "Encourage public trading of stocks",
      optionC: "Prevent accounting fraud and increase transparency",
      optionD: "Simplify payroll calculations",
      correctAnswer: 'C' as const,
      explanation: "The Sarbanes-Oxley Act (SOX) of 2002 was enacted in response to major accounting scandals. Its primary goals are to prevent corporate accounting fraud and improve the accuracy and transparency of financial reporting."
    },
    {
      question: "Which of the following is a measure of a company's liquidity?",
      optionA: "Return on assets",
      optionB: "Current ratio",
      optionC: "Gross profit margin",
      optionD: "Debt-to-equity ratio",
      correctAnswer: 'B' as const,
      explanation: "Liquidity refers to a company's ability to meet its short-term obligations. The Current Ratio (Current Assets / Current Liabilities) is a primary measure of liquidity."
    },
    {
      question: "Which financial ratio is most useful in evaluating a company's ability to pay short-term obligations?",
      optionA: "Quick ratio",
      optionB: "Return on equity",
      optionC: "Inventory turnover",
      optionD: "Price-to-earnings ratio",
      correctAnswer: 'A' as const,
      explanation: "The Quick (Acid-Test) Ratio is a more stringent measure of liquidity than the current ratio because it excludes less liquid current assets like inventory. It measures the ability to pay short-term obligations using only the most liquid assets (cash, marketable securities, and receivables)."
    },
    {
      question: "Which of the following entries is correct for purchasing supplies on account?",
      optionA: "Debit Accounts Payable, Credit Supplies",
      optionB: "Debit Supplies, Credit Accounts Payable",
      optionC: "Debit Supplies Expense, Credit Accounts Receivable",
      optionD: "Debit Cash, Credit Supplies",
      correctAnswer: 'B' as const,
      explanation: "Purchasing supplies increases the asset Supplies (debit) and creates a liability, Accounts Payable (credit), because the purchase was made \"on account\" (on credit)."
    },
    {
      question: "Adjusting entries are made:",
      optionA: "After the trial balance is prepared",
      optionB: "Before transactions are recorded",
      optionC: "To close temporary accounts",
      optionD: "On a quarterly basis only",
      correctAnswer: 'A' as const,
      explanation: "In the accounting cycle, adjusting entries are journalized and posted after the unadjusted trial balance is prepared but before the financial statements are created."
    },
    {
      question: "Which of the following accounts is used in a perpetual inventory system?",
      optionA: "Purchases",
      optionB: "Cost of Goods Sold",
      optionC: "Inventory Loss",
      optionD: "Purchase Discounts",
      correctAnswer: 'B' as const,
      explanation: "A key feature of a perpetual inventory system is that the Cost of Goods Sold account is updated continuously with each sale. Accounts like \"Purchases\" and \"Purchase Discounts\" are used in a periodic system."
    },
    {
      question: "In a perpetual inventory system, when merchandise is returned by a customer, which accounts are affected?",
      optionA: "Sales Returns and Allowances and Inventory",
      optionB: "Purchases and Cost of Goods Sold",
      optionC: "Accounts Payable and Inventory",
      optionD: "Inventory and Purchases Returns",
      correctAnswer: 'A' as const,
      explanation: "In a perpetual system, a sales return requires two entries: 1) Debit to Sales Returns & Allowances (a contra-revenue account) and a credit to Accounts Receivable/Cash, and 2) Debit to Inventory and a credit to Cost of Goods Sold (to reverse the cost of the sale)."
    },
    {
      question: "Which of the following would be considered a fixed cost?",
      optionA: "Direct labor",
      optionB: "Factory utilities",
      optionC: "Rent",
      optionD: "Raw materials",
      correctAnswer: 'C' as const,
      explanation: "A fixed cost remains constant in total regardless of the level of production or sales activity (within a relevant range). Rent is a classic example. The other options are variable costs."
    },
    {
      question: "If sales increase but fixed costs remain the same, what happens to operating leverage?",
      optionA: "It increases",
      optionB: "It decreases",
      optionC: "It remains unchanged",
      optionD: "It becomes negative",
      correctAnswer: 'B' as const,
      explanation: "Operating leverage measures the proportion of fixed costs in a company's cost structure. If sales increase while fixed costs stay the same, the percentage of fixed costs to total costs decreases, thereby reducing the degree of operating leverage."
    },
    {
      question: "Which method of estimating uncollectible accounts emphasizes the balance sheet?",
      optionA: "Direct write-off method",
      optionB: "Percentage of sales method",
      optionC: "Allowance method based on aging",
      optionD: "Straight-line method",
      correctAnswer: 'C' as const,
      explanation: "The aging of receivables method focuses on estimating the desired ending balance for the Allowance for Doubtful Accounts (a balance sheet account) based on the age and collectibility of existing receivables."
    },
    {
      question: "Trade credit terms of \"2/10, net 30\" mean:",
      optionA: "A 10% discount if paid within 2 days",
      optionB: "No interest if paid in 30 days",
      optionC: "A 2% discount if paid within 10 days",
      optionD: "The invoice must be paid within 2 days",
      correctAnswer: 'C' as const,
      explanation: "The terms \"2/10, net 30\" mean the buyer can take a 2% discount if the invoice is paid within 10 days. Otherwise, the full (net) amount is due in 30 days."
    },
    {
      question: "The employer's portion of FICA taxes is recorded as:",
      optionA: "Payroll tax expense",
      optionB: "Employee deduction",
      optionC: "Liability reduction",
      optionD: "Salaries expense",
      correctAnswer: 'A' as const,
      explanation: "The employer's share of FICA (Social Security and Medicare) taxes is an additional expense to the company. It is debited to an expense account, typically called Payroll Tax Expense."
    },
    {
      question: "Which of the following would not be included in gross wages?",
      optionA: "Bonus",
      optionB: "Overtime",
      optionC: "401(k) deduction",
      optionD: "Regular pay",
      correctAnswer: 'C' as const,
      explanation: "Gross wages represent total earnings before any deductions are subtracted. A 401(k) deduction is a voluntary deduction taken from gross wages to arrive at net pay. It is not part of the gross amount."
    },
    {
      question: "Which of the following assets is not depreciated?",
      optionA: "Delivery truck",
      optionB: "Equipment",
      optionC: "Land",
      optionD: "Building",
      correctAnswer: 'C' as const,
      explanation: "Land is considered to have an indefinite useful life and its value typically does not decline over time (it may even appreciate). Therefore, it is not depreciated. All other listed assets have finite useful lives."
    },
    {
      question: "When a company disposes of equipment at a gain, it should:",
      optionA: "Debit Loss on Sale",
      optionB: "Credit Accumulated Depreciation",
      optionC: "Credit Gain on Disposal",
      optionD: "Debit Equipment",
      correctAnswer: 'C' as const,
      explanation: "If the cash received from the sale of an asset is greater than its book value, the company has a gain. This gain is recorded as a credit to an account such as Gain on Disposal of Equipment."
    },
    {
      question: "Dividends declared but not yet paid are recorded as:",
      optionA: "An expense",
      optionB: "A current liability",
      optionC: "A reduction in revenue",
      optionD: "A prepaid asset",
      correctAnswer: 'B' as const,
      explanation: "When a company declares a dividend, it creates a legal obligation to pay shareholders. This obligation is recorded as a current liability called Dividends Payable until the payment is made."
    },
    {
      question: "Which document authorizes the issuance of stock?",
      optionA: "Prospectus",
      optionB: "Articles of Incorporation",
      optionC: "Certificate of Deposit",
      optionD: "Income Statement",
      correctAnswer: 'B' as const,
      explanation: "The Articles of Incorporation is the legal document filed with the state that creates the corporation and specifies key details including the types and amounts of stock the corporation is authorized to issue."
    },
    {
      question: "Which financial statement shows each partner's capital balance?",
      optionA: "Balance Sheet",
      optionB: "Statement of Partnership Equity",
      optionC: "Statement of Cash Flows",
      optionD: "Income Statement",
      correctAnswer: 'B' as const,
      explanation: "The Statement of Partnership Equity (similar to a Statement of Stockholders' Equity for corporations) shows the changes in each partner's capital account during the period, including contributions, withdrawals, and their share of partnership income or loss."
    },
    {
      question: "A partner contributes equipment to a new partnership. The equipment should be recorded at:",
      optionA: "Original purchase price",
      optionB: "Market value",
      optionC: "Book value",
      optionD: "Zero",
      correctAnswer: 'B' as const,
      explanation: "When a partner contributes a non-cash asset to a partnership, it should be recorded at its current fair market value on the date of contribution. This ensures all partners receive fair credit for their contributions."
    },
    {
      question: "Confidentiality in accounting refers to:",
      optionA: "Hiding company losses",
      optionB: "Not disclosing client information without permission",
      optionC: "Encrypting financial statements",
      optionD: "Avoiding audits",
      correctAnswer: 'B' as const,
      explanation: "Confidentiality is a fundamental principle in accounting ethics. It requires accountants to respect the confidentiality of information acquired as a result of professional relationships and not disclose any such information without proper authority or unless there is a legal or professional obligation to do so."
    },
    {
      question: "An accountant who falsifies financial records is violating which principle?",
      optionA: "Objectivity",
      optionB: "Integrity",
      optionC: "Competence",
      optionD: "Due care",
      correctAnswer: 'B' as const,
      explanation: "Integrity is the fundamental principle that requires accountants to be straightforward and honest in all professional and business relationships. Falsifying financial records is a direct violation of the integrity principle."
    },
    {
      question: "Which financial statement shows cash inflows and outflows?",
      optionA: "Balance Sheet",
      optionB: "Statement of Retained Earnings",
      optionC: "Income Statement",
      optionD: "Statement of Cash Flows",
      correctAnswer: 'D' as const,
      explanation: "The Statement of Cash Flows reports a company's cash receipts (inflows) and cash payments (outflows) during a specific period, organized into three categories: operating, investing, and financing activities."
    },
    {
      question: "The primary purpose of financial statement analysis is to:",
      optionA: "File tax returns",
      optionB: "Identify accounting errors",
      optionC: "Evaluate business performance",
      optionD: "Prepare journal entries",
      correctAnswer: 'C' as const,
      explanation: "Financial statement analysis involves examining and interpreting financial statements to evaluate a company's performance, financial position, and future prospects. This helps stakeholders make informed economic decisions about investing, lending, or other business relationships."
    }
  ];

  const accountingEvent = await getEventByName("Accounting II");
  if (!accountingEvent) {
    console.error("❌ Accounting II event not found");
    return;
  }

  for (let i = 0; i < additionalQuestions.length; i++) {
    const q = additionalQuestions[i];
    await addQuestion(
      accountingEvent.id,
      q.question,
      q.optionA,
      q.optionB,
      q.optionC,
      q.optionD,
      q.correctAnswer,
      'Intermediate',
      1
    );
  }
  
  console.log(`✅ Successfully added ${additionalQuestions.length} additional questions to Accounting II (Questions 54-100)`);
}

// Function to run the seeding (can be called directly)
export async function runSeed() {
  try {
    await seedEvents();
    await seedAccountingIIQuestions();
    await seedAccountingIIExtensionQuestions();
    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed();
}