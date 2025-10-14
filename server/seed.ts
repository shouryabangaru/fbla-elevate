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
  points: number = 1,
  explanation?: string
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
      explanation,
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
      1,
      q.explanation
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
      1,
      q.explanation
    );
  }
  
  console.log(`✅ Successfully added ${additionalQuestions.length} additional questions to Accounting II (Questions 54-100)`);
}

export async function seedAccountingIIFinalQuestions() {
  console.log("🌱 Seeding Accounting II final questions (101-200)...");
  
  const finalQuestions = [
    {
      question: "Which of the following entries is correct for purchasing supplies on account?",
      optionA: "Debit Accounts Payable, Credit Supplies",
      optionB: "Debit Supplies, Credit Accounts Payable",
      optionC: "Debit Supplies Expense, Credit Accounts Receivable",
      optionD: "Debit Cash, Credit Supplies",
      correctAnswer: 'B' as const,
      explanation: "Purchasing supplies increases the asset account 'Supplies' (debit). Buying them \"on account\" increases the liability account 'Accounts Payable' (credit)."
    },
    {
      question: "Which financial statement shows the profitability of a business over a specific period?",
      optionA: "Balance Sheet",
      optionB: "Statement of Owner's Equity",
      optionC: "Income Statement",
      optionD: "Trial Balance",
      correctAnswer: 'C' as const,
      explanation: "The Income Statement summarizes revenues and expenses over a period of time (e.g., a month or year) to show profitability (net income or loss)."
    },
    {
      question: "What is the impact of declaring and paying cash dividends on the accounting equation?",
      optionA: "Increase assets, increase equity",
      optionB: "Decrease assets, increase liabilities",
      optionC: "Decrease assets, decrease equity",
      optionD: "Increase liabilities, increase assets",
      correctAnswer: 'C' as const,
      explanation: "Declaring a dividend reduces equity (Retained Earnings) and increases liabilities (Dividends Payable). When the dividend is paid, it decreases assets (Cash) and decreases liabilities (Dividends Payable). The net effect of the full cycle is a decrease in assets and a decrease in equity."
    },
    {
      question: "Which of the following is deducted from an employee's gross pay to arrive at net pay?",
      optionA: "Utilities",
      optionB: "Depreciation",
      optionC: "Medicare Tax",
      optionD: "Rent Expense",
      correctAnswer: 'C' as const,
      explanation: "Net pay is Gross Pay minus all deductions. Medicare Tax is a mandatory payroll deduction. Utilities, Depreciation, and Rent Expense are business expenses, not employee payroll deductions."
    },
    {
      question: "When a new partner is admitted by investment, the capital account is:",
      optionA: "Credited for the new partner",
      optionB: "Debited for the new partner",
      optionC: "Eliminated",
      optionD: "Unchanged",
      correctAnswer: 'A' as const,
      explanation: "When a new partner invests in the partnership, the partnership receives assets (debit Cash) and the new partner's capital account is credited for their equity stake."
    },
    {
      question: "If current assets are $90,000 and current liabilities are $30,000, the current ratio is:",
      optionA: "1.0",
      optionB: "2.0",
      optionC: "3.0",
      optionD: "4.0",
      correctAnswer: 'C' as const,
      explanation: "The Current Ratio is Current Assets / Current Liabilities. $90,000 / $30,000 = 3.0."
    },
    {
      question: "Under the FIFO inventory method, the inventory that is sold first is:",
      optionA: "The newest inventory",
      optionB: "The oldest inventory",
      optionC: "The most expensive inventory",
      optionD: "Random inventory",
      correctAnswer: 'B' as const,
      explanation: "FIFO (First-In, First-Out) assumes the oldest units purchased (first-in) are the first ones sold (first-out)."
    },
    {
      question: "Which of the following is classified as a direct material cost?",
      optionA: "Factory Rent",
      optionB: "Supervisor Salary",
      optionC: "Steel used in making cars",
      optionD: "Indirect Labor",
      correctAnswer: 'C' as const,
      explanation: "Direct materials are raw materials that are physically and conveniently traceable to a finished product. Steel in a car is a prime example."
    },
    {
      question: "Falsifying accounting records to deceive stakeholders is an example of:",
      optionA: "Tax avoidance",
      optionB: "Conservatism",
      optionC: "Ethical conduct",
      optionD: "Fraud",
      correctAnswer: 'D' as const,
      explanation: "Intentionally falsifying records to deceive is a deliberate act of dishonesty, which constitutes fraud."
    },
    {
      question: "Which form is typically used to report an employer's quarterly federal tax return?",
      optionA: "W-2",
      optionB: "1040",
      optionC: "940",
      optionD: "941",
      correctAnswer: 'D' as const,
      explanation: "Form 941 is the Employer's Quarterly Federal Tax Return, used to report income taxes, Social Security tax, and Medicare tax withheld from employee pay."
    },
    {
      question: "A sale of merchandise on account would be recorded as:",
      optionA: "Debit Accounts Payable, Credit Sales",
      optionB: "Debit Accounts Receivable, Credit Sales",
      optionC: "Debit Sales, Credit Accounts Receivable",
      optionD: "Debit Cash, Credit Inventory",
      correctAnswer: 'B' as const,
      explanation: "A sale on account increases a receivable (debit Accounts Receivable) and increases revenue (credit Sales)."
    },
    {
      question: "A flexible budget is best described as:",
      optionA: "A budget that does not change",
      optionB: "A budget based on fixed costs only",
      optionC: "A budget adjusted for actual activity levels",
      optionD: "A hypothetical budget",
      correctAnswer: 'C' as const,
      explanation: "A flexible budget is designed to change or \"flex\" based on the actual level of output or sales, allowing for more meaningful performance evaluation."
    },
    {
      question: "Which is a characteristic of preferred stock?",
      optionA: "Voting rights",
      optionB: "Higher risk",
      optionC: "Priority in dividends",
      optionD: "Convertible into liabilities",
      correctAnswer: 'C' as const,
      explanation: "A key characteristic of preferred stock is that it has priority over common stock in the payment of dividends."
    },
    {
      question: "Which form summarizes employee wages and tax withholdings for the year?",
      optionA: "W-4",
      optionB: "W-9",
      optionC: "941",
      optionD: "W-2",
      correctAnswer: 'D' as const,
      explanation: "Form W-2, the Wage and Tax Statement, is provided to employees annually and summarizes their annual earnings and tax withholdings."
    },
    {
      question: "The straight-line method of depreciation assumes:",
      optionA: "Accelerated depreciation early in the asset's life",
      optionB: "Constant expense over the asset's life",
      optionC: "Greater depreciation in later years",
      optionD: "A variable salvage value",
      correctAnswer: 'B' as const,
      explanation: "The straight-line method allocates the depreciable cost evenly over the asset's useful life, resulting in the same depreciation expense each year."
    },
    {
      question: "The balance sheet reports:",
      optionA: "Revenues and expenses",
      optionB: "Assets, liabilities, and equity",
      optionC: "Net income only",
      optionD: "Cash inflows and outflows",
      correctAnswer: 'B' as const,
      explanation: "The Balance Sheet is a snapshot of a company's financial position at a point in time, reporting its Assets, Liabilities, and Equity."
    },
    {
      question: "Which of the following is used to estimate ending inventory without a physical count?",
      optionA: "LIFO",
      optionB: "FIFO",
      optionC: "Gross Profit Method",
      optionD: "Specific Identification",
      correctAnswer: 'C' as const,
      explanation: "The Gross Profit Method is a technique used to estimate ending inventory for interim reports or in cases of loss, using the company's historical gross profit ratio."
    },
    {
      question: "Which journal is used to record credit sales?",
      optionA: "Cash Payments Journal",
      optionB: "Sales Journal",
      optionC: "Purchases Journal",
      optionD: "General Journal",
      correctAnswer: 'B' as const,
      explanation: "A special journal, the Sales Journal, is used to record all credit sales."
    },
    {
      question: "What is the journal entry for writing off an uncollectible account under the direct write-off method?",
      optionA: "Debit Allowance for Doubtful Accounts, Credit Accounts Receivable",
      optionB: "Debit Accounts Receivable, Credit Cash",
      optionC: "Debit Bad Debt Expense, Credit Accounts Receivable",
      optionD: "Debit Sales, Credit Bad Debt Expense",
      correctAnswer: 'C' as const,
      explanation: "Under the direct write-off method, which is not GAAP but is used for tax purposes, the uncollectible amount is directly expensed (debit Bad Debt Expense) and the receivable is removed (credit Accounts Receivable)."
    },
    {
      question: "Which of the following is NOT included in factory overhead?",
      optionA: "Factory Utilities",
      optionB: "Factory Supervisor Salary",
      optionC: "Direct Materials",
      optionD: "Indirect Labor",
      correctAnswer: 'C' as const,
      explanation: "Factory overhead consists of all manufacturing costs except direct materials and direct labor. Direct Materials is a separate, prime cost."
    },
    {
      question: "An accountant who discloses confidential client information without consent is violating:",
      optionA: "The objectivity principle",
      optionB: "The cost principle",
      optionC: "The confidentiality principle",
      optionD: "The matching principle",
      correctAnswer: 'C' as const,
      explanation: "The ethical principle of confidentiality requires accountants to refrain from disclosing confidential information without proper authorization."
    },
    {
      question: "Which account is credited when services are rendered for cash?",
      optionA: "Accounts Receivable",
      optionB: "Service Revenue",
      optionC: "Unearned Revenue",
      optionD: "Cash",
      correctAnswer: 'B' as const,
      explanation: "When services are rendered for cash, you debit Cash and credit a revenue account, in this case, Service Revenue."
    },
    {
      question: "Which of the following taxes is paid equally by employers and employees?",
      optionA: "Federal income tax",
      optionB: "Medicare tax",
      optionC: "State unemployment tax",
      optionD: "FUTA",
      correctAnswer: 'B' as const,
      explanation: "Medicare tax is a FICA tax that is split equally between the employee and employer. Federal income tax is only withheld from the employee."
    },
    {
      question: "Which of the following affects the owner's equity section of the balance sheet?",
      optionA: "Purchasing inventory with cash",
      optionB: "Earning net income",
      optionC: "Paying a utility bill",
      optionD: "Taking out a loan",
      correctAnswer: 'B' as const,
      explanation: "Net income increases Retained Earnings, which is a component of owner's (or stockholders') equity. The other transactions affect only assets and liabilities."
    },
    {
      question: "A perpetual inventory system differs from a periodic system in that it:",
      optionA: "Requires physical counts monthly",
      optionB: "Updates inventory only at year-end",
      optionC: "Maintains continuous inventory records",
      optionD: "Is less expensive to implement",
      correctAnswer: 'C' as const,
      explanation: "The key feature of a perpetual system is that the inventory records are updated continuously with each purchase and sale."
    },
    {
      question: "The debt-to-equity ratio is calculated by dividing total liabilities by:",
      optionA: "Net income",
      optionB: "Total assets",
      optionC: "Total equity",
      optionD: "Working capital",
      correctAnswer: 'C' as const,
      explanation: "The Debt-to-Equity Ratio = Total Liabilities / Total Equity. It measures a company's financial leverage."
    },
    {
      question: "When common stock is issued above par value, the excess is recorded as:",
      optionA: "Discount on Stock",
      optionB: "Treasury Stock",
      optionC: "Paid-in Capital in Excess of Par",
      optionD: "Retained Earnings",
      correctAnswer: 'C' as const,
      explanation: "The par value is credited to Common Stock. Any amount received above par is credited to Paid-in Capital in Excess of Par (or Additional Paid-in Capital)."
    },
    {
      question: "A partnership agreement should include all of the following EXCEPT:",
      optionA: "Withdrawal arrangements",
      optionB: "Allocation of profits",
      optionC: "Future sale price of the business",
      optionD: "Partner responsibilities",
      correctAnswer: 'C' as const,
      explanation: "A partnership agreement covers partner duties, profit sharing, and withdrawal terms. The future sale price of the business cannot be predetermined and is not part of the agreement."
    },
    {
      question: "Which of the following costs should be capitalized as part of equipment?",
      optionA: "Annual maintenance",
      optionB: "Training costs",
      optionC: "Sales tax on the purchase",
      optionD: "Interest on a loan after purchase",
      correctAnswer: 'C' as const,
      explanation: "Costs to acquire and prepare an asset for use are capitalized. This includes the purchase price and sales tax. Maintenance, training, and interest after use are expenses."
    },
    {
      question: "What type of tax structure increases in rate as income increases?",
      optionA: "Regressive",
      optionB: "Flat",
      optionC: "Progressive",
      optionD: "Fixed",
      correctAnswer: 'C' as const,
      explanation: "A progressive tax system imposes a higher tax rate on higher levels of taxable income. The U.S. federal income tax is progressive."
    },
    {
      question: "Conversion costs consist of:",
      optionA: "Direct materials and factory overhead",
      optionB: "Direct labor and factory overhead",
      optionC: "Direct materials and direct labor",
      optionD: "Indirect materials and administrative costs",
      correctAnswer: 'B' as const,
      explanation: "Conversion Costs are the costs of converting raw materials into finished goods: Direct Labor + Factory Overhead."
    },
    {
      question: "A trial balance that is out of balance could result from:",
      optionA: "Recording a transaction in the general journal",
      optionB: "Posting to the correct account",
      optionC: "Debiting a transaction for $500 and crediting it for $50",
      optionD: "Recording both sides of a transaction in the same account",
      correctAnswer: 'C' as const,
      explanation: "A trial balance will be out of balance if a transaction is recorded with unequal debits and credits. The other errors would not cause an imbalance."
    },
    {
      question: "An increase in Accounts Receivable affects the cash flow statement as a:",
      optionA: "Positive adjustment in operating activities",
      optionB: "Negative adjustment in financing activities",
      optionC: "Negative adjustment in operating activities",
      optionD: "Positive adjustment in investing activities",
      correctAnswer: 'C' as const,
      explanation: "An increase in Accounts Receivable means sales revenue was recorded but cash was not yet collected. Under the indirect method, this increase is subtracted from net income (a negative adjustment) in the operating activities section."
    },
    {
      question: "What is the primary purpose of a cash budget?",
      optionA: "To project long-term profitability",
      optionB: "To allocate overhead",
      optionC: "To estimate financing needs",
      optionD: "To record depreciation",
      correctAnswer: 'C' as const,
      explanation: "The primary purpose of a cash budget is to forecast cash inflows and outflows to determine if the company will have a cash shortage (needing financing) or a cash surplus."
    },
    {
      question: "What is treasury stock?",
      optionA: "Stock issued to new investors",
      optionB: "Previously issued stock repurchased by the company",
      optionC: "Stock reserved for future issuance",
      optionD: "Preferred stock with voting rights",
      correctAnswer: 'B' as const,
      explanation: "Treasury stock is a corporation's own stock that has been issued and then reacquired (repurchased) by the company."
    },
    {
      question: "Which of the following would increase gross earnings on a payroll register?",
      optionA: "Social Security withholding",
      optionB: "Federal income tax",
      optionC: "Overtime pay",
      optionD: "State income tax",
      correctAnswer: 'C' as const,
      explanation: "Gross earnings are total earnings before deductions. Overtime pay increases gross earnings. The other options are deductions that reduce net pay."
    },
    {
      question: "If a company sells an asset for more than its book value, the result is a:",
      optionA: "Loss",
      optionB: "Expense",
      optionC: "Gain",
      optionD: "Liability",
      correctAnswer: 'C' as const,
      explanation: "Selling an asset for more than its book value (Cost - Accumulated Depreciation) results in a gain on disposal."
    },
    {
      question: "What is the term for money owed by customers for goods sold on credit?",
      optionA: "Accounts Payable",
      optionB: "Notes Payable",
      optionC: "Accounts Receivable",
      optionD: "Unearned Revenue",
      correctAnswer: 'C' as const,
      explanation: "Accounts Receivable represents the amount owed to a company by its customers from credit sales."
    },
    {
      question: "Which action best reflects integrity in accounting?",
      optionA: "Understating liabilities to meet loan requirements",
      optionB: "Following GAAP principles consistently",
      optionC: "Omitting expenses to increase profit",
      optionD: "Failing to disclose related-party transactions",
      correctAnswer: 'B' as const,
      explanation: "Integrity means being honest and principled. Consistently following GAAP, even when inconvenient, is a key demonstration of integrity."
    },
    {
      question: "The return on assets (ROA) ratio is calculated by dividing net income by:",
      optionA: "Current liabilities",
      optionB: "Average total assets",
      optionC: "Total equity",
      optionD: "Gross profit",
      correctAnswer: 'B' as const,
      explanation: "Return on Assets (ROA) = Net Income / Average Total Assets. It measures how efficiently a company uses its assets to generate profit."
    },
    {
      question: "Posting a journal entry to the wrong account but with the correct dollar amount will:",
      optionA: "Not affect the trial balance",
      optionB: "Cause a debit/credit imbalance",
      optionC: "Require reversing entries",
      optionD: "Always increase liabilities",
      correctAnswer: 'A' as const,
      explanation: "If debits and credits are equal but posted to the wrong accounts, the trial balance will still balance because total debits still equal total credits. The error is one of misclassification."
    },
    {
      question: "What happens when a partner withdraws assets in excess of their capital balance?",
      optionA: "The partnership earns a gain",
      optionB: "Other partners absorb the loss",
      optionC: "The balance sheet remains unaffected",
      optionD: "Assets are understated",
      correctAnswer: 'B' as const,
      explanation: "If a partner withdraws more than their capital balance, the excess is a loss to the partnership. This loss is typically allocated to the other partners' capital accounts according to their profit-and-loss ratio."
    },
    {
      question: "Which inventory method often results in lower taxable income during inflation?",
      optionA: "FIFO",
      optionB: "LIFO",
      optionC: "Specific identification",
      optionD: "Weighted average",
      correctAnswer: 'B' as const,
      explanation: "During inflation, LIFO (Last-In, First-Out) assigns the higher, more recent costs to Cost of Goods Sold. This higher COGS results in lower taxable income."
    },
    {
      question: "Which of the following is a period cost in manufacturing?",
      optionA: "Factory rent",
      optionB: "Indirect labor",
      optionC: "Administrative salaries",
      optionD: "Depreciation on equipment",
      correctAnswer: 'C' as const,
      explanation: "Period costs are non-manufacturing costs (selling and administrative expenses) and are expensed in the period incurred. Administrative salaries are a period cost. The other options are product costs (manufacturing overhead)."
    },
    {
      question: "Which account is reported in the equity section of a sole proprietorship?",
      optionA: "Common Stock",
      optionB: "Retained Earnings",
      optionC: "Owner's Capital",
      optionD: "Preferred Stock",
      correctAnswer: 'C' as const,
      explanation: "A sole proprietorship uses a single Owner's Capital account instead of the Common Stock and Retained Earnings accounts used by a corporation."
    },
    {
      question: "Which budget would most likely include estimates for advertising and office salaries?",
      optionA: "Production Budget",
      optionB: "Capital Expenditures Budget",
      optionC: "Selling and Administrative Budget",
      optionD: "Direct Materials Budget",
      correctAnswer: 'C' as const,
      explanation: "The Selling and Administrative Expense Budget plans for all non-manufacturing costs, such as advertising, office salaries, and other administrative expenses."
    },
    {
      question: "What is the employer's responsibility for FICA tax?",
      optionA: "Match the employee's contribution",
      optionB: "Withhold state income tax",
      optionC: "Pay FUTA tax",
      optionD: "Submit W-2s to the IRS",
      correctAnswer: 'A' as const,
      explanation: "For FICA taxes (Social Security and Medicare), the employer must match the dollar amount withheld from the employee's pay."
    },
    {
      question: "Which income is typically NOT taxable for an individual?",
      optionA: "Wages",
      optionB: "Lottery winnings",
      optionC: "Child support received",
      optionD: "Dividends",
      correctAnswer: 'C' as const,
      explanation: "Child support payments received are not considered taxable income for the recipient."
    },
    {
      question: "Which form is used to report corporate income to the IRS?",
      optionA: "Form 1040",
      optionB: "Form 1065",
      optionC: "Form 1120",
      optionD: "Form W-4",
      correctAnswer: 'C' as const,
      explanation: "Form 1120, U.S. Corporation Income Tax Return, is used by C corporations to report their income and calculate their tax liability."
    },
    {
      question: "What is the purpose of recording depreciation?",
      optionA: "To increase asset value",
      optionB: "To match asset costs to revenue",
      optionC: "To calculate market value",
      optionD: "To reduce cash",
      correctAnswer: 'B' as const,
      explanation: "Depreciation is an application of the matching principle. It allocates the cost of a long-lived asset to expense over its useful life to match the cost with the revenues it helps to generate."
    },
    {
      question: "What is the correct journal entry for receiving cash for services not yet performed?",
      optionA: "Debit Service Revenue, Credit Cash",
      optionB: "Debit Unearned Revenue, Credit Cash",
      optionC: "Debit Cash, Credit Unearned Revenue",
      optionD: "Debit Accounts Receivable, Credit Service Revenue",
      correctAnswer: 'C' as const,
      explanation: "Receiving cash before earning it creates a liability. Debit Cash (asset increases) and credit Unearned Revenue (liability increases)."
    },
    {
      question: "Which of the following taxes is paid by both the employer and the employee?",
      optionA: "Federal income tax",
      optionB: "Medicare tax",
      optionC: "Federal unemployment tax",
      optionD: "State unemployment tax",
      correctAnswer: 'B' as const,
      explanation: "Medicare tax is a FICA tax that is split equally between the employee and employer."
    },
    {
      question: "Which inventory costing method assumes the earliest goods purchased are the first to be sold?",
      optionA: "LIFO",
      optionB: "FIFO",
      optionC: "Weighted Average",
      optionD: "Specific Identification",
      correctAnswer: 'B' as const,
      explanation: "FIFO (First-In, First-Out) assumes the earliest (oldest) goods purchased are the first ones to be sold."
    },
    {
      question: "What does the current ratio measure?",
      optionA: "Profitability",
      optionB: "Liquidity",
      optionC: "Efficiency",
      optionD: "Solvency",
      correctAnswer: 'B' as const,
      explanation: "The Current Ratio (Current Assets / Current Liabilities) measures a company's liquidity, or its ability to pay its short-term obligations."
    },
    {
      question: "Which transaction increases stockholders' equity?",
      optionA: "Declaring a dividend",
      optionB: "Purchasing treasury stock",
      optionC: "Issuing common stock",
      optionD: "Paying off a loan",
      correctAnswer: 'C' as const,
      explanation: "Issuing common stock in exchange for cash or other assets increases the company's paid-in capital, which is a component of stockholders' equity."
    },
    {
      question: "When a new partner is admitted to a partnership by investing cash, which account is credited?",
      optionA: "Partner, Capital (new partner)",
      optionB: "Cash",
      optionC: "Common Stock",
      optionD: "Retained Earnings",
      correctAnswer: 'A' as const,
      explanation: "The new partner's investment increases the partnership's assets (debit Cash) and increases the new partner's equity (credit [New Partner's Name], Capital)."
    },
    {
      question: "Which of the following best describes confidentiality in accounting?",
      optionA: "Avoiding illegal acts",
      optionB: "Disclosing sensitive information only to authorized parties",
      optionC: "Keeping all records forever",
      optionD: "Preparing reports with estimated numbers",
      correctAnswer: 'B' as const,
      explanation: "The principle of confidentiality requires that professional accountants refrain from disclosing confidential information to third parties without proper authority."
    },
    {
      question: "Which method results in the highest depreciation expense in the first year?",
      optionA: "Straight-line",
      optionB: "Declining balance",
      optionC: "Sum-of-the-years'-digits",
      optionD: "Units-of-production",
      correctAnswer: 'B' as const,
      explanation: "The declining balance method is an accelerated depreciation method that applies a constant rate to a declining book value, resulting in the highest expense in the first year."
    },
    {
      question: "Factory overhead does not include:",
      optionA: "Factory rent",
      optionB: "Factory supervisor salary",
      optionC: "Direct materials",
      optionD: "Depreciation on factory equipment",
      correctAnswer: 'C' as const,
      explanation: "Factory overhead includes all indirect manufacturing costs. Direct materials is a separate, prime cost and is not part of overhead."
    },
    {
      question: "Which of the following is a financing activity on the cash flow statement?",
      optionA: "Buying equipment",
      optionB: "Paying dividends",
      optionC: "Receiving interest revenue",
      optionD: "Purchasing inventory",
      correctAnswer: 'B' as const,
      explanation: "Financing activities involve transactions with owners and creditors. Paying dividends to shareholders is a financing cash outflow."
    },
    {
      question: "A flexible budget adjusts for:",
      optionA: "Fixed overhead",
      optionB: "Actual activity levels",
      optionC: "Annual inflation",
      optionD: "Capital structure",
      correctAnswer: 'B' as const,
      explanation: "A flexible budget is designed to change or \"flex\" based on the actual level of activity achieved, unlike a static budget which is fixed."
    },
    {
      question: "What is the effect of writing off an uncollectible account under the direct write-off method?",
      optionA: "Increase assets",
      optionB: "Decrease liabilities",
      optionC: "Decrease expenses",
      optionD: "No effect on total assets",
      correctAnswer: 'D' as const,
      explanation: "Under the direct write-off method, the entry is Debit Bad Debt Expense, Credit Accounts Receivable. This exchange reduces an asset (Accounts Receivable) and reduces equity (via the expense). The accounting equation remains in balance, and total assets do not change; one component of equity is simply converted into another."
    },
    {
      question: "The cost of a plant asset does not include:",
      optionA: "Sales tax",
      optionB: "Installation charges",
      optionC: "Maintenance costs after use",
      optionD: "Delivery fees",
      correctAnswer: 'C' as const,
      explanation: "Costs to acquire and prepare an asset for use are capitalized. Maintenance costs incurred after the asset is in use are recurring operating expenses and are not part of the asset's cost."
    },
    {
      question: "Which of the following accounts appears on the income statement?",
      optionA: "Accumulated Depreciation",
      optionB: "Unearned Revenue",
      optionC: "Salaries Expense",
      optionD: "Retained Earnings",
      correctAnswer: 'C' as const,
      explanation: "The Income Statement reports revenues and expenses. Salaries Expense is an expense account. The others are balance sheet accounts."
    },
    {
      question: "In departmental accounting, which statement is used to determine the profitability of each department?",
      optionA: "Balance Sheet",
      optionB: "Statement of Retained Earnings",
      optionC: "Departmental Statement of Gross Profit",
      optionD: "Cash Flow Statement",
      correctAnswer: 'C' as const,
      explanation: "The Departmental Statement of Gross Profit (or Departmental Income Statement) is prepared to analyze the revenue, cost of goods sold, and gross profit for each individual department."
    },
    {
      question: "What is the effect of a stock dividend on total stockholders' equity?",
      optionA: "It increases equity",
      optionB: "It decreases equity",
      optionC: "No change to total equity",
      optionD: "It increases liabilities",
      correctAnswer: 'C' as const,
      explanation: "A stock dividend simply transfers an amount from Retained Earnings to Paid-in Capital accounts. It is a reclassification within stockholders' equity, so total stockholders' equity does not change."
    },
    {
      question: "Deferred tax liabilities arise when:",
      optionA: "Taxable income is less than accounting income",
      optionB: "Taxable income equals accounting income",
      optionC: "Taxable income is greater than accounting income",
      optionD: "There is no tax expense",
      correctAnswer: 'A' as const,
      explanation: "A deferred tax liability arises when temporary differences cause taxable income to be less than pre-tax accounting income. This means the company has delayed paying taxes to a future period."
    },
    {
      question: "Which of the following comes first in the accounting cycle?",
      optionA: "Posting to the ledger",
      optionB: "Preparing a trial balance",
      optionC: "Journalizing transactions",
      optionD: "Closing entries",
      correctAnswer: 'C' as const,
      explanation: "The first step in the accounting cycle is to analyze transactions and journalize them in the general journal."
    },
    {
      question: "What type of account is \"Sales Returns and Allowances\"?",
      optionA: "Asset",
      optionB: "Liability",
      optionC: "Contra-revenue",
      optionD: "Expense",
      correctAnswer: 'C' as const,
      explanation: "Sales Returns and Allowances is a contra-revenue account. It has a normal debit balance and is subtracted from Sales Revenue on the income statement."
    },
    {
      question: "Which ratio is most helpful in evaluating solvency?",
      optionA: "Acid-test ratio",
      optionB: "Current ratio",
      optionC: "Debt to equity ratio",
      optionD: "Gross margin ratio",
      correctAnswer: 'C' as const,
      explanation: "Solvency refers to a company's ability to meet its long-term obligations. The Debt-to-Equity Ratio is a key measure of long-term financial leverage and solvency."
    },
    {
      question: "The Gross Profit Method is used to:",
      optionA: "Estimate ending inventory",
      optionB: "Determine cost of goods manufactured",
      optionC: "Calculate depreciation",
      optionD: "Allocate indirect costs",
      correctAnswer: 'A' as const,
      explanation: "The Gross Profit Method is a technique for estimating ending inventory without a physical count, often used for interim reporting or in case of a fire loss."
    },
    {
      question: "Which of the following is a variable cost?",
      optionA: "Factory rent",
      optionB: "Property taxes",
      optionC: "Direct labor",
      optionD: "Insurance",
      correctAnswer: 'C' as const,
      explanation: "A variable cost changes in direct proportion to the level of production. Direct labor is typically a variable cost. The other options are generally fixed costs."
    },
    {
      question: "Which entry is made when merchandise is returned to a supplier on account?",
      optionA: "Debit Purchases Returns and Allowances, Credit Accounts Payable",
      optionB: "Debit Accounts Payable, Credit Purchases",
      optionC: "Debit Supplies, Credit Accounts Payable",
      optionD: "Debit Accounts Receivable, Credit Sales",
      correctAnswer: 'A' as const,
      explanation: "Returning merchandise to a supplier reduces the amount owed (credit Accounts Payable) and is recorded in a contra-purchases account (debit Purchases Returns and Allowances)."
    },
    {
      question: "The process of recording the use of natural resources is called:",
      optionA: "Depreciation",
      optionB: "Amortization",
      optionC: "Depletion",
      optionD: "Exhaustion",
      correctAnswer: 'C' as const,
      explanation: "The systematic allocation of the cost of a natural resource (like a mine or timber tract) is called depletion."
    },
    {
      question: "What is considered an unethical accounting practice?",
      optionA: "Estimating depreciation",
      optionB: "Using LIFO inventory costing",
      optionC: "Backdating revenue entries",
      optionD: "Recording accrued expenses",
      correctAnswer: 'C' as const,
      explanation: "Backdating entries to record revenue in a period when it was not earned is a deliberate act of misrepresentation and is unethical."
    },
    {
      question: "What happens when a corporation declares a cash dividend?",
      optionA: "Assets increase",
      optionB: "Liabilities increase",
      optionC: "Stockholders' equity increases",
      optionD: "Revenue increases",
      correctAnswer: 'B' as const,
      explanation: "When a cash dividend is declared, Retained Earnings (equity) decreases and a current liability, Dividends Payable, increases."
    },
    {
      question: "Which document is completed by employees to determine tax withholding?",
      optionA: "W-2",
      optionB: "W-4",
      optionC: "941",
      optionD: "940",
      correctAnswer: 'B' as const,
      explanation: "Employees complete Form W-4 (Employee's Withholding Certificate) to provide their employer with information needed to calculate federal income tax withholding."
    },
    {
      question: "A correcting entry is required when:",
      optionA: "A transaction was posted twice",
      optionB: "A trial balance doesn't balance",
      optionC: "A transaction is recorded in the wrong account",
      optionD: "A payment is missed",
      correctAnswer: 'C' as const,
      explanation: "A correcting entry is a journal entry made to fix an error in the ledger, such as a transaction that was recorded in the wrong account."
    },
    {
      question: "Which is not a component of a master budget?",
      optionA: "Capital expenditures budget",
      optionB: "Production budget",
      optionC: "Cash budget",
      optionD: "Partnership agreement",
      correctAnswer: 'D' as const,
      explanation: "A master budget is a comprehensive financial plan. A partnership agreement is a legal document governing the relationship between partners and is not a budgetary component."
    },
    {
      question: "Which of the following would not be considered a current asset?",
      optionA: "Accounts Receivable",
      optionB: "Prepaid Insurance",
      optionC: "Equipment",
      optionD: "Supplies",
      correctAnswer: 'C' as const,
      explanation: "Equipment is a long-term (plant) asset because it is used in operations for more than one year and is not intended for resale. The other options are assets expected to be used or converted to cash within one year."
    },
    {
      question: "Which of the following is true about preferred stock?",
      optionA: "It always has voting rights",
      optionB: "It ranks above common stock in dividends and liquidation",
      optionC: "It is recorded in a liability account",
      optionD: "It must be issued before common stock",
      correctAnswer: 'B' as const,
      explanation: "A key feature of preferred stock is that it has priority (seniority) over common stock in the payment of dividends and in the distribution of assets during liquidation."
    },
    {
      question: "A schedule of accounts payable is used to:",
      optionA: "List all vendors and the amounts owed to them",
      optionB: "Reconcile bank statements",
      optionC: "Track customer payments",
      optionD: "Determine tax liabilities",
      correctAnswer: 'A' as const,
      explanation: "A schedule of accounts payable is a listing of all vendors (creditors) in the accounts payable subsidiary ledger and the amount owed to each."
    },
    {
      question: "Which document tracks the movement of raw materials into production?",
      optionA: "Materials requisition form",
      optionB: "Purchase order",
      optionC: "Sales invoice",
      optionD: "Check register",
      correctAnswer: 'A' as const,
      explanation: "A materials requisition form is an internal document that authorizes the issuance of raw materials from the storeroom to the production department."
    },
    {
      question: "Which of the following ratios measures profitability?",
      optionA: "Current Ratio",
      optionB: "Gross Profit Margin",
      optionC: "Working Capital",
      optionD: "Debt Ratio",
      correctAnswer: 'B' as const,
      explanation: "The Gross Profit Margin (Gross Profit / Net Sales) is a profitability ratio that measures the percentage of revenue exceeding the cost of goods sold."
    },
    {
      question: "What is the formula for straight-line depreciation?",
      optionA: "(Cost − Salvage Value) ÷ Useful Life",
      optionB: "Cost × Rate",
      optionC: "(Cost + Salvage Value) ÷ Useful Life",
      optionD: "Salvage Value ÷ Useful Life",
      correctAnswer: 'A' as const,
      explanation: "The formula for straight-line depreciation is (Cost of Asset - Salvage Value) / Estimated Useful Life."
    },
    {
      question: "Which form is used to report annual federal unemployment tax?",
      optionA: "Form 940",
      optionB: "Form 941",
      optionC: "Form W-4",
      optionD: "Form W-2",
      correctAnswer: 'A' as const,
      explanation: "Form 940 is used to report and pay the Federal Unemployment Tax Act (FUTA) tax on an annual basis."
    },
    {
      question: "What is recorded when a company trades in old equipment for new equipment?",
      optionA: "Loss on Disposal",
      optionB: "Equipment is removed, and cash is debited",
      optionC: "New equipment is debited; old asset and gain/loss are recorded",
      optionD: "Depreciation is reversed",
      correctAnswer: 'C' as const,
      explanation: "In an exchange of assets, the new equipment is recorded at its fair value (or the fair value of the asset given up). The old asset and its accumulated depreciation are removed from the books, and a gain or loss is recognized for the difference."
    },
    {
      question: "Which budget compares planned and actual results?",
      optionA: "Performance budget",
      optionB: "Static budget",
      optionC: "Master budget",
      optionD: "Cash budget",
      correctAnswer: 'A' as const,
      explanation: "A performance budget is a tool that directly compares budgeted (planned) figures with actual results to evaluate performance."
    },
    {
      question: "Which action violates the principle of integrity in accounting?",
      optionA: "Disclosing financial errors to management",
      optionB: "Manipulating numbers to meet targets",
      optionC: "Following GAAP",
      optionD: "Reviewing controls",
      correctAnswer: 'B' as const,
      explanation: "Integrity requires honesty. Manipulating financial data is a direct violation of this principle."
    },
    {
      question: "What type of account is credited when a business pays an account payable?",
      optionA: "Cash",
      optionB: "Accounts Receivable",
      optionC: "Inventory",
      optionD: "Supplies",
      correctAnswer: 'A' as const,
      explanation: "When an accounts payable is paid, the liability is reduced (debit Accounts Payable) and the asset Cash is reduced (credit Cash)."
    },
    {
      question: "Which of the following is included in investing activities?",
      optionA: "Paying wages",
      optionB: "Issuing stock",
      optionC: "Purchasing equipment",
      optionD: "Paying dividends",
      correctAnswer: 'C' as const,
      explanation: "Investing activities involve the purchase and sale of long-term assets. Purchasing equipment is an investing cash outflow."
    },
    {
      question: "The payroll register summarizes:",
      optionA: "Vendor payments",
      optionB: "Inventory purchases",
      optionC: "Gross pay, deductions, and net pay",
      optionD: "Revenue and expenses",
      correctAnswer: 'C' as const,
      explanation: "The payroll register is a detailed report for each pay period that lists each employee's gross pay, deductions, and net pay."
    },
    {
      question: "Which method values inventory closest to current market prices under inflation?",
      optionA: "FIFO",
      optionB: "LIFO",
      optionC: "Weighted Average",
      optionD: "Retail Method",
      correctAnswer: 'A' as const,
      explanation: "During inflation, FIFO assigns the oldest, lowest costs to Cost of Goods Sold, leaving the newest, higher-cost items in ending inventory. Thus, ending inventory is valued closer to current replacement costs."
    },
    {
      question: "What does the acid-test ratio exclude?",
      optionA: "Cash",
      optionB: "Accounts Receivable",
      optionC: "Inventory",
      optionD: "Marketable Securities",
      correctAnswer: 'C' as const,
      explanation: "The Acid-Test (Quick) Ratio is a stringent liquidity measure that excludes inventory and prepaid expenses, focusing on the most liquid assets (cash, marketable securities, and receivables)."
    },
    {
      question: "Which of the following is considered direct labor?",
      optionA: "Assembly line worker",
      optionB: "Factory janitor",
      optionC: "Machine maintenance technician",
      optionD: "Factory manager",
      correctAnswer: 'A' as const,
      explanation: "Direct labor is the cost of employees who directly work on converting raw materials into the finished product. An assembly line worker's wages are a direct labor cost."
    },
    {
      question: "Earnings per share is calculated using:",
      optionA: "Total revenue ÷ Number of employees",
      optionB: "Net income ÷ Number of common shares",
      optionC: "Dividends paid ÷ Total equity",
      optionD: "Net sales ÷ Number of shares issued",
      correctAnswer: 'B' as const,
      explanation: "Basic Earnings Per Share (EPS) = (Net Income - Preferred Dividends) / Weighted-Average Number of Common Shares Outstanding."
    },
    {
      question: "What is a key reason to maintain accurate financial records?",
      optionA: "To increase expenses",
      optionB: "To hide losses",
      optionC: "To comply with regulations",
      optionD: "To avoid paying taxes",
      correctAnswer: 'C' as const,
      explanation: "A key reason for maintaining accurate records is to comply with laws, regulations, and financial reporting standards (like GAAP)."
    },
    {
      question: "Which concept allows businesses to delay paying some taxes to future periods?",
      optionA: "Deferred tax liability",
      optionB: "Accrued expenses",
      optionC: "Unearned revenue",
      optionD: "Amortization",
      correctAnswer: 'A' as const,
      explanation: "A deferred tax liability is an account that represents taxes that have been accrued for accounting income but are not yet payable to the tax authorities, effectively delaying the tax payment to a future period."
    },
    {
      question: "A voucher system is primarily used to:",
      optionA: "Track payroll",
      optionB: "Record cash payments",
      optionC: "Approve and document purchases",
      optionD: "Post to ledgers",
      correctAnswer: 'C' as const,
      explanation: "A voucher system is a set of procedures and approvals for authorizing and documenting cash disbursements, primarily for purchases."
    },
    {
      question: "Which of the following would increase the cost of goods sold?",
      optionA: "Purchase returns",
      optionB: "Sales discounts",
      optionC: "Freight-in",
      optionD: "Ending inventory",
      correctAnswer: 'C' as const,
      explanation: "Freight-in (transportation-in) is a cost incurred to acquire inventory and is added to the cost of purchases, which ultimately increases the Cost of Goods Sold. Purchase returns and ending inventory decrease COGS. Sales discounts are a contra-revenue account."
    }
  ];

  const accountingEvent = await getEventByName("Accounting II");
  if (!accountingEvent) {
    console.error("❌ Accounting II event not found");
    return;
  }

  for (let i = 0; i < finalQuestions.length; i++) {
    const q = finalQuestions[i];
    await addQuestion(
      accountingEvent.id,
      q.question,
      q.optionA,
      q.optionB,
      q.optionC,
      q.optionD,
      q.correctAnswer,
      'Intermediate',
      1,
      q.explanation
    );
  }
  
  console.log(`✅ Successfully added ${finalQuestions.length} final questions to Accounting II (Questions 101-200)`);
}

// Seed Parliamentary Procedure Questions
export async function seedParliamentaryProcedureQuestions() {
  console.log("🏛️ Seeding Introduction to Parliamentary Procedure questions...");
  
  const getEventByName = async (name: string) => {
    const result = await db.select().from(events).where(eq(events.name, name));
    return result[0] || null;
  };

  const parliamentaryEvent = await getEventByName("Introduction to Parliamentary Procedure");
  if (!parliamentaryEvent) {
    console.error("❌ Introduction to Parliamentary Procedure event not found");
    return;
  }

  const parliamentaryQuestions = [
  {
    question: "When a motion is postponed definitely, it may:",
    optionA: "Be renewed at the same session once it is postponed",
    optionB: "Be laid on the table without debate when it is resumed",
    optionC: "Be reconsidered only if debate has not occurred",
    optionD: "Resume at the time specified without further action",
    correctAnswer: 'D' as const,
    explanation: "The motion to Postpone to a Certain Time (or \"definitely\") schedules the main motion to come back automatically at the specified time. No new motion is needed to resume its consideration."
  },
  {
    question: "According to the FBLA National Bylaws, which of the following is not a required officer for a local chapter?",
    optionA: "Historian",
    optionB: "President",
    optionC: "Secretary",
    optionD: "Treasurer",
    correctAnswer: 'A' as const,
    explanation: "While many chapters have a Historian, the FBLA National Bylaws only require a chapter to have, at a minimum, a President, Secretary, and Treasurer."
  },
  {
    question: "In the absence of a quorum, a deliberative assembly may:",
    optionA: "Adopt main motions requiring only a simple majority",
    optionB: "Approve routine reports",
    optionC: "Adjourn or take measures to obtain a quorum",
    optionD: "Refer items to a committee",
    correctAnswer: 'C' as const,
    explanation: "Without a quorum, an assembly cannot conduct substantive business. The only motions in order are those related to obtaining a quorum (like a Recess) or to Adjourn (except to adjourn to a later time)."
  },
  {
    question: "If a motion to \"Reconsider\" is made while another item is pending:",
    optionA: "It is taken up immediately",
    optionB: "It is debatable only if the motion it reconsiders is debatable",
    optionC: "It is treated as incidental",
    optionD: "It is postponed automatically",
    correctAnswer: 'C' as const,
    explanation: "When a motion to Reconsider is made while other business is pending, it is classified as an incidental motion and must be decided immediately before the pending business can continue."
  },
  {
    question: "In national FBLA, a candidate must be screened by which of the following before appearing on the ballot?",
    optionA: "Executive Council and National President",
    optionB: "State Chair and Regional VP",
    optionC: "Screening Committee and Board of Directors",
    optionD: "Screening Committee and National Adviser",
    correctAnswer: 'C' as const,
    explanation: "The FBLA bylaws stipulate that national officer candidates must be screened and approved by both a Screening Committee and the Board of Directors to ensure they meet all eligibility requirements."
  },
  {
    question: "The motion to \"Commit or Refer\" can be applied to:",
    optionA: "Privileged motions",
    optionB: "Main motions and some amendments",
    optionC: "Only main motions",
    optionD: "Main and incidental motions",
    correctAnswer: 'B' as const,
    explanation: "The subsidiary motion to Commit or Refer can be applied to a main motion and any amendments that are pending with it. It cannot be applied to other types of motions."
  },
  {
    question: "An amendment to an amendment:",
    optionA: "Must be germane to the primary amendment",
    optionB: "Is debatable only if the main motion is",
    optionC: "Requires a two-thirds vote",
    optionD: "Can introduce a new subject",
    correctAnswer: 'A' as const,
    explanation: "A secondary amendment (amendment to an amendment) must be directly related to and within the scope of the primary amendment it seeks to change."
  },
  {
    question: "Which of the following is true about the motion to \"Suspend the Rules\"?",
    optionA: "It is not allowed under any circumstances to suspend bylaws",
    optionB: "It requires a majority vote under all conditions",
    optionC: "It allows temporary violation of rules set by the bylaws",
    optionD: "It may be applied to standing rules and parliamentary law",
    correctAnswer: 'D' as const,
    explanation: "The motion to Suspend the Rules can be used to temporarily set aside standing rules (rules of order) or an ordinary rule of the assembly. It cannot be used to suspend bylaws or fundamental principles of parliamentary law, and it requires a two-thirds vote."
  },
  {
    question: "A national officer candidate must hold which minimum level of FBLA membership?",
    optionA: "Associate",
    optionB: "Collegiate",
    optionC: "Professional",
    optionD: "Active",
    correctAnswer: 'D' as const,
    explanation: "To be eligible for national office, a candidate must be an active member of FBLA, which is the standard membership category for students."
  },
  {
    question: "A Point of Order can be ruled upon by:",
    optionA: "The maker of the motion",
    optionB: "The majority vote of the body",
    optionC: "The presiding officer, unless appealed",
    optionD: "The parliamentarian directly",
    correctAnswer: 'C' as const,
    explanation: "The chair makes an initial ruling on a Point of Order. This ruling can be appealed to the assembly for a final decision, but the chair's ruling stands unless overturned by a majority vote."
  },
  {
    question: "Which of the following motions can be renewed after it has been defeated, provided no other motion of the same nature is pending?",
    optionA: "Limit Debate",
    optionB: "Lay on the Table",
    optionC: "Postpone Indefinitely",
    optionD: "Previous Question",
    correctAnswer: 'A' as const,
    explanation: "Motions that do not conflict with a motion previously defeated can be renewed after progress in debate or business. Subsidiary motions like Limit Debate can often be renewed, unlike Lay on the Table."
  },
  {
    question: "\"Fix the Time to Which to Adjourn\" is:",
    optionA: "A main motion",
    optionB: "An incidental motion",
    optionC: "A privileged motion of highest rank",
    optionD: "A subsidiary motion",
    correctAnswer: 'C' as const,
    explanation: "Fix the Time to Which to Adjourn is the highest-ranking privileged motion. It sets up a future meeting before the current one is adjourned and is in order even when other business is pending."
  },
  {
    question: "Which statement is accurate regarding term limits for FBLA national officers?",
    optionA: "No member may serve more than two consecutive terms",
    optionB: "Any partial term served counts as a full term",
    optionC: "A term is void if resignation occurs before the NLC",
    optionD: "Officers may serve one full term regardless of past appointment",
    correctAnswer: 'B' as const,
    explanation: "FBLA bylaws typically state that if an officer serves more than half a term, it is considered a full term for the purpose of term limits."
  },
  {
    question: "If a member \"calls for the orders of the day,\" the chair must:",
    optionA: "Ask for unanimous consent to continue current business",
    optionB: "Take an immediate vote on whether to proceed",
    optionC: "Automatically revert to the scheduled order",
    optionD: "Rule whether the call is appropriate",
    correctAnswer: 'C' as const,
    explanation: "A Call for the Orders of the Day is a demand to follow the adopted agenda or order of business. The chair must immediately comply unless the assembly votes by a two-thirds majority to set the orders aside."
  },
  {
    question: "The chair votes:",
    optionA: "Only when there is a tie",
    optionB: "Always as the last vote cast",
    optionC: "When their vote would affect the outcome",
    optionD: "Only on motions requiring a two-thirds vote",
    correctAnswer: 'C' as const,
    explanation: "The presiding officer usually does not vote to maintain impartiality. They only vote when their vote would change the outcome (e.g., to break a tie or to create a tie to defeat a motion requiring a majority)."
  },
  {
    question: "Which of the following is not a debatable privileged motion?",
    optionA: "Fix the Time to Which to Adjourn",
    optionB: "Raise a Question of Privilege",
    optionC: "Recess",
    optionD: "Call for the Orders of the Day",
    correctAnswer: 'D' as const,
    explanation: "Call for the Orders of the Day is not debatable; it is a demand to follow the schedule. The other privileged motions (Fix the Time..., Question of Privilege, Recess) can be debatable under certain circumstances."
  },
  {
    question: "The motion to \"Postpone Indefinitely\" is primarily used to:",
    optionA: "Delay a vote until a later meeting",
    optionB: "End consideration of a question without a direct vote",
    optionC: "Suspend the main motion for further amendment",
    optionD: "Move discussion into executive session",
    correctAnswer: 'B' as const,
    explanation: "Postpone Indefinitely is used to test the assembly's support for a main motion without taking a direct vote on it. If it passes, the main motion is dismissed for the session."
  },
  {
    question: "National officer candidates are required to submit their applications by:",
    optionA: "February 1",
    optionB: "March 15",
    optionC: "April 1",
    optionD: "May 15",
    correctAnswer: 'B' as const,
    explanation: "According to FBLA guidelines, the deadline for national officer candidate applications is typically March 15."
  },
  {
    question: "When a committee is discharged, this means:",
    optionA: "The members are removed from office",
    optionB: "Its duties are suspended temporarily",
    optionC: "Its responsibilities are concluded or reassigned",
    optionD: "Its membership must be reaffirmed",
    correctAnswer: 'C' as const,
    explanation: "To discharge a committee means to end its assignment and take the matter back into the hands of the assembly, concluding the committee's work on that task."
  },
  {
    question: "Which of the following is not true about subsidiary motions?",
    optionA: "They are always applied to main motions",
    optionB: "They can have higher precedence than main motions",
    optionC: "They are always debatable",
    optionD: "They modify or dispose of a pending motion",
    correctAnswer: 'C' as const,
    explanation: "Subsidiary motions are not always debatable. For example, the motion for the Previous Question (to close debate) is itself not debatable."
  },
  {
    question: "An appeal is:",
    optionA: "Decided by the presiding officer",
    optionB: "Debatable in all cases",
    optionC: "Not in order when another appeal is pending",
    optionD: "Only allowed if the ruling was made by majority vote",
    correctAnswer: 'C' as const,
    explanation: "Only one appeal may be pending at a time. An appeal is debatable only if the motion it relates to was debatable, and it is decided by the assembly, not the chair."
  },
  {
    question: "In FBLA, the duties of the parliamentarian include:",
    optionA: "Voting only in the case of a tie",
    optionB: "Presiding at all meetings",
    optionC: "Advising on the constitutionality of motions",
    optionD: "Serving as national board chair",
    correctAnswer: 'C' as const,
    explanation: "The parliamentarian is a consultant to the chair on procedural matters, advising on rules and the proper interpretation of the bylaws and parliamentary authority."
  },
  {
    question: "If a motion requires a two-thirds vote and only a voice vote is taken, any member may:",
    optionA: "Demand a roll call",
    optionB: "Request a division",
    optionC: "Move to table the motion",
    optionD: "Suspend the voting requirements",
    correctAnswer: 'B' as const,
    explanation: "A Division of the Assembly is a demand for a more precise vote (e.g., a rising vote) when the result of a voice vote is unclear or doubted. This is crucial for motions requiring a two-thirds vote."
  },
  {
    question: "A \"Division of a Question\" differs from \"Division of the Assembly\" in that it:",
    optionA: "Requires a majority vote",
    optionB: "Requires the presiding officer's ruling",
    optionC: "Applies to visual vote discrepancies",
    optionD: "Separates a motion into parts for consideration",
    correctAnswer: 'D' as const,
    explanation: "Division of a Question is used to split a motion with multiple independent parts into separate motions for individual voting. Division of the Assembly is used to verify a vote count."
  },
  {
    question: "Which of the following is true regarding the FBLA Board of Directors?",
    optionA: "It consists solely of national officers",
    optionB: "It is appointed annually by the president",
    optionC: "It has the authority to amend the FBLA bylaws",
    optionD: "It oversees all state-level officer elections",
    correctAnswer: 'C' as const,
    explanation: "The FBLA Board of Directors holds the ultimate authority for the organization, which includes the power to amend the national bylaws, typically with a final vote by the delegate assembly at the NLC."
  },
  {
    question: "If a motion is \"laid on the table,\" what must occur for it to be taken up again?",
    optionA: "A majority vote to reconsider",
    optionB: "A motion to resume debate at any time",
    optionC: "A majority vote to take from the table within the same session or next",
    optionD: "A unanimous vote of those present",
    correctAnswer: 'C' as const,
    explanation: "The motion to Take from the Table is used to resume consideration of a tabled motion. It requires a second and a majority vote and is only in order during the same session or the next regular session."
  },
  {
    question: "In the standard order of precedence, which motion outranks \"Amend\"?",
    optionA: "Commit or Refer",
    optionB: "Main Motion",
    optionC: "Reconsider",
    optionD: "Postpone Indefinitely",
    correctAnswer: 'A' as const,
    explanation: "In the standard order of precedence, subsidiary motions rank as follows (highest to lowest): Lay on the Table, Previous Question, Limit/Extend Debate, Postpone to a Certain Time, Commit or Refer, Amend, Postpone Indefinitely."
  },
  {
    question: "If a Point of Order is ruled \"not well taken,\" the member may:",
    optionA: "Move to Lay on the Table",
    optionB: "Demand a Roll Call",
    optionC: "Appeal the ruling of the chair",
    optionD: "Call the previous question",
    correctAnswer: 'C' as const,
    explanation: "If a member disagrees with the chair's ruling on a Point of Order, they can immediately \"appeal from the decision of the chair,\" which puts the final decision to a majority vote of the assembly."
  },
  {
    question: "Which of the following statements is true regarding the selection of FBLA national officers?",
    optionA: "Only current state officers are eligible",
    optionB: "Each candidate must be endorsed by two states",
    optionC: "Candidates must be approved by the Board of Directors prior to nomination",
    optionD: "The officer screening committee has sole discretion on ballot eligibility",
    correctAnswer: 'C' as const,
    explanation: "The FBLA bylaws require that the Board of Directors approves the final slate of national officer candidates before they are officially nominated."
  },
  {
    question: "Which motion can interrupt a speaker and does not require a second?",
    optionA: "Reconsider",
    optionB: "Lay on the Table",
    optionC: "Raise a Question of Privilege",
    optionD: "Point of Order",
    correctAnswer: 'D' as const,
    explanation: "A Point of Order is an incidental motion that can interrupt a speaker because it deals with a breach of the rules. It does not require a second."
  },
  {
    question: "The motion \"Reconsider and Enter on the Minutes\" is used when:",
    optionA: "A motion cannot be debated immediately due to absence of quorum",
    optionB: "A vote is reconsidered at the next regular meeting",
    optionC: "A member wants to reserve the right to reconsider at a later time",
    optionD: "A reconsideration vote is pending and must be recorded in writing",
    correctAnswer: 'C' as const,
    explanation: "This special form of the motion to Reconsider is made to prevent a temporary majority from taking action and then adjourning before the minority can muster votes to reconsider. It delays the actual reconsideration vote until the next meeting."
  },
  {
    question: "The effect of adopting a motion to \"Postpone Indefinitely\" is to:",
    optionA: "Consider the motion at a later time",
    optionB: "Commit the motion to a committee",
    optionC: "Suppress the main motion for the duration of the session",
    optionD: "Suspend the rules related to the motion",
    correctAnswer: 'C' as const,
    explanation: "Adopting Postpone Indefinitely kills the main motion for the entire session. It cannot be brought up again during that same meeting."
  },
  {
    question: "Which of the following is true of the motion \"Appeal\"?",
    optionA: "It is not debatable under any circumstances",
    optionB: "It can only be made when a motion is on the floor",
    optionC: "It allows the assembly to override the chair's decision",
    optionD: "It is in order even after another motion has been stated",
    correctAnswer: 'C' as const,
    explanation: "An Appeal from the decision of the chair allows the assembly to vote on whether to uphold or overturn a ruling made by the presiding officer."
  },
  {
    question: "Which of the following is a requirement for all FBLA national officer candidates, regardless of office?",
    optionA: "Two letters of recommendation from educators",
    optionB: "Demonstration of knowledge in finance and economics",
    optionC: "One full year of FBLA national membership",
    optionD: "Endorsement by the candidate's state chapter",
    correctAnswer: 'D' as const,
    explanation: "A universal requirement for all national officer candidates is the official endorsement from their respective state chapter."
  },
  {
    question: "Which motion requires a two-thirds vote without notice?",
    optionA: "To adjourn sine die",
    optionB: "To limit or extend limits of debate",
    optionC: "To postpone indefinitely",
    optionD: "To suspend standing rules",
    correctAnswer: 'B' as const,
    explanation: "Motions that restrict the rights of the assembly, such as limiting debate (Previous Question or Limit Debate), require a two-thirds vote because they take away the right of free and full discussion."
  },
  {
    question: "\"Lay on the Table\" is often misused to:",
    optionA: "Amend a motion in a complex manner",
    optionB: "Kill a motion without voting",
    optionC: "Refer a motion to a committee",
    optionD: "Initiate informal discussion",
    correctAnswer: 'B' as const,
    explanation: "Lay on the Table is meant to temporarily set aside a motion to deal with more urgent business. It is often misused as a way to kill a motion because if it is not taken from the table, it effectively dies."
  },
  {
    question: "The motion \"Fix the Time to Which to Adjourn\" is classified as:",
    optionA: "A special main motion",
    optionB: "A privileged motion of the highest rank",
    optionC: "An incidental main motion",
    optionD: "A motion requiring previous notice",
    correctAnswer: 'B' as const,
    explanation: "This motion is the highest-ranking privileged motion. It is in order even when other business is pending because it relates to the continuation of the assembly itself."
  },
  {
    question: "If no candidate for national FBLA office receives a majority vote:",
    optionA: "The candidate with the most votes is elected",
    optionB: "A revote is held with all candidates",
    optionC: "A runoff election is conducted between the top two candidates",
    optionD: "The office remains vacant until the next NLC",
    correctAnswer: 'C' as const,
    explanation: "Standard election procedure requires a majority vote. If no candidate achieves this, a runoff is held between the two candidates who received the highest number of votes."
  },
  {
    question: "Which of the following is not true of incidental motions?",
    optionA: "They arise out of pending business",
    optionB: "They are always debatable",
    optionC: "They must be decided immediately",
    optionD: "They deal with questions of procedure",
    correctAnswer: 'B' as const,
    explanation: "Incidental motions are not always debatable. For example, a Point of Order or an Appeal (in some cases) is not debatable."
  },
  {
    question: "A majority vote is:",
    optionA: "More than half of those eligible to vote",
    optionB: "More than half of those voting",
    optionC: "Half of the quorum present",
    optionD: "A plurality of those present",
    correctAnswer: 'B' as const,
    explanation: "A majority vote is defined as more than half of the votes cast by members present and voting. It is not based on the entire membership or those eligible."
  },
  {
    question: "Debate on a main motion is closed when:",
    optionA: "The maker of the motion yields",
    optionB: "The Previous Question is adopted",
    optionC: "The chair decides the motion has been discussed sufficiently",
    optionD: "The motion is tabled",
    correctAnswer: 'B' as const,
    explanation: "The formal way to close debate is to adopt the motion for the Previous Question, which requires a two-thirds vote. The chair cannot unilaterally close debate."
  },
  {
    question: "The number of taps of the gavel to signal the end of a meeting is:",
    optionA: "One",
    optionB: "Two",
    optionC: "Three",
    optionD: "It varies by organization's rules",
    correctAnswer: 'A' as const,
    explanation: "A single, sharp tap of the gavel is used to announce the adjournment of a meeting."
  },
  {
    question: "A motion that seeks to temporarily set aside a matter without assigning a specific time to resume it is:",
    optionA: "Refer to a Committee",
    optionB: "Postpone Definitely",
    optionC: "Postpone Indefinitely",
    optionD: "Lay on the Table",
    correctAnswer: 'D' as const,
    explanation: "Lay on the Table is used to set aside a motion temporarily to deal with more urgent business. It does not specify when the motion will be resumed."
  },
  {
    question: "According to the bylaws, what is the minimum number of local chapters required to form a state chapter?",
    optionA: "3",
    optionB: "4",
    optionC: "5",
    optionD: "6",
    correctAnswer: 'C' as const,
    explanation: "The FBLA National Bylaws require a minimum of five active local chapters to form a state chapter."
  },
  {
    question: "A motion to reconsider is in order only when:",
    optionA: "A new member joins the assembly",
    optionB: "Debate on the original motion was limited",
    optionC: "It is made by someone who voted on the prevailing side",
    optionD: "The chair has approved its necessity",
    correctAnswer: 'C' as const,
    explanation: "A fundamental rule for the motion to Reconsider is that it must be made by a member who voted on the winning side of the original vote."
  },
  {
    question: "A two-thirds vote is required to:",
    optionA: "Refer to a Committee",
    optionB: "Postpone Indefinitely",
    optionC: "Amend a Motion",
    optionD: "Close debate",
    correctAnswer: 'D' as const,
    explanation: "Closing debate (the Previous Question) requires a two-thirds vote because it takes away the rights of the minority to discuss the motion."
  },
  {
    question: "Who has the authority to fill a vacancy in a national FBLA office?",
    optionA: "National Executive Council",
    optionB: "State Leadership Council",
    optionC: "FBLA Board of Directors",
    optionD: "FBLA President and CEO",
    correctAnswer: 'C' as const,
    explanation: "The authority to fill a vacancy in a national office rests with the FBLA Board of Directors."
  },
  {
    question: "If a motion is adopted \"by unanimous consent,\" it means:",
    optionA: "All members vote in favor by roll call",
    optionB: "The chair declares it adopted without objection",
    optionC: "The motion passed after extended debate",
    optionD: "The motion was required by the bylaws",
    correctAnswer: 'B' as const,
    explanation: "Unanimous consent (or general consent) is a procedure where the chair assumes a motion will pass without a formal vote if no member objects."
  },
  {
    question: "If a member rises and says, \"Division,\" what happens next?",
    optionA: "The assembly votes by secret ballot",
    optionB: "The chair must retake the vote by standing or show of hands",
    optionC: "The member must explain their objection",
    optionD: "The motion is automatically postponed",
    correctAnswer: 'B' as const,
    explanation: "A Division of the Assembly is a demand for a rising vote (or a show of hands) to verify an inconclusive voice vote. The chair must comply immediately."
  },
  {
    question: "Which of the following motions can interrupt another speaker without being out of order?",
    optionA: "Move to Commit",
    optionB: "Move to Recess",
    optionC: "Raise a Point of Order",
    optionD: "Postpone to a Certain Time",
    correctAnswer: 'C' as const,
    explanation: "A Point of Order, which deals with a breach of the rules, is one of the few motions that can interrupt a speaker. The others must wait until the speaker has finished."
  },
  {
    question: "Which motion cannot be amended?",
    optionA: "Postpone to a Certain Time",
    optionB: "Recess",
    optionC: "Commit or Refer",
    optionD: "Main Motion",
    correctAnswer: 'B' as const,
    explanation: "The privileged motion to Recess cannot be amended. The length of the recess must be included in the motion itself when it is proposed."
  },
  {
    question: "The minimum essential officers for conducting a meeting are:",
    optionA: "President and Parliamentarian",
    optionB: "President and Treasurer",
    optionC: "Presiding Officer and Secretary",
    optionD: "Secretary and Sergeant-at-Arms",
    correctAnswer: 'C' as const,
    explanation: "The bare minimum required to conduct a business meeting is a Presiding Officer to maintain order and a Secretary to keep the official record (minutes)."
  },
  {
    question: "The term of office for national FBLA officers begins:",
    optionA: "Immediately after election",
    optionB: "At the conclusion of the NLC",
    optionC: "When approved by the Board of Directors",
    optionD: "After orientation and confirmation",
    correctAnswer: 'B' as const,
    explanation: "The term of office for newly elected national FBLA officers officially begins at the conclusion of the National Leadership Conference (NLC) at which they are elected."
  },
  {
    question: "Which of the following best describes a quorum?",
    optionA: "All members of the organization",
    optionB: "Majority of all active members",
    optionC: "Minimum number of members required to transact business",
    optionD: "Two-thirds of all voting members",
    correctAnswer: 'C' as const,
    explanation: "A quorum is the minimum number of members that must be present to legally conduct business, as defined in the organization's bylaws."
  },
  {
    question: "A motion that brings a question back before the assembly as if it had not been previously decided is:",
    optionA: "Amend",
    optionB: "Rescind",
    optionC: "Reconsider",
    optionD: "Postpone Indefinitely",
    correctAnswer: 'B' as const,
    explanation: "The motion to Rescind (or Repeal) voids a motion that was previously adopted. It brings the question back as if it had never been passed. Reconsider deals with a vote just taken."
  },
  {
    question: "When the Previous Question is ordered on a series of pending motions, which is voted on first?",
    optionA: "The most recently made motion",
    optionB: "The main motion",
    optionC: "The motion to recess",
    optionD: "The motion of lowest precedence",
    correctAnswer: 'A' as const,
    explanation: "When the Previous Question is ordered on multiple motions, voting proceeds immediately, starting with the last motion that was made (the one immediately pending)."
  },
  {
    question: "When is the chair allowed to debate a motion?",
    optionA: "Always, but only after recognition",
    optionB: "Only when presiding over a committee",
    optionC: "Never, unless they relinquish the chair",
    optionD: "Only if the motion concerns the chair directly",
    correctAnswer: 'C' as const,
    explanation: "To maintain impartiality, the presiding officer does not participate in debate while in the chair. If they wish to debate, they must temporarily step down and have another officer preside."
  },
  {
    question: "FBLA's fiscal year begins on:",
    optionA: "July 1",
    optionB: "January 1",
    optionC: "September 1",
    optionD: "August 15",
    correctAnswer: 'A' as const,
    explanation: "The FBLA fiscal year runs from July 1 to June 30."
  },
  {
    question: "A motion to Suspend the Rules:",
    optionA: "May be debated fully",
    optionB: "Is always out of order when another motion is pending",
    optionC: "Can only be applied to standing rules",
    optionD: "Requires a two-thirds vote",
    correctAnswer: 'D' as const,
    explanation: "Suspending the rules requires a two-thirds vote because it overrides the established procedures of the assembly. It is not debatable."
  },
  {
    question: "An incidental motion takes precedence over:",
    optionA: "Privileged motions",
    optionB: "Main motions only",
    optionC: "All motions it arises from",
    optionD: "Amendments",
    correctAnswer: 'C' as const,
    explanation: "Incidental motions (like Point of Order, Appeal) take precedence over the motion out of which they arise and must be decided immediately."
  },
  {
    question: "A \"Division of the Assembly\" is typically used when:",
    optionA: "Members want the vote taken by ballot",
    optionB: "There is uncertainty or disagreement about a voice vote result",
    optionC: "The chair wants a visual count",
    optionD: "A tie vote has occurred",
    correctAnswer: 'B' as const,
    explanation: "A Division is a call for a verification of a voice vote by having members stand for a count. It is used when the outcome is unclear or doubted."
  },
  {
    question: "What is the purpose of a \"Standing Committee\"?",
    optionA: "To handle temporary tasks",
    optionB: "To conduct elections",
    optionC: "To perform ongoing functions for the organization",
    optionD: "To supervise parliamentary law",
    correctAnswer: 'C' as const,
    explanation: "Standing committees are permanent committees that handle continuous areas of responsibility (e.g., membership, finance) as defined in the bylaws or rules."
  },
  {
    question: "What type of motion is \"Amend Something Previously Adopted\"?",
    optionA: "Privileged",
    optionB: "Incidental",
    optionC: "Subsidiary",
    optionD: "Bring Back",
    correctAnswer: 'D' as const,
    explanation: "Amend Something Previously Adopted is a main motion that brings a previously decided question back for review and change. It is a type of \"bring back\" motion."
  },
  {
    question: "Which of the following is in the correct order of precedence (highest to lowest)?",
    optionA: "Amend, Recess, Postpone Indefinitely",
    optionB: "Adjourn, Previous Question, Amend",
    optionC: "Reconsider, Commit, Raise a Question of Privilege",
    optionD: "Lay on the Table, Commit, Postpone to a Certain Time",
    correctAnswer: 'D' as const,
    explanation: "This is the correct order: Lay on the Table (highest subsidiary), then Commit or Refer, then Postpone to a Certain Time."
  },
  {
    question: "What does it mean if a motion is said to be \"pending\"?",
    optionA: "It was referred to a committee",
    optionB: "It is being researched",
    optionC: "It is under consideration by the assembly",
    optionD: "It has already been voted on",
    correctAnswer: 'C' as const,
    explanation: "A \"pending\" motion is one that has been stated by the chair and is currently before the assembly for debate, amendment, or vote."
  },
  {
    question: "The primary purpose of a \"second\" to a motion is to:",
    optionA: "Begin debate immediately",
    optionB: "Indicate support for the idea",
    optionC: "Open the floor for amendments",
    optionD: "Prevent the chair from ruling it out of order",
    correctAnswer: 'B' as const,
    explanation: "A second indicates that at least one other member, besides the mover, thinks the motion should come before the assembly. It does not mean the seconder supports the motion, only that they support discussing it."
  },
  {
    question: "The maximum number of amendments that can be pending to a single motion at one time is:",
    optionA: "Two",
    optionB: "Three",
    optionC: "Four",
    optionD: "Unlimited",
    correctAnswer: 'A' as const,
    explanation: "Only two amendments can be pending at a time: a primary amendment (to the main motion) and a secondary amendment (to the primary amendment)."
  },
  {
    question: "Which of the following motions is used to change a previously adopted agenda during a meeting?",
    optionA: "Amend Something Previously Adopted",
    optionB: "Suspend the Rules",
    optionC: "Lay on the Table",
    optionD: "Postpone to a Certain Time",
    correctAnswer: 'B' as const,
    explanation: "An agenda is a type of standing rule. To deviate from it during a meeting, the assembly must Suspend the Rules, which requires a two-thirds vote."
  },
  {
    question: "What is the process by which amendments to the national bylaws are considered?",
    optionA: "Majority vote by national officers",
    optionB: "Ratified by the Board of Directors only",
    optionC: "Adoption by a two-thirds vote at NLC",
    optionD: "Approval by all state chapters",
    correctAnswer: 'C' as const,
    explanation: "Amendments to the FBLA National Bylaws are typically proposed and then adopted by a two-thirds vote of the voting delegates at the National Leadership Conference (NLC)."
  },
  {
    question: "What is the difference between \"Postpone Indefinitely\" and \"Lay on the Table\"?",
    optionA: "Lay on the Table is debatable; Postpone Indefinitely is not",
    optionB: "Postpone Indefinitely kills the motion; Lay on the Table sets it aside temporarily",
    optionC: "Both are methods to delay, but only Lay on the Table ends debate",
    optionD: "Postpone Indefinitely sets a date; Lay on the Table cancels the motion",
    correctAnswer: 'B' as const,
    explanation: "This is the key distinction. Postpone Indefinitely disposes of the motion for the session, while Lay on the Table is for temporary, short-term delay."
  },
  {
    question: "If a member is ruled out of order and disagrees, what can they do?",
    optionA: "Move to Postpone",
    optionB: "Rise to a Question of Privilege",
    optionC: "Appeal from the decision of the chair",
    optionD: "Request a Division",
    correctAnswer: 'C' as const,
    explanation: "The proper recourse when a member disagrees with a ruling from the chair is to make an Appeal, which allows the assembly to make the final decision by majority vote."
  },
  {
    question: "The motion \"Object to the Consideration of the Question\" must be made:",
    optionA: "Before any debate has occurred",
    optionB: "After an amendment is adopted",
    optionC: "At any time during discussion",
    optionD: "During committee of the whole",
    correctAnswer: 'A' as const,
    explanation: "This motion must be made immediately after the main motion is stated by the chair and before any debate or subsidiary motion has been made."
  },
  {
    question: "The motion \"Withdraw a Motion\" is:",
    optionA: "Always undebatable and requires a second",
    optionB: "Debatable only when made after the motion is stated",
    optionC: "Allowed only before debate has begun",
    optionD: "Allowed by unanimous consent if not yet seconded",
    correctAnswer: 'D' as const,
    explanation: "If a motion has not been stated by the chair, the maker can withdraw it without any formal process. After it is stated, withdrawal requires permission of the assembly, usually granted by unanimous consent."
  },
  {
    question: "The national parliamentarian is selected by:",
    optionA: "General election of members",
    optionB: "The Board of Directors",
    optionC: "Appointment by the president with approval of the officer screening committee",
    optionD: "The national officers' majority vote",
    correctAnswer: 'B' as const,
    explanation: "The FBLA Board of Directors is responsible for appointing the national parliamentarian."
  },
  {
    question: "Which motion allows members to request information directly related to business at hand?",
    optionA: "Point of Order",
    optionB: "Parliamentary Inquiry",
    optionC: "Division",
    optionD: "Question of Privilege",
    correctAnswer: 'B' as const,
    explanation: "A Parliamentary Inquiry is a request for the chair's opinion or information on a matter of parliamentary procedure as it relates to the current business."
  },
  {
    question: "A \"friendly amendment\":",
    optionA: "Is adopted without a vote",
    optionB: "Must still be formally moved, seconded, and voted upon",
    optionC: "Automatically passes if agreed to by the maker of the motion",
    optionD: "Can only be made by the presiding officer",
    correctAnswer: 'B' as const,
    explanation: "There is no such thing as an informal \"friendly amendment\" in parliamentary procedure. Any change to a motion must follow the formal process of moving, seconding, and adopting an amendment."
  },
  {
    question: "If a quorum is lost during a meeting:",
    optionA: "All decisions made before remain valid",
    optionB: "Voting on motions already in debate may continue",
    optionC: "New motions may still be made",
    optionD: "Debate continues but no votes may be taken",
    correctAnswer: 'A' as const,
    explanation: "Business transacted while a quorum was present remains valid. However, once a quorum is lost, no new business can be transacted, and no votes can be taken."
  },
  {
    question: "The only motion that can be made while the Previous Question is pending is:",
    optionA: "Adjourn",
    optionB: "Amend",
    optionC: "Reconsider",
    optionD: "Recess",
    correctAnswer: 'D' as const,
    explanation: "The motion for a Recess is a privileged motion and has a higher precedence than the subsidiary motion for the Previous Question, so it is in order while the Previous Question is pending."
  },
  {
    question: "Which of the following is always out of order?",
    optionA: "Lay on the Table",
    optionB: "Call for the Orders of the Day",
    optionC: "Reconsider",
    optionD: "Main Motion when another has the floor",
    correctAnswer: 'D' as const,
    explanation: "It is always out of order to introduce a new main motion when another member has been assigned the floor (is speaking)."
  },
  {
    question: "Which motion is used when the assembly wishes to meet again to continue the business of the current meeting?",
    optionA: "Postpone Definitely",
    optionB: "Fix the Time to Which to Adjourn",
    optionC: "Recess",
    optionD: "Adjourn Sine Die",
    correctAnswer: 'B' as const,
    explanation: "This motion sets up an adjourned meeting—a continuation of the current meeting at a later time. It is different from scheduling a new, regular meeting."
  },
  {
    question: "Which of the following motions is never debatable?",
    optionA: "Commit",
    optionB: "Amend",
    optionC: "Reconsider",
    optionD: "Previous Question",
    correctAnswer: 'D' as const,
    explanation: "The motion for the Previous Question (\"to close debate and vote immediately\") is itself not debatable."
  },
  {
    question: "\"Orders of the Day\" can be set aside by:",
    optionA: "Majority vote",
    optionB: "Two-thirds vote",
    optionC: "Chair's discretion",
    optionD: "Motion to Lay on the Table",
    correctAnswer: 'B' as const,
    explanation: "Setting aside the Orders of the Day (the agenda) requires suspending the rules, which needs a two-thirds vote."
  },
  {
    question: "Which is a main motion that brings a question back before the assembly?",
    optionA: "Amend",
    optionB: "Reconsider",
    optionC: "Take from the Table",
    optionD: "Appeal",
    correctAnswer: 'C' as const,
    explanation: "Take from the Table is a main motion that resumes consideration of a motion that was previously laid on the table."
  },
  {
    question: "Which of these is an example of a question of privilege?",
    optionA: "\"Can we suspend the rules?\"",
    optionB: "\"Can we take a five-minute break?\"",
    optionC: "\"I can't hear the speaker.\"",
    optionD: "\"I object to consideration of the motion.\"",
    correctAnswer: 'C' as const,
    explanation: "A Question of Privilege is a request dealing with the comfort, safety, or rights of the assembly or its members. An inability to hear is a classic example."
  },
  {
    question: "The motion to \"Divide the Question\" is used when:",
    optionA: "There is a tie",
    optionB: "A member disagrees with part of a motion",
    optionC: "The motion contains unrelated parts that should be voted on separately",
    optionD: "The chair refuses to recognize a motion",
    correctAnswer: 'C' as const,
    explanation: "Division of a Question is used to split a motion with multiple independent proposals into individual motions for separate voting."
  },
  {
    question: "Which of the following cannot interrupt a speaker?",
    optionA: "Point of Order",
    optionB: "Parliamentary Inquiry",
    optionC: "Main Motion",
    optionD: "Division",
    correctAnswer: 'C' as const,
    explanation: "A main motion is the lowest-ranking motion and must wait until the current speaker has finished and the floor is free."
  },
  {
    question: "How many regions is FBLA divided into at the national level?",
    optionA: "Four",
    optionB: "Five",
    optionC: "Six",
    optionD: "Seven",
    correctAnswer: 'B' as const,
    explanation: "FBLA is divided into five national regions: Western, Mountain Plains, Central, Southern, and Eastern."
  },
  {
    question: "What type of vote is required to adopt the motion \"Limit Debate\"?",
    optionA: "Majority",
    optionB: "Plurality",
    optionC: "Two-thirds",
    optionD: "Three-fourths",
    correctAnswer: 'C' as const,
    explanation: "Because it restricts the rights of members to speak, the motion to Limit Debate requires a two-thirds vote."
  },
  {
    question: "When a main motion is being debated, which motion is out of order?",
    optionA: "Commit",
    optionB: "Recess",
    optionC: "Adjourn",
    optionD: "Take from the Table",
    correctAnswer: 'D' as const,
    explanation: "Take from the Table is used to resume a tabled motion. It is not in order when another main motion is already on the floor and being debated."
  },
  {
    question: "\"Amend Something Previously Adopted\" requires:",
    optionA: "Majority vote with notice",
    optionB: "Two-thirds vote or majority with notice",
    optionC: "Majority of those present",
    optionD: "Vote of all national officers",
    correctAnswer: 'B' as const,
    explanation: "To change a decision already made, the vote required is either a two-thirds vote, a majority of the entire membership, or a majority vote with previous notice given at a prior meeting."
  },
  {
    question: "Which of the following motions is not allowed when a motion to Reconsider is pending?",
    optionA: "Postpone Definitely",
    optionB: "Amend",
    optionC: "Lay on the Table",
    optionD: "Second Reconsider",
    correctAnswer: 'D' as const,
    explanation: "You cannot move to Reconsider a vote on the motion to Reconsider itself. Only one motion to Reconsider can be pending on the same question."
  },
  {
    question: "Who decides questions of order when there is no existing precedent?",
    optionA: "Majority of the assembly",
    optionB: "The Parliamentarian",
    optionC: "The Chair",
    optionD: "The Secretary",
    correctAnswer: 'C' as const,
    explanation: "The presiding officer is responsible for making initial rulings on all questions of order. The parliamentarian only advises; the chair decides."
  },
  {
    question: "The term \"floor\" refers to:",
    optionA: "Physical space in the assembly hall",
    optionB: "The speaker's podium",
    optionC: "The right to speak or present business",
    optionD: "The stage reserved for officers",
    correctAnswer: 'C' as const,
    explanation: "Having the \"floor\" means a member has been recognized by the chair and has the exclusive right to speak."
  },
  {
    question: "A motion is considered out of order when:",
    optionA: "It conflicts with bylaws",
    optionB: "It has not been seconded",
    optionC: "Debate has already started",
    optionD: "The maker is not a voting member",
    correctAnswer: 'A' as const,
    explanation: "A motion that conflicts with the organization's bylaws or constitution is always out of order. The other options may be procedural issues but do not automatically make a motion out of order."
  },
  {
    question: "Which motion is in order when the motion to Adjourn is pending?",
    optionA: "Postpone Indefinitely",
    optionB: "Suspend the Rules",
    optionC: "Fix the Time to Which to Adjourn",
    optionD: "Commit",
    correctAnswer: 'C' as const,
    explanation: "Fix the Time to Which to Adjourn is a privileged motion with higher precedence than Adjourn, so it is in order even when Adjourn is pending."
  },
  {
    question: "A member may demand a roll call vote if:",
    optionA: "The bylaws require it",
    optionB: "The presiding officer allows it",
    optionC: "Any single member requests it",
    optionD: "The group adopts it by motion",
    correctAnswer: 'A' as const,
    explanation: "A roll call vote is not a right of a single member unless the organization's bylaws or rules specifically grant that right. It is usually ordered by a majority vote of the assembly."
  },
  {
    question: "Which of the following motions is used when a member believes the rules of the organization are being violated?",
    optionA: "Parliamentary Inquiry",
    optionB: "Division",
    optionC: "Point of Order",
    optionD: "Previous Question",
    correctAnswer: 'C' as const,
    explanation: "A Point of Order is the proper motion to call attention to a violation of the rules."
  },
  {
    question: "Which of the following actions results in final disposal of the main motion?",
    optionA: "Refer to a Committee",
    optionB: "Postpone to a Certain Time",
    optionC: "Lay on the Table",
    optionD: "Postpone Indefinitely",
    correctAnswer: 'D' as const,
    explanation: "Of these options, only Postpone Indefinitely finally disposes of the main motion for the session. The others are temporary dispositions."
  },
  {
    question: "FBLA's national president must be elected from among candidates representing:",
    optionA: "Any region",
    optionB: "Western or Southern regions",
    optionC: "The Eastern region only",
    optionD: "Each state must rotate annually",
    correctAnswer: 'A' as const,
    explanation: "The FBLA national president can be elected from any of the five national regions; there is no regional restriction for this office."
  },
  {
    question: "The chair's declaration of \"the ayes have it\" can be challenged by:",
    optionA: "Motion to Suspend the Rules",
    optionB: "Point of Order",
    optionC: "Division",
    optionD: "Reconsider",
    correctAnswer: 'C' as const,
    explanation: "A Division of the Assembly is the specific motion used to challenge the chair's announcement of the result of a voice vote."
  }
];

  for (let i = 0; i < parliamentaryQuestions.length; i++) {
    const q = parliamentaryQuestions[i];
    await addQuestion(
      parliamentaryEvent.id,
      q.question,
      q.optionA,
      q.optionB,
      q.optionC,
      q.optionD,
      q.correctAnswer,
      'Beginner',
      1,
      q.explanation
    );
  }
  
  console.log(`✅ Successfully added ${parliamentaryQuestions.length} questions to Introduction to Parliamentary Procedure`);
}

// Seed Parliamentary Procedure Extension Questions (101-200)
export async function seedParliamentaryProcedureExtensionQuestions() {
  console.log("🏛️ Seeding Introduction to Parliamentary Procedure extension questions (101-200)...");
  
  const getEventByName = async (name: string) => {
    const result = await db.select().from(events).where(eq(events.name, name));
    return result[0] || null;
  };

  const parliamentaryEvent = await getEventByName("Introduction to Parliamentary Procedure");
  if (!parliamentaryEvent) {
    console.error("❌ Introduction to Parliamentary Procedure event not found");
    return;
  }

  const extensionQuestions = [
    {
      question: "A motion to \"Lay on the Table\" is often misused. According to Robert's Rules, its legitimate purpose is to:",
      optionA: "Kill a motion without debate",
      optionB: "Delay action until the next regular meeting",
      optionC: "Temporarily set aside business for more urgent matters",
      optionD: "Refer the motion to a committee",
      correctAnswer: 'C' as const,
      explanation: "The correct use of \"Lay on the Table\" is to temporarily set aside a pending motion to deal with an immediate, more urgent piece of business, with the intent to \"Take from the Table\" and resume consideration later in the same session."
    },
    {
      question: "Which officer is responsible for compiling and distributing the FBLA National Leadership Conference minutes?",
      optionA: "Executive Director",
      optionB: "National Secretary",
      optionC: "Parliamentarian",
      optionD: "Association President",
      correctAnswer: 'B' as const,
      explanation: "The duty of recording, compiling, and distributing the minutes of national meetings, including the NLC, falls to the National Secretary."
    },
    {
      question: "If a member rises to a point of order, when must the presiding officer respond?",
      optionA: "Immediately, unless another member is speaking",
      optionB: "After the current speaker finishes",
      optionC: "At the end of debate",
      optionD: "Only if a vote is being taken",
      correctAnswer: 'A' as const,
      explanation: "A Point of Order deals with a breach of the rules and is therefore a privileged interruption. The chair must rule on it immediately when it is raised, unless another member is speaking, in which case the point is addressed as soon as the speaker finishes."
    },
    {
      question: "A motion to Reconsider can only be made by:",
      optionA: "The secretary",
      optionB: "A member who voted on the losing side",
      optionC: "A member who voted on the prevailing side",
      optionD: "The chairperson",
      correctAnswer: 'C' as const,
      explanation: "A fundamental rule for the motion to Reconsider is that it must be made by a member who voted on the winning side of the original vote."
    },
    {
      question: "Which body approves amendments to the FBLA National Bylaws after national delegates pass them?",
      optionA: "The U.S. Department of Education",
      optionB: "The FBLA Board of Directors",
      optionC: "The Executive Council",
      optionD: "No further approval is required",
      correctAnswer: 'D' as const,
      explanation: "Once the voting delegates at the National Leadership Conference (NLC) adopt a bylaws amendment by the required two-thirds vote, the process is complete, and no further approval is needed."
    },
    {
      question: "If debate has been closed by ordering the Previous Question, what follows?",
      optionA: "Motion is withdrawn",
      optionB: "Debate continues under extended rules",
      optionC: "Immediate vote on the pending motion(s)",
      optionD: "Chair decides based on member interest",
      correctAnswer: 'C' as const,
      explanation: "The sole purpose of the Previous Question is to close debate immediately and proceed to a vote on the pending motion(s)."
    },
    {
      question: "The motion to \"Amend Something Previously Adopted\" requires what vote?",
      optionA: "Majority",
      optionB: "Two-thirds",
      optionC: "Unanimous consent",
      optionD: "Vote by ballot only",
      correctAnswer: 'B' as const,
      explanation: "Because it reverses a previous decision of the assembly, this motion typically requires a two-thirds vote, a majority of the entire membership, or a majority vote with previous notice."
    },
    {
      question: "Which national officer must have knowledge of parliamentary procedure according to the FBLA bylaws?",
      optionA: "National Vice President",
      optionB: "National President",
      optionC: "National Parliamentarian",
      optionD: "National Secretary",
      correctAnswer: 'C' as const,
      explanation: "The Parliamentarian is the officer specifically designated to be an expert on and advise the organization on matters of parliamentary procedure."
    },
    {
      question: "Which of the following is not debatable?",
      optionA: "Postpone to a Certain Time",
      optionB: "Commit or Refer",
      optionC: "Lay on the Table",
      optionD: "Postpone Indefinitely",
      correctAnswer: 'C' as const,
      explanation: "The motion to Lay on the Table is not debatable because its purpose is to make a quick, temporary disposition of a motion, not to discuss its merits."
    },
    {
      question: "In a deliberative assembly, which of the following best describes a \"quorum\"?",
      optionA: "The minimum number of members required to be elected",
      optionB: "A majority of the officers",
      optionC: "The number of members required to legally transact business",
      optionD: "The total voting members present",
      correctAnswer: 'C' as const,
      explanation: "A quorum is the minimum number of members that must be present to make the proceedings valid, as defined in the organization's bylaws."
    },
    {
      question: "What is the correct way to handle a motion when a member believes the rules are being violated?",
      optionA: "Raise a Parliamentary Inquiry",
      optionB: "Raise a Point of Information",
      optionC: "Raise a Point of Order",
      optionD: "Appeal from the Decision of the Chair",
      correctAnswer: 'C' as const,
      explanation: "A Point of Order is the proper motion to call attention to a violation of the rules or a departure from proper procedure."
    },
    {
      question: "What is the term length of FBLA National Officers according to the bylaws?",
      optionA: "Two years",
      optionB: "Until graduation",
      optionC: "One year",
      optionD: "Until resignation or removal",
      correctAnswer: 'C' as const,
      explanation: "The term of office for FBLA national officers is one year, beginning at the conclusion of the NLC at which they are elected."
    },
    {
      question: "Which type of motion ranks the highest among the following?",
      optionA: "Recess",
      optionB: "Call for the Orders of the Day",
      optionC: "Previous Question",
      optionD: "Postpone to a Certain Time",
      correctAnswer: 'B' as const,
      explanation: "Call for the Orders of the Day is a privileged motion and outranks all subsidiary motions like Previous Question and Postpone to a Certain Time. Recess is also privileged but has a lower rank than Call for the Orders of the Day."
    },
    {
      question: "A member may interrupt a speaker to:",
      optionA: "Offer an amendment",
      optionB: "Raise a question of privilege",
      optionC: "Make a subsidiary motion",
      optionD: "Move to adjourn",
      correctAnswer: 'B' as const,
      explanation: "A Question of Privilege is a request dealing with the comfort, safety, or rights of the assembly and can interrupt a speaker because it may require immediate attention."
    },
    {
      question: "Which of the following is not an official FBLA national officer title?",
      optionA: "Executive Vice President",
      optionB: "Treasurer",
      optionC: "Parliamentarian",
      optionD: "Eastern Region Vice President",
      correctAnswer: 'A' as const,
      explanation: "FBLA national officer titles include President, Secretary, Treasurer, Parliamentarian, and five Regional Vice Presidents. There is no \"Executive Vice President.\""
    },
    {
      question: "Which is a characteristic of incidental motions?",
      optionA: "They can never interrupt business",
      optionB: "They deal with questions of procedure",
      optionC: "They require previous notice",
      optionD: "They only apply to bylaws",
      correctAnswer: 'B' as const,
      explanation: "Incidental motions arise from other questions or motions and deal with procedural issues related to the business at hand (e.g., Point of Order, Appeal, Division of the Assembly)."
    },
    {
      question: "If two members rise simultaneously to speak, who decides who gets the floor?",
      optionA: "The parliamentarian",
      optionB: "The member who made the motion",
      optionC: "The secretary",
      optionD: "The presiding officer",
      correctAnswer: 'D' as const,
      explanation: "The presiding officer (chair) is responsible for recognizing members and assigning the floor. In a tie, they decide who spoke first or who has not yet spoken."
    },
    {
      question: "In a committee meeting, the quorum is:",
      optionA: "A majority of the entire organization",
      optionB: "Defined by the organization's bylaws",
      optionC: "All members present",
      optionD: "A majority of the committee members",
      correctAnswer: 'D' as const,
      explanation: "In the absence of a specific rule, the quorum for a committee is a majority of its members."
    },
    {
      question: "To be eligible to run for a national FBLA office, the candidate must have:",
      optionA: "Attended a state officer training camp",
      optionB: "Previously served as a chapter secretary",
      optionC: "Held or currently hold an elected office at local, state, or national level",
      optionD: "Received a unanimous endorsement by their state chapter",
      correctAnswer: 'C' as const,
      explanation: "A key eligibility requirement for national office is prior leadership experience, specifically having held an elected office at some level within FBLA."
    },
    {
      question: "Which of the following motions may interrupt a speaker?",
      optionA: "Point of Order",
      optionB: "Motion to Amend",
      optionC: "Motion to Reconsider",
      optionD: "Lay on the Table",
      correctAnswer: 'A' as const,
      explanation: "A Point of Order, which deals with a breach of the rules, is one of the few motions that can interrupt a speaker."
    },
    {
      question: "If a member wishes to withdraw a motion after debate has begun, what is required?",
      optionA: "Nothing—the motion is automatically withdrawn",
      optionB: "Permission from the chair",
      optionC: "Unanimous consent",
      optionD: "A majority vote of the assembly",
      correctAnswer: 'C' as const,
      explanation: "After a motion has been stated by the chair and debate has begun, the maker can only withdraw it by requesting permission, which is granted by unanimous consent of the assembly (if no one objects)."
    },
    {
      question: "What is the effect of adopting the motion to \"Postpone Indefinitely\"?",
      optionA: "Defers the motion to the next meeting",
      optionB: "Postpones the motion until a specific date",
      optionC: "Kills the main motion without direct vote",
      optionD: "Suspends the motion for urgent business",
      correctAnswer: 'C' as const,
      explanation: "The purpose of Postpone Indefinitely is to dispose of the main motion for the session without a direct vote on the main motion itself."
    },
    {
      question: "Which is the final authority on the interpretation of FBLA bylaws?",
      optionA: "National Officers",
      optionB: "Parliamentarian",
      optionC: "Board of Directors",
      optionD: "Voting delegates",
      correctAnswer: 'C' as const,
      explanation: "The FBLA Board of Directors is the ultimate governing body and holds the final authority on the interpretation of the national bylaws."
    },
    {
      question: "What does \"obtaining the floor\" mean?",
      optionA: "A member asks to be excused",
      optionB: "A member receives permission to speak",
      optionC: "A member leaves the assembly",
      optionD: "A member challenges a ruling",
      correctAnswer: 'B' as const,
      explanation: "\"Obtaining the floor\" means a member has been recognized by the chair and has the exclusive right to speak."
    },
    {
      question: "Which motion is used to modify the wording—and within limits—the meaning of a pending motion?",
      optionA: "Postpone Indefinitely",
      optionB: "Amend",
      optionC: "Suspend the Rules",
      optionD: "Appeal",
      correctAnswer: 'B' as const,
      explanation: "The subsidiary motion to Amend is used to modify the wording of a pending motion before it is voted on."
    },
    {
      question: "A motion that seeks to close debate and vote immediately is called:",
      optionA: "Limit Debate",
      optionB: "Postpone Indefinitely",
      optionC: "Previous Question",
      optionD: "Reconsider",
      correctAnswer: 'C' as const,
      explanation: "The Previous Question is the motion used to close debate and force an immediate vote on the pending question(s)."
    },
    {
      question: "Which of the following motions is not amendable?",
      optionA: "Postpone to a Certain Time",
      optionB: "Limit Debate",
      optionC: "Main Motion",
      optionD: "Adjourn (when unqualified)",
      correctAnswer: 'D' as const,
      explanation: "The privileged motion to Adjourn (when it does not set a time to reconstitute) is not debatable or amendable."
    },
    {
      question: "What is the purpose of a motion to \"Commit or Refer\"?",
      optionA: "Repeal a main motion",
      optionB: "Defer discussion for 24 hours",
      optionC: "Assign a motion to a committee for detailed study",
      optionD: "Reorder items on the agenda",
      correctAnswer: 'C' as const,
      explanation: "The motion to Commit or Refer sends the main motion to a committee for investigation, report, and recommendation."
    },
    {
      question: "National FBLA officers are elected by:",
      optionA: "The Board of Directors",
      optionB: "A vote of past national officers",
      optionC: "Voting delegates at the National Leadership Conference",
      optionD: "A nominating committee",
      correctAnswer: 'C' as const,
      explanation: "National officers are elected by the voting delegates at the annual National Leadership Conference (NLC)."
    },
    {
      question: "The maker of a motion has the right to:",
      optionA: "Speak first in debate on the motion",
      optionB: "Withdraw the motion without consent",
      optionC: "Choose who debates next",
      optionD: "Amend the motion before the vote",
      correctAnswer: 'A' as const,
      explanation: "The member who makes a motion has the right to be the first speaker in debate on that motion."
    },
    {
      question: "A tie vote on a main motion means the motion is:",
      optionA: "Adopted",
      optionB: "Deferred",
      optionC: "Lost",
      optionD: "Sent to committee",
      correctAnswer: 'C' as const,
      explanation: "A tie vote on a motion requiring a majority means the motion is lost (defeated), as it did not achieve more than half of the votes cast."
    },
    {
      question: "The FBLA fiscal year begins on:",
      optionA: "July 1",
      optionB: "August 1",
      optionC: "October 1",
      optionD: "January 1",
      correctAnswer: 'A' as const,
      explanation: "The FBLA fiscal year runs from July 1 to June 30."
    },
    {
      question: "The term \"pending\" refers to:",
      optionA: "Motions submitted for future meetings",
      optionB: "Items on the agenda",
      optionC: "Motions currently under consideration",
      optionD: "Debated but not yet seconded motions",
      correctAnswer: 'C' as const,
      explanation: "A \"pending\" motion is one that has been stated by the chair and is currently before the assembly for debate, amendment, or vote."
    },
    {
      question: "Which of the following requires a two-thirds vote?",
      optionA: "Amend",
      optionB: "Main Motion",
      optionC: "Recess",
      optionD: "Suspend the Rules",
      correctAnswer: 'D' as const,
      explanation: "Suspending the rules requires a two-thirds vote because it overrides the established procedures of the assembly."
    },
    {
      question: "If a national officer resigns, the vacancy is filled by:",
      optionA: "Special election",
      optionB: "Appointment by the FBLA board",
      optionC: "The candidate with the second highest vote",
      optionD: "Nomination by the National President",
      correctAnswer: 'B' as const,
      explanation: "Vacancies in national office are filled by appointment by the FBLA Board of Directors."
    },
    {
      question: "Which of the following motions can be made while another is pending?",
      optionA: "Main Motion",
      optionB: "Appeal",
      optionC: "Reconsider",
      optionD: "Object to the Consideration of the Question",
      correctAnswer: 'B' as const,
      explanation: "An Appeal from the decision of the chair is an incidental motion that arises out of another question and can be made while another motion is pending."
    },
    {
      question: "If a member rises and states \"Point of Order,\" the chair must:",
      optionA: "Allow debate",
      optionB: "Submit it to a vote",
      optionC: "Rule immediately",
      optionD: "Refer it to the parliamentarian",
      correctAnswer: 'C' as const,
      explanation: "The chair must rule immediately on a Point of Order, stating whether it is \"well taken\" (valid) or \"not well taken\" (invalid)."
    },
    {
      question: "The motion to \"Rescind\" is best described as:",
      optionA: "Delaying a motion",
      optionB: "Reversing a previous decision",
      optionC: "Referring a motion to a higher body",
      optionD: "Creating a new standing rule",
      correctAnswer: 'B' as const,
      explanation: "The motion to Rescind (or Repeal) is used to cancel or reverse a motion that was previously adopted."
    },
    {
      question: "To be eligible for national office, a member must have paid dues by:",
      optionA: "April 1",
      optionB: "March 1",
      optionC: "February 1",
      optionD: "May 1",
      correctAnswer: 'B' as const,
      explanation: "A candidate for national office must have their dues paid and recorded by the national center by March 1 of the year they run for office."
    },
    {
      question: "Which subsidiary motion ranks lowest in precedence?",
      optionA: "Postpone to a Certain Time",
      optionB: "Amend",
      optionC: "Refer",
      optionD: "Lay on the Table",
      correctAnswer: 'B' as const,
      explanation: "In the standard order of precedence for subsidiary motions, Amend ranks lower than Postpone to a Certain Time and Commit or Refer. Postpone Indefinitely is the lowest."
    },
    {
      question: "The chair may vote:",
      optionA: "Only to break a tie",
      optionB: "Only when vote is by ballot",
      optionC: "When the vote changes the outcome",
      optionD: "Whenever they choose",
      correctAnswer: 'C' as const,
      explanation: "The presiding officer votes only when their vote would affect the result, such as to break a tie or to create a tie (which defeats a motion requiring a majority)."
    },
    {
      question: "Which of the following is a duty of the National FBLA Secretary?",
      optionA: "Conduct parliamentary training",
      optionB: "Oversee national finances",
      optionC: "Maintain accurate records of national meetings",
      optionD: "Enforce FBLA bylaws",
      correctAnswer: 'C' as const,
      explanation: "The primary duty of the Secretary is to record and maintain the minutes and other official records of the organization."
    },
    {
      question: "A motion is considered \"out of order\" when:",
      optionA: "It has already been discussed",
      optionB: "It is introduced while another is pending and takes lower precedence",
      optionC: "It has been tabled",
      optionD: "It has been seconded",
      correctAnswer: 'B' as const,
      explanation: "A motion is out of order if it conflicts with the rules of precedence. A lower-ranking motion cannot be made while a higher-ranking motion is pending."
    },
    {
      question: "A vote of \"Division of the Assembly\" is used to:",
      optionA: "Challenge the vote count",
      optionB: "Delay the vote",
      optionC: "Divide the assembly into groups",
      optionD: "Suspend the meeting",
      correctAnswer: 'A' as const,
      explanation: "A Division of the Assembly is a demand for a verification of a voice vote by a rising vote or show of hands when the result is unclear or doubted."
    },
    {
      question: "Which national region does not elect a separate Vice President?",
      optionA: "Eastern",
      optionB: "North Central",
      optionC: "Southern",
      optionD: "Western",
      correctAnswer: 'B' as const,
      explanation: "FBLA's five regions are Western, Mountain Plains, Central, Southern, and Eastern. There is no \"North Central\" region."
    },
    {
      question: "What kind of vote is required to close nominations?",
      optionA: "Majority",
      optionB: "Two-thirds",
      optionC: "Unanimous",
      optionD: "Plurality",
      correctAnswer: 'B' as const,
      explanation: "Closing nominations requires a two-thirds vote because it takes away the right of members to make further nominations."
    },
    {
      question: "The term \"floor\" in parliamentary context refers to:",
      optionA: "The physical meeting space",
      optionB: "The agenda",
      optionC: "The member currently allowed to speak",
      optionD: "The area in front of the chair",
      correctAnswer: 'C' as const,
      explanation: "The member who has been recognized by the chair and has the right to speak is said to \"have the floor.\""
    },
    {
      question: "National officers may be removed from office for:",
      optionA: "Failing to complete officer training",
      optionB: "Violating parliamentary law",
      optionC: "Failing to meet constitutional duties",
      optionD: "Skipping a national conference",
      correctAnswer: 'C' as const,
      explanation: "National officers can be removed for failing to perform their duties as outlined in the FBLA bylaws or for other violations of the organization's rules."
    },
    {
      question: "Which motion cannot interrupt another speaker?",
      optionA: "Point of Order",
      optionB: "Appeal",
      optionC: "Parliamentary Inquiry",
      optionD: "Move to Reconsider",
      correctAnswer: 'D' as const,
      explanation: "The motion to Reconsider cannot interrupt a speaker. It must wait until the current speaker has finished and the floor is free."
    },
    {
      question: "The vote required to adopt a motion that limits debate is:",
      optionA: "Majority",
      optionB: "Two-thirds",
      optionC: "Three-fourths",
      optionD: "Unanimous",
      correctAnswer: 'B' as const,
      explanation: "Because it restricts the rights of members to speak, the motion to Limit Debate requires a two-thirds vote."
    },
    {
      question: "A motion to \"Divide a Question\" is used to:",
      optionA: "Break debate into time limits",
      optionB: "Split a motion into separate parts for separate votes",
      optionC: "Take separate votes for officers",
      optionD: "End debate quickly",
      correctAnswer: 'B' as const,
      explanation: "Divide a Question is used when a motion contains multiple, independent proposals that can stand alone. It allows the assembly to vote on each part separately."
    },
    {
      question: "Which governing document has priority in resolving FBLA procedural disputes?",
      optionA: "Robert's Rules",
      optionB: "FBLA Local Chapter Handbook",
      optionC: "FBLA Bylaws",
      optionD: "State Officer Manual",
      correctAnswer: 'C' as const,
      explanation: "An organization's bylaws are its highest governing document. The FBLA Bylaws take precedence over all other rules, including Robert's Rules of Order."
    },
    {
      question: "A motion becomes the \"immediately pending question\" when:",
      optionA: "It is submitted in writing",
      optionB: "It is stated by the chair",
      optionC: "It is seconded",
      optionD: "Debate begins",
      correctAnswer: 'B' as const,
      explanation: "A motion becomes \"pending\" and is the \"immediately pending question\" once it has been stated by the chair, which places it before the assembly for consideration."
    },
    {
      question: "Which of the following is not a principle of parliamentary law?",
      optionA: "Justice for all",
      optionB: "One motion at a time",
      optionC: "Rights of the minority",
      optionD: "Favoring seniority",
      correctAnswer: 'D' as const,
      explanation: "Parliamentary law is based on fairness and equality. It does not grant special rights or privileges based on seniority."
    },
    {
      question: "Which class of motions take precedence over all others?",
      optionA: "Privileged",
      optionB: "Main",
      optionC: "Subsidiary",
      optionD: "Incidental",
      correctAnswer: 'A' as const,
      explanation: "Privileged motions (e.g., Adjourn, Recess, Question of Privilege) relate to the comfort and convenience of the assembly and take precedence over all other motions."
    },
    {
      question: "A member rises to \"Parliamentary Inquiry\" in order to:",
      optionA: "Appeal the chair",
      optionB: "Request information about rules",
      optionC: "State an objection",
      optionD: "Close debate",
      correctAnswer: 'B' as const,
      explanation: "A Parliamentary Inquiry is a request for the chair's opinion or information on a matter of parliamentary procedure as it relates to the current business."
    },
    {
      question: "\"Fix the Time to Which to Adjourn\" is classified as a:",
      optionA: "Main motion",
      optionB: "Incidental motion",
      optionC: "Privileged motion",
      optionD: "Subsidiary motion",
      correctAnswer: 'C' as const,
      explanation: "Fix the Time to Which to Adjourn is the highest-ranking privileged motion. It sets the time for an adjourned meeting."
    },
    {
      question: "A \"Standing Rule\" differs from a bylaw in that:",
      optionA: "It applies only to debate",
      optionB: "It requires a two-thirds vote",
      optionC: "It is temporary",
      optionD: "It relates to details of administration",
      correctAnswer: 'D' as const,
      explanation: "Standing rules relate to the administrative details of an organization (e.g., meeting start time), while bylaws define its fundamental structure and governance."
    },
    {
      question: "Which of the following motions cannot have the Previous Question applied to it?",
      optionA: "Main Motion",
      optionB: "Amend",
      optionC: "Point of Order",
      optionD: "Postpone to a Certain Time",
      correctAnswer: 'C' as const,
      explanation: "The Previous Question (motion to close debate) can only be applied to debatable motions. Point of Order is not debatable, so Previous Question cannot be applied to it."
    },
    {
      question: "The purpose of a \"second\" to a motion is to:",
      optionA: "Ensure at least two members wish to consider it",
      optionB: "Provide debate opportunity to the seconder",
      optionC: "Validate the motion legally",
      optionD: "Allow the chair to rule on it",
      correctAnswer: 'A' as const,
      explanation: "A second indicates that at least one other member (besides the maker) wishes the assembly to consider the motion. Without a second, the motion is not considered."
    },
    {
      question: "In FBLA, the National Parliamentarian's primary responsibility is to:",
      optionA: "Preside over meetings when the president is absent",
      optionB: "Interpret and advise on parliamentary procedure",
      optionC: "Record minutes of all national meetings",
      optionD: "Vote only in case of a tie",
      correctAnswer: 'B' as const,
      explanation: "The Parliamentarian's primary role is to advise the presiding officer and members on matters of parliamentary procedure and proper interpretation of the rules."
    },
    {
      question: "A motion requiring a two-thirds vote would fail if:",
      optionA: "60 voted yes and 40 voted no",
      optionB: "66 voted yes and 34 voted no",
      optionC: "67 voted yes and 33 voted no",
      optionD: "70 voted yes and 30 voted no",
      correctAnswer: 'A' as const,
      explanation: "A two-thirds vote means at least 2/3 of votes cast must be in favor. With 100 votes cast, at least 67 must be yes. 60 out of 100 (60%) does not meet the two-thirds (66.67%) requirement."
    },
    {
      question: "Which of the following best describes \"germane\" in relation to amendments?",
      optionA: "The amendment must be related to the subject of the motion",
      optionB: "The amendment must be approved by the chair",
      optionC: "The amendment must strengthen the motion",
      optionD: "The amendment must be seconded by three members",
      correctAnswer: 'A' as const,
      explanation: "For an amendment to be germane, it must be directly related to and within the scope of the pending motion. It cannot introduce an entirely new subject."
    },
    {
      question: "When may a member \"Call for the Orders of the Day\"?",
      optionA: "Only at the beginning of a meeting",
      optionB: "When the assembly has departed from the adopted agenda",
      optionC: "Only during new business",
      optionD: "When the chair requests it",
      correctAnswer: 'B' as const,
      explanation: "A Call for the Orders of the Day is used when the assembly has deviated from the established agenda or order of business and a member wishes to enforce the schedule."
    },
    {
      question: "The primary difference between \"Rescind\" and \"Amend Something Previously Adopted\" is:",
      optionA: "Rescind completely removes while Amend modifies",
      optionB: "Rescind requires two-thirds while Amend requires majority",
      optionC: "Rescind is debatable while Amend is not",
      optionD: "Rescind can only be used on bylaws",
      correctAnswer: 'A' as const,
      explanation: "Rescind (or Repeal) completely nullifies a previously adopted motion, while Amend Something Previously Adopted changes or modifies it. Both typically require a two-thirds vote or previous notice with a majority."
    },
    {
      question: "A \"Point of Information\" is directed to:",
      optionA: "The assembly",
      optionB: "The chair or through the chair to another member",
      optionC: "The parliamentarian only",
      optionD: "The recording secretary",
      correctAnswer: 'B' as const,
      explanation: "A Point of Information (or Request for Information) is a question directed to the chair or, through the chair, to another member to obtain factual information relevant to the pending business."
    },
    {
      question: "Which of the following statements about \"Unanimous Consent\" is correct?",
      optionA: "It requires every member to vote yes",
      optionB: "It requires a formal vote",
      optionC: "It means no member objects when the chair asks",
      optionD: "It can override the bylaws",
      correctAnswer: 'C' as const,
      explanation: "Unanimous consent (or general consent) is an informal way to approve routine or non-controversial matters. If no member objects when the chair asks, the action is approved without a formal vote."
    },
    {
      question: "The motion to \"Limit or Extend Limits of Debate\" can:",
      optionA: "Only extend debate time",
      optionB: "Both limit or extend the time or number of speakers",
      optionC: "Only be applied to main motions",
      optionD: "Be renewed without restriction",
      correctAnswer: 'B' as const,
      explanation: "This motion can either limit (reduce) or extend the limits of debate by setting time limits per speaker, total debate time, or the number of speakers allowed."
    },
    {
      question: "What happens to a main motion if \"Object to Consideration of the Question\" is sustained?",
      optionA: "It is postponed to the next meeting",
      optionB: "It is sent to committee",
      optionC: "It is dismissed without debate",
      optionD: "It requires a two-thirds vote to pass",
      correctAnswer: 'C' as const,
      explanation: "If the objection to consideration is sustained (approved by two-thirds vote), the main motion is dismissed immediately without any debate or further consideration."
    },
    {
      question: "In Robert's Rules, when can minutes be corrected?",
      optionA: "Only at the meeting when they are read",
      optionB: "At any time an error is noticed, regardless of when",
      optionC: "Only by unanimous consent",
      optionD: "Only by the secretary",
      correctAnswer: 'B' as const,
      explanation: "Minutes can be corrected at any time an error is noticed, even years later, through a motion to amend the minutes. The assembly must approve the correction."
    },
    {
      question: "A \"friendly amendment\" is:",
      optionA: "An official parliamentary term requiring no vote",
      optionB: "An informal suggestion that must still be properly moved and voted on",
      optionC: "Automatically accepted if the maker agrees",
      optionD: "Only used in committee meetings",
      correctAnswer: 'B' as const,
      explanation: "There is no such thing as a \"friendly amendment\" in formal parliamentary procedure. All amendments must be properly moved, seconded, and voted on by the assembly, even if the motion's maker accepts it."
    },
    {
      question: "Which of the following accurately describes \"ex officio\" members?",
      optionA: "They are former officers with voting rights",
      optionB: "They serve by virtue of their office or position",
      optionC: "They can only attend executive sessions",
      optionD: "They have no privileges or duties",
      correctAnswer: 'B' as const,
      explanation: "Ex officio members are individuals who are members of a body by virtue of holding another office or position. Their rights and duties should be specified in the bylaws."
    },
    {
      question: "The motion to \"Take from the Table\" must be made:",
      optionA: "At any time during the same session or the next session",
      optionB: "Immediately after the item was tabled",
      optionC: "Only by the member who made the original motion",
      optionD: "With a two-thirds vote",
      correctAnswer: 'A' as const,
      explanation: "A motion can be taken from the table during the same session in which it was laid on the table, or at the next session (if held within a quarterly time interval). It requires a majority vote."
    },
    {
      question: "When voting by ballot, the chair:",
      optionA: "Never votes under any circumstance",
      optionB: "Votes along with other members",
      optionC: "Votes only to break ties",
      optionD: "Assigns someone else to vote on their behalf",
      correctAnswer: 'B' as const,
      explanation: "When voting is by ballot (secret), the chair has the same voting rights as any other member and typically votes along with everyone else since the vote is anonymous."
    },
    {
      question: "The term \"immediately pending\" refers to:",
      optionA: "The first motion made at a meeting",
      optionB: "The motion currently on the floor for immediate consideration",
      optionC: "Any motion awaiting a second",
      optionD: "Motions scheduled for the next meeting",
      correctAnswer: 'B' as const,
      explanation: "The immediately pending question is the motion that is directly before the assembly for consideration at that moment. If several motions are pending, it is the one most recently stated by the chair."
    },
    {
      question: "A \"seriatim\" consideration means:",
      optionA: "Considering a document paragraph by paragraph or section by section",
      optionB: "Serial voting by ballot",
      optionC: "Considering motions in strict chronological order",
      optionD: "Committee consideration before floor debate",
      correctAnswer: 'A' as const,
      explanation: "Seriatim consideration is a method of considering a long document (like bylaws) by dividing it into logical parts and considering each section separately before voting on the whole."
    },
    {
      question: "The proper way to bring a question again before the assembly that was postponed indefinitely is to:",
      optionA: "Move to Reconsider",
      optionB: "Introduce it as new business",
      optionC: "Move to Rescind the postponement",
      optionD: "Both A and B are acceptable",
      correctAnswer: 'D' as const,
      explanation: "A motion that was postponed indefinitely can be renewed as new business at a later session, or the decision to postpone can be reconsidered if done within the allowable time limits for reconsideration."
    },
    {
      question: "Which of the following is true about the motion to Reconsider?",
      optionA: "It can be applied to any vote",
      optionB: "It can be made by any member",
      optionC: "It can be made on the same day or the next calendar day",
      optionD: "It requires a two-thirds vote",
      correctAnswer: 'C' as const,
      explanation: "A motion to Reconsider must be made on the same day the original vote was taken or on the next calendar day of the session. It can only be made by someone who voted on the prevailing side."
    },
    {
      question: "In the absence of a rule to the contrary, debate on a pending question:",
      optionA: "Is limited to 10 minutes per member",
      optionB: "Is unlimited until someone moves the Previous Question",
      optionC: "Allows each member to speak once for 10 minutes",
      optionD: "Must end after one hour",
      correctAnswer: 'B' as const,
      explanation: "Unless the organization's rules specify otherwise or the assembly adopts a motion to limit debate, debate continues until no one else wishes to speak or until the Previous Question is adopted."
    },
    {
      question: "The \"Nominating Committee\" in FBLA:",
      optionA: "Makes the final decision on candidates",
      optionB: "Has no power in the election process",
      optionC: "Proposes candidates but cannot restrict other nominations",
      optionD: "Must approve all candidates before they can run",
      correctAnswer: 'C' as const,
      explanation: "A nominating committee proposes candidates for office, but it cannot prevent nominations from the floor. The assembly always has the right to make additional nominations."
    },
    {
      question: "A main motion can be introduced when:",
      optionA: "No other motion is pending",
      optionB: "At any time the member has the floor",
      optionC: "Only during new business",
      optionD: "The chair calls for main motions",
      correctAnswer: 'A' as const,
      explanation: "A main motion, which introduces new business, can only be made when no other motion is pending (when the floor is clear). It is the lowest ranking motion."
    },
    {
      question: "The principle of \"one question at a time\" means:",
      optionA: "Only one member can speak at a time",
      optionB: "Only one main motion can be considered at a time",
      optionC: "Questions must be answered one at a time",
      optionD: "The chair can only ask one question per member",
      correctAnswer: 'B' as const,
      explanation: "This fundamental principle of parliamentary procedure means that only one main motion can be immediately pending for consideration at any time, ensuring focused discussion."
    },
    {
      question: "An amendment is considered adopted when:",
      optionA: "The maker of the motion accepts it",
      optionB: "The majority of the assembly votes in favor",
      optionC: "The chair declares it adopted",
      optionD: "Both A and B occur",
      correctAnswer: 'B' as const,
      explanation: "An amendment requires a majority vote of the assembly to be adopted, regardless of whether the maker of the original motion accepts it. Once adopted, it becomes part of the motion."
    },
    {
      question: "What is the term for an amendment to a primary amendment?",
      optionA: "Tertiary amendment",
      optionB: "Secondary amendment",
      optionC: "Subordinate amendment",
      optionD: "Derivative amendment",
      correctAnswer: 'B' as const,
      explanation: "An amendment to a primary amendment is called a secondary amendment."
    },
    {
      question: "Which of the following is true about a motion to Lay on the Table?",
      optionA: "It's used to kill a motion",
      optionB: "It's debatable",
      optionC: "It's used to temporarily set a motion aside",
      optionD: "It requires a two-thirds vote",
      correctAnswer: 'C' as const,
      explanation: "The legitimate purpose of Lay on the Table is to temporarily set aside a motion to deal with more urgent business. It is often misused to kill a motion."
    },
    {
      question: "The FBLA National President may not serve more than:",
      optionA: "One full term",
      optionB: "Two full terms",
      optionC: "One calendar year",
      optionD: "Two fiscal cycles",
      correctAnswer: 'A' as const,
      explanation: "The FBLA National President is limited to serving one full term in that office."
    },
    {
      question: "In the standard order of business, which item typically comes first?",
      optionA: "Reports of Officers",
      optionB: "New Business",
      optionC: "Reading of Minutes",
      optionD: "Unfinished Business",
      correctAnswer: 'C' as const,
      explanation: "The standard order of business begins with the reading and approval of the minutes from the previous meeting."
    },
    {
      question: "What is the primary purpose of parliamentary procedure?",
      optionA: "Prioritize senior leadership",
      optionB: "Protect the rights of the majority",
      optionC: "Facilitate orderly and fair meetings",
      optionD: "Limit discussion",
      correctAnswer: 'C' as const,
      explanation: "The primary purpose of parliamentary procedure is to ensure that meetings are run in an orderly, fair, and efficient manner, protecting the rights of all members."
    },
    {
      question: "A motion to \"Fix the Time to Which to Adjourn\" can be made:",
      optionA: "Only at the end of a meeting",
      optionB: "Anytime business is pending",
      optionC: "Only if the previous question is adopted",
      optionD: "Only if there is unfinished business",
      correctAnswer: 'B' as const,
      explanation: "As a privileged motion, Fix the Time to Which to Adjourn can be made even when other business is pending."
    },
    {
      question: "What must happen before debate can begin on a motion?",
      optionA: "The motion must be discussed in committee",
      optionB: "The motion must be stated by the chair",
      optionC: "The chair must ask for debate",
      optionD: "A friendly amendment must be made",
      correctAnswer: 'B' as const,
      explanation: "Debate cannot begin until the motion has been stated by the chair, which officially places it before the assembly."
    },
    {
      question: "A motion that introduces new business is classified as a:",
      optionA: "Privileged motion",
      optionB: "Incidental motion",
      optionC: "Main motion",
      optionD: "Secondary motion",
      correctAnswer: 'C' as const,
      explanation: "A main motion is the device used to introduce a new item of business for consideration."
    },
    {
      question: "Who chairs the FBLA National Officer Screening Committee?",
      optionA: "State President",
      optionB: "Past National President",
      optionC: "FBLA CEO",
      optionD: "FBLA Director of Programs",
      correctAnswer: 'B' as const,
      explanation: "The National Officer Screening Committee is typically chaired by a Past National President."
    },
    {
      question: "A motion can be withdrawn after being stated by the chair:",
      optionA: "Only with the assembly's consent",
      optionB: "Automatically at any time",
      optionC: "By the seconding member",
      optionD: "If the parliamentarian agrees",
      correctAnswer: 'A' as const,
      explanation: "Once a motion has been stated by the chair, it belongs to the assembly. The maker can only withdraw it by requesting permission, which is granted by unanimous consent or a majority vote."
    },
    {
      question: "Which motion is not debatable, not amendable, and requires a two-thirds vote?",
      optionA: "Amend",
      optionB: "Suspend the Rules",
      optionC: "Commit or Refer",
      optionD: "Fix the Time to Which to Adjourn",
      correctAnswer: 'B' as const,
      explanation: "The motion to Suspend the Rules is not debatable, not amendable, and requires a two-thirds vote."
    },
    {
      question: "What is the term for reviving a motion previously laid on the table?",
      optionA: "Rescind",
      optionB: "Reconsider",
      optionC: "Take from the Table",
      optionD: "Return to Order",
      correctAnswer: 'C' as const,
      explanation: "The motion to Take from the Table is used to resume consideration of a motion that was previously \"laid on the table.\""
    }
  ];

  for (let i = 0; i < extensionQuestions.length; i++) {
    const q = extensionQuestions[i];
    await addQuestion(
      parliamentaryEvent.id,
      q.question,
      q.optionA,
      q.optionB,
      q.optionC,
      q.optionD,
      q.correctAnswer,
      'Beginner',
      1,
      q.explanation
    );
  }
  
  console.log(`✅ Successfully added ${extensionQuestions.length} extension questions to Introduction to Parliamentary Procedure (Questions 101-200)`);
}

// Function to run the seeding (can be called directly)
export async function runSeed() {
  try {
    await seedEvents();
    await seedAccountingIIQuestions();
    await seedAccountingIIExtensionQuestions();
    await seedAccountingIIFinalQuestions();
    await seedParliamentaryProcedureQuestions();
    await seedParliamentaryProcedureExtensionQuestions();
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