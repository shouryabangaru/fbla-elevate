import { useState, useEffect, useCallback } from 'react';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Target, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import './PracticeTestPage.css';

interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

interface TestResult {
  questionId: number;
  question: string;
  userAnswer: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
}

const events = [
  { id: 'accounting', name: 'Accounting' },
  { id: 'business-law', name: 'Business Law' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'economics', name: 'Economics' },
  { id: 'entrepreneurship', name: 'Entrepreneurship' },
  { id: 'personal-finance', name: 'Personal Finance' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'business-management', name: 'Business Management' }
];

const questionBanks: Record<string, Question[]> = {
  'accounting': [
    {
      id: 1,
      question: "What is the basic accounting equation?",
      options: {
        A: "Assets = Liabilities + Owner's Equity",
        B: "Assets = Liabilities - Owner's Equity",
        C: "Assets + Liabilities = Owner's Equity",
        D: "Assets - Owner's Equity = Liabilities"
      },
      correctAnswer: 'A',
      explanation: "The fundamental accounting equation states that Assets = Liabilities + Owner's Equity. This equation must always balance and forms the foundation of double-entry bookkeeping."
    },
    {
      id: 2,
      question: "Which financial statement shows a company's financial position at a specific point in time?",
      options: {
        A: "Income Statement",
        B: "Cash Flow Statement",
        C: "Balance Sheet",
        D: "Statement of Retained Earnings"
      },
      correctAnswer: 'C',
      explanation: "The Balance Sheet shows a company's financial position at a specific point in time by listing assets, liabilities, and owner's equity."
    },
    {
      id: 3,
      question: "What is depreciation?",
      options: {
        A: "An increase in asset value",
        B: "The allocation of an asset's cost over its useful life",
        C: "A type of liability",
        D: "Cash payment for expenses"
      },
      correctAnswer: 'B',
      explanation: "Depreciation is the systematic allocation of an asset's cost over its useful life, reflecting the asset's declining value due to wear and tear."
    },
    {
      id: 4,
      question: "Which account type increases with a credit entry?",
      options: {
        A: "Assets",
        B: "Expenses",
        C: "Liabilities",
        D: "Dividends"
      },
      correctAnswer: 'C',
      explanation: "Liabilities increase with credit entries. The normal balance for liability accounts is a credit balance."
    },
    {
      id: 5,
      question: "What is the purpose of the trial balance?",
      options: {
        A: "To calculate net income",
        B: "To verify that debits equal credits",
        C: "To prepare tax returns",
        D: "To determine cash flow"
      },
      correctAnswer: 'B',
      explanation: "The trial balance is used to verify that total debits equal total credits in the accounting system, ensuring mathematical accuracy."
    },
    {
      id: 6,
      question: "A company issues 5,000 shares of $10 par common stock for $75,000. What amount is credited to the Paid-in Capital in Excess of Par account?",
      options: {
        A: "$25,000",
        B: "$75,000",
        C: "$50,000",
        D: "$10,000"
      },
      correctAnswer: 'A',
      explanation: "The total cash received is $75,000. The par value of the shares is calculated as 5,000 shares × $10 par = $50,000. The excess amount paid over par is $75,000 - $50,000 = $25,000. This excess is credited to the Paid-in Capital in Excess of Par account."
    },
    {
      id: 7,
      question: "Which of the following accounts would not appear on the post-closing trial balance?",
      options: {
        A: "Accumulated Depreciation",
        B: "Retained Earnings",
        C: "Sales Revenue",
        D: "Notes Payable"
      },
      correctAnswer: 'C',
      explanation: "The post-closing trial balance only contains permanent accounts (assets, liabilities, and equity). Sales Revenue is a temporary account (revenue) that is closed to Retained Earnings at the end of the accounting period, so it will have a zero balance and not appear on the post-closing trial balance."
    },
    {
      id: 8,
      question: "Using the FIFO method, what is the cost of goods sold if 80 units are sold from inventory with the following: 40 units at $20, 50 units at $22, 60 units at $24?",
      options: {
        A: "$1,800",
        B: "$1,680",
        C: "$1,720",
        D: "$1,760"
      },
      correctAnswer: 'B',
      explanation: "Under FIFO (First-In, First-Out), the oldest units are sold first. To find the cost of 80 units: Sell the first 40 units @ $20 = $800. Sell the next 40 units from the following purchase @ $22 = $880. Total Cost of Goods Sold = $800 + $880 = $1,680."
    },
    {
      id: 9,
      question: "Which transaction increases both assets and liabilities?",
      options: {
        A: "Collection from a customer",
        B: "Purchase of equipment for cash",
        C: "Purchase of supplies on account",
        D: "Payment of a note payable"
      },
      correctAnswer: 'C',
      explanation: "Purchasing supplies increases the asset account 'Supplies'. Purchasing them \"on account\" means you haven't paid yet, which increases the liability account 'Accounts Payable'."
    },
    {
      id: 10,
      question: "The current ratio is 2.5. If current liabilities total $40,000, what are current assets?",
      options: {
        A: "$100,000",
        B: "$60,000",
        C: "$50,000",
        D: "$90,000"
      },
      correctAnswer: 'A',
      explanation: "The current ratio formula is Current Assets / Current Liabilities = 2.5. Plugging in the known value: Current Assets / $40,000 = 2.5. Therefore, Current Assets = 2.5 × $40,000 = $100,000."
    },
    {
      id: 11,
      question: "A flexible budget is best used to:",
      options: {
        A: "Set long-term strategic goals",
        B: "Evaluate performance at different activity levels",
        C: "Track depreciation of assets",
        D: "Allocate capital expenditures"
      },
      correctAnswer: 'B',
      explanation: "A flexible budget adjusts or \"flexes\" for changes in actual volume or activity levels. This allows managers to compare actual results to what the budget should have been at that level of activity, making it an excellent tool for performance evaluation."
    },
    {
      id: 12,
      question: "If a partner contributes non-cash assets to a partnership, at what amount are they recorded?",
      options: {
        A: "Book value",
        B: "Appraised value",
        C: "Market value agreed by partners",
        D: "Whichever is higher between book and market value"
      },
      correctAnswer: 'C',
      explanation: "When a partner contributes a non-cash asset, it is recorded at its fair market value on the date of contribution. This value must be agreed upon by all partners to ensure equity in the partnership."
    },
    {
      id: 13,
      question: "The company has the following balances: Net Income: $20,000; Dividends Paid: $5,000; Beginning Retained Earnings: $40,000. What is the ending retained earnings?",
      options: {
        A: "$45,000",
        B: "$55,000",
        C: "$65,000",
        D: "$60,000"
      },
      correctAnswer: 'B',
      explanation: "The formula for Ending Retained Earnings is: Beginning Retained Earnings + Net Income - Dividends Paid. $40,000 + $20,000 - $5,000 = $55,000."
    },
    {
      id: 14,
      question: "Which cost would be considered indirect labor in a manufacturing firm?",
      options: {
        A: "Factory line worker",
        B: "Assembly supervisor salary",
        C: "Sales department wages",
        D: "Raw materials handler"
      },
      correctAnswer: 'B',
      explanation: "Indirect labor is the cost of employees who are necessary for the manufacturing process but are not directly involved in hands-on production of the product. A supervisor's salary fits this description, unlike the wages of a factory line worker or raw materials handler (direct labor)."
    },
    {
      id: 15,
      question: "In accrual accounting, when should revenue be recorded?",
      options: {
        A: "When cash is received",
        B: "When the service is performed",
        C: "When the invoice is paid",
        D: "When the contract is signed"
      },
      correctAnswer: 'B',
      explanation: "The core principle of accrual accounting is the revenue recognition principle. This principle states that revenue should be recorded when it is earned (i.e., when the service is performed or the good is delivered), regardless of when the cash is actually received."
    },
    {
      id: 16,
      question: "A corporation declares a 10% stock dividend when there are 100,000 shares outstanding, and the market value is $30/share. The par value is $1. What is the total amount transferred from retained earnings?",
      options: {
        A: "$10,000",
        B: "$30,000",
        C: "$300,000",
        D: "$3,000"
      },
      correctAnswer: 'C',
      explanation: "A stock dividend is based on the market value of the stock. The number of new shares issued is 10% of 100,000 = 10,000 shares. The total amount transferred from Retained Earnings to equity accounts is 10,000 shares × $30 market value per share = $300,000."
    },
    {
      id: 17,
      question: "Which type of depreciation would result in the highest expense in the first year?",
      options: {
        A: "Straight-line",
        B: "Units-of-production",
        C: "Sum-of-the-years'-digits",
        D: "Declining balance"
      },
      correctAnswer: 'D',
      explanation: "The declining balance method is an accelerated depreciation method. It calculates depreciation based on a fixed percentage of the asset's book value, which is highest in the first year, resulting in a larger depreciation expense upfront compared to straight-line or units-of-production."
    },
    {
      id: 18,
      question: "A factory incurs $5,000 in direct materials, $2,500 in direct labor, and $1,500 in overhead. What is the cost of goods manufactured?",
      options: {
        A: "$9,000",
        B: "$8,000",
        C: "$6,500",
        D: "$7,500"
      },
      correctAnswer: 'A',
      explanation: "The cost of goods manufactured is the total cost of all goods completed during the period. It is calculated as: Direct Materials + Direct Labor + Manufacturing Overhead. $5,000 + $2,500 + $1,500 = $9,000."
    },
    {
      id: 19,
      question: "Which ratio best indicates how efficiently a company is using its assets to generate profit?",
      options: {
        A: "Current ratio",
        B: "Gross profit margin",
        C: "Return on assets",
        D: "Debt-to-equity"
      },
      correctAnswer: 'C',
      explanation: "Return on Assets (ROA) is calculated as Net Income / Average Total Assets. It measures how profitably a company uses its assets to generate earnings, making it a key efficiency ratio."
    },
    {
      id: 20,
      question: "What is the main difference between LIFO and FIFO during periods of rising prices?",
      options: {
        A: "FIFO results in lower taxes",
        B: "LIFO results in lower net income",
        C: "FIFO results in higher cost of goods sold",
        D: "LIFO increases gross profit"
      },
      correctAnswer: 'B',
      explanation: "In a period of rising prices, LIFO (Last-In, First-Out) assigns the most recent, higher costs to Cost of Goods Sold (COGS). This higher COGS results in a lower gross profit and, consequently, a lower net income compared to FIFO."
    },
    {
      id: 21,
      question: "Which of the following is not part of cash flows from operating activities?",
      options: {
        A: "Dividends received",
        B: "Interest paid",
        C: "Sale of inventory",
        D: "Purchase of equipment"
      },
      correctAnswer: 'D',
      explanation: "Operating activities are related to a company's core business operations (e.g., selling goods, providing services). The purchase of equipment is an investment in long-term assets and is classified as an investing activity on the statement of cash flows."
    },
    {
      id: 22,
      question: "A business pays $12,000 in rent covering 12 months. After two months, what is the balance in the Prepaid Rent account?",
      options: {
        A: "$12,000",
        B: "$10,000",
        C: "$2,000",
        D: "$1,000"
      },
      correctAnswer: 'B',
      explanation: "The monthly rent is $12,000 / 12 months = $1,000 per month. After 2 months, 2 months' worth of expense has been recorded, leaving 10 months of rent still prepaid. The balance in the Prepaid Rent (asset) account is 10 months × $1,000 = $10,000."
    },
    {
      id: 23,
      question: "Which method best allocates overhead based on multiple cost drivers?",
      options: {
        A: "Direct method",
        B: "Plantwide rate",
        C: "Activity-based costing",
        D: "Traditional costing"
      },
      correctAnswer: 'C',
      explanation: "Activity-based costing (ABC) is a precise method that identifies key activities in a process and assigns overhead costs to products based on the products' consumption of each activity, using multiple cost drivers."
    },
    {
      id: 24,
      question: "An accounts receivable aging report shows $1,500 in likely uncollectible accounts. The current Allowance for Doubtful Accounts has a $200 credit balance. What is the required adjustment?",
      options: {
        A: "Debit Bad Debt Expense $1,700",
        B: "Debit Bad Debt Expense $1,500",
        C: "Debit Bad Debt Expense $1,300",
        D: "Debit Allowance for Doubtful Accounts $1,300"
      },
      correctAnswer: 'C',
      explanation: "The aging report indicates the desired ending balance in the Allowance for Doubtful Accounts should be a $1,500 credit. Since there is already a $200 credit balance, only an additional $1,300 is needed to reach the desired balance. The adjusting entry is a debit to Bad Debt Expense and a credit to Allowance for Doubtful Accounts for $1,300."
    },
    {
      id: 25,
      question: "When recording payroll, the employer portion of FICA taxes is recorded as:",
      options: {
        A: "A debit to Payroll Expense",
        B: "A credit to Cash",
        C: "A credit to FICA Payable",
        D: "A debit to Payroll Tax Expense"
      },
      correctAnswer: 'D',
      explanation: "The employer's share of FICA (Social Security and Medicare) taxes is an additional expense to the company, separate from the wages earned by the employee. It is recorded as a debit to an expense account (e.g., Payroll Tax Expense) and a credit to a liability account (e.g., FICA Taxes Payable) until it is paid."
    },
    {
      id: 26,
      question: "What is the primary purpose of adjusting entries in the accounting cycle?",
      options: {
        A: "To correct errors made in the general journal",
        B: "To record transactions that occurred after the accounting period",
        C: "To update account balances before preparing financial statements",
        D: "To reconcile the bank statement with the general ledger"
      },
      correctAnswer: 'C',
      explanation: "Adjusting entries are made at the end of an accounting period to ensure that revenues are recorded in the period they are earned and expenses are recorded in the period they are incurred (matching principle). This updates balance sheet and income statement accounts so the financial statements reflect the correct financial position and performance."
    },
    {
      id: 27,
      question: "Which of the following accounts would typically require an adjusting entry?",
      options: {
        A: "Common Stock",
        B: "Notes Payable",
        C: "Prepaid Insurance",
        D: "Accounts Receivable"
      },
      correctAnswer: 'C',
      explanation: "Prepaid Insurance is an asset that expires over time. An adjusting entry is needed to recognize the portion of the prepaid asset that has expired (i.e., insurance expense for the period)."
    },
    {
      id: 28,
      question: "Under the perpetual inventory system, what entry is made when merchandise is sold?",
      options: {
        A: "Debit Inventory, Credit Sales",
        B: "Debit Sales, Credit Inventory",
        C: "Debit Accounts Receivable, Credit Sales and Inventory",
        D: "Debit Accounts Receivable, Credit Sales; Debit Cost of Goods Sold, Credit Inventory"
      },
      correctAnswer: 'D',
      explanation: "In a perpetual system, two entries are made at the point of sale: 1) To record the sale and receivable/revenue, and 2) To simultaneously update the inventory record and recognize the cost of the goods that were sold."
    },
    {
      id: 29,
      question: "Which inventory costing method results in the highest net income during a period of rising prices?",
      options: {
        A: "LIFO",
        B: "FIFO",
        C: "Weighted Average",
        D: "Specific Identification"
      },
      correctAnswer: 'B',
      explanation: "In rising prices, FIFO (First-In, First-Out) assigns the oldest, lowest costs to Cost of Goods Sold. This results in a lower COGS, a higher gross profit, and consequently, the highest net income compared to LIFO or weighted average."
    },
    {
      id: 30,
      question: "What is the primary purpose of a flexible budget?",
      options: {
        A: "To reflect the cost of production at varying levels of output",
        B: "To remain unchanged regardless of sales volume",
        C: "To ensure consistent spending",
        D: "To track depreciation expenses only"
      },
      correctAnswer: 'A',
      explanation: "A flexible budget is designed to adjust or \"flex\" based on changes in actual activity levels (e.g., units produced, units sold). It shows what revenues and costs should have been at the actual level of activity, which is crucial for accurate performance evaluation."
    },
    {
      id: 31,
      question: "Which of the following is not typically included in a master budget?",
      options: {
        A: "Capital expenditures budget",
        B: "Sales budget",
        C: "Production budget",
        D: "Trial balance"
      },
      correctAnswer: 'D',
      explanation: "A master budget is a comprehensive set of future budgeted financial statements and supporting schedules (sales, production, etc.). A trial balance is an actual internal accounting report from the general ledger, not a budget."
    },
    {
      id: 32,
      question: "Which document authorizes a payment to a vendor?",
      options: {
        A: "Sales invoice",
        B: "Purchase order",
        C: "Receiving report",
        D: "Voucher"
      },
      correctAnswer: 'D',
      explanation: "A voucher is an internal document, often part of a voucher system, that summarizes the supporting documents (invoice, purchase order, receiving report) and is used to authorize payment to a vendor."
    },
    {
      id: 33,
      question: "A company uses the allowance method for bad debts. What entry is made when an account is written off?",
      options: {
        A: "Debit Bad Debt Expense, Credit Accounts Receivable",
        B: "Debit Allowance for Doubtful Accounts, Credit Accounts Receivable",
        C: "Debit Accounts Receivable, Credit Allowance for Doubtful Accounts",
        D: "Debit Retained Earnings, Credit Accounts Receivable"
      },
      correctAnswer: 'B',
      explanation: "Writing off a specific uncollectible account removes the receivable from the books. Since the loss was already estimated and recorded via the Allowance account, the write-off entry reduces both the Allowance (a contra-asset) and the Accounts Receivable (an asset). There is no expense recorded at the time of write-off."
    },
    {
      id: 34,
      question: "Which tax is only paid by the employer and not withheld from the employee's paycheck?",
      options: {
        A: "Federal income tax",
        B: "Social Security tax",
        C: "Medicare tax",
        D: "Federal unemployment tax"
      },
      correctAnswer: 'D',
      explanation: "Federal Unemployment Tax Act (FUTA) tax is paid solely by the employer to fund state unemployment agencies. It is not deducted from an employee's wages."
    },
    {
      id: 35,
      question: "What is the purpose of a Form W-4?",
      options: {
        A: "To calculate an employee's Social Security contributions",
        B: "To report annual wages and tax withheld",
        C: "To determine federal income tax withholding",
        D: "To summarize total payroll for the employer"
      },
      correctAnswer: 'C',
      explanation: "Form W-4, the Employee's Withholding Certificate, is completed by the employee. It provides the employer with information (like filing status and number of allowances) to calculate how much federal income tax to withhold from the employee's paycheck."
    },
    {
      id: 36,
      question: "Which depreciation method results in higher depreciation expense in the earlier years of an asset's life?",
      options: {
        A: "Straight-line",
        B: "Units-of-production",
        C: "Declining-balance",
        D: "Sum-of-the-years-digits"
      },
      correctAnswer: 'C',
      explanation: "The declining-balance method is an accelerated depreciation method. It applies a constant depreciation rate to the asset's declining book value each year, resulting in higher expenses in the early years and lower expenses in the later years."
    },
    {
      id: 37,
      question: "When a company disposes of an asset for more than its book value, what is the result?",
      options: {
        A: "A loss on disposal",
        B: "No financial effect",
        C: "A gain on disposal",
        D: "An increase in depreciation expense"
      },
      correctAnswer: 'C',
      explanation: "The book value is Cost - Accumulated Depreciation. If the cash received from the sale is greater than the book value, the company has sold the asset for more than its accounting value, resulting in a gain."
    },
    {
      id: 38,
      question: "Which of the following accounts is affected when a company issues common stock for cash?",
      options: {
        A: "Treasury Stock",
        B: "Additional Paid-in Capital",
        C: "Retained Earnings",
        D: "Dividends Payable"
      },
      correctAnswer: 'B',
      explanation: "When stock is issued for cash, the Common Stock account is credited for the par value of the shares. The amount received above par value is credited to Additional Paid-in Capital."
    },
    {
      id: 39,
      question: "Which dividend date requires a journal entry on the corporation's books?",
      options: {
        A: "Date of declaration",
        B: "Date of record",
        C: "Date of stockholder meeting",
        D: "Date of incorporation"
      },
      correctAnswer: 'A',
      explanation: "On the date of declaration, the board of directors formally announces the dividend. This action creates a legal liability for the corporation, requiring a journal entry to debit Retained Earnings and credit Dividends Payable."
    },
    {
      id: 40,
      question: "Which of the following would be included in a partnership agreement?",
      options: {
        A: "Number of employees",
        B: "Division of net income and losses",
        C: "Depreciation method to be used",
        D: "Type of business license required"
      },
      correctAnswer: 'B',
      explanation: "A partnership agreement is a contract between partners. A fundamental element of this contract is how profits and losses will be divided among the partners, which may not necessarily be based on their capital contributions."
    },
    {
      id: 41,
      question: "When a partner contributes a non-cash asset to a partnership, it should be recorded at:",
      options: {
        A: "Historical cost",
        B: "Fair market value",
        C: "Salvage value",
        D: "Appraised value minus depreciation"
      },
      correctAnswer: 'B',
      explanation: "To ensure equity among partners, a contributed non-cash asset is recorded at its fair market value on the date it is contributed to the partnership. This value is agreed upon by all partners."
    },
    {
      id: 42,
      question: "Which of the following actions would violate the AICPA Code of Professional Conduct?",
      options: {
        A: "Preparing a client's tax return",
        B: "Charging an hourly rate for audit work",
        C: "Disclosing client financial data without consent",
        D: "Preparing financial forecasts"
      },
      correctAnswer: 'C',
      explanation: "The AICPA Code of Professional Conduct includes a rule on confidential client information. Disclosing this information without specific consent from the client is a major violation of ethical standards, unless there is a legal or professional duty to do so."
    },
    {
      id: 43,
      question: "Which law protects whistleblowers who report fraudulent accounting practices?",
      options: {
        A: "Sherman Antitrust Act",
        B: "Sarbanes-Oxley Act",
        C: "Securities Act of 1933",
        D: "Dodd-Frank Act"
      },
      correctAnswer: 'B',
      explanation: "The Sarbanes-Oxley Act of 2002 (SOX) contains specific provisions that protect employees of public companies who act as whistleblowers and report suspected fraud."
    },
    {
      id: 44,
      question: "Which ratio best measures a company's ability to meet short-term obligations?",
      options: {
        A: "Price-to-Earnings Ratio",
        B: "Current Ratio",
        C: "Debt-to-Equity Ratio",
        D: "Return on Equity"
      },
      correctAnswer: 'B',
      explanation: "The Current Ratio (Current Assets / Current Liabilities) is a primary liquidity ratio. It measures a company's ability to pay its short-term debts with its short-term assets."
    },
    {
      id: 45,
      question: "Which financial statement shows the profitability of a company over a specific period?",
      options: {
        A: "Balance Sheet",
        B: "Statement of Retained Earnings",
        C: "Income Statement",
        D: "Statement of Cash Flows"
      },
      correctAnswer: 'C',
      explanation: "The Income Statement summarizes a company's revenues and expenses over a period of time (e.g., a month, quarter, or year), resulting in its net income or loss, which is a measure of profitability."
    },
    {
      id: 46,
      question: "What is the correct order of the steps in the accounting cycle?",
      options: {
        A: "Journalize, post, prepare trial balance, prepare financial statements",
        B: "Post, journalize, adjust entries, prepare financial statements",
        C: "Prepare financial statements, post, journalize, prepare trial balance",
        D: "Adjust entries, journalize, post, prepare financial statements"
      },
      correctAnswer: 'A',
      explanation: "The core sequence of the accounting cycle is: 1) Analyze and Journalize transactions, 2) Post to the general ledger, 3) Prepare an unadjusted trial balance, 4) Prepare adjusting entries, 5) Prepare an adjusted trial balance, 6) Prepare financial statements, and 7) Close temporary accounts."
    },
    {
      id: 47,
      question: "Which of the following errors will not affect the trial balance totals?",
      options: {
        A: "Posting a debit as a credit",
        B: "Omitting a transaction entirely",
        C: "Recording a transaction in the wrong account",
        D: "Recording unequal debits and credits"
      },
      correctAnswer: 'C',
      explanation: "If a transaction is recorded with the correct debit and credit amounts but posted to the wrong account (e.g., debiting Supplies instead of Prepaid Rent), the total debits will still equal the total credits, and the trial balance will still balance. The error is one of classification, not arithmetic."
    },
    {
      id: 48,
      question: "In a periodic inventory system, the cost of goods sold is calculated:",
      options: {
        A: "After each sale",
        B: "At the end of the accounting period",
        C: "When goods are purchased",
        D: "Every time physical inventory is counted"
      },
      correctAnswer: 'B',
      explanation: "Under a periodic system, inventory and Cost of Goods Sold (COGS) are not updated continuously. COGS is calculated only at the end of the period using a formula: Beginning Inventory + Net Purchases - Ending Inventory = COGS."
    },
    {
      id: 49,
      question: "Which of the following is not included in the cost of inventory under the periodic system?",
      options: {
        A: "Freight-in",
        B: "Purchase returns",
        C: "Purchase discounts",
        D: "Freight-out"
      },
      correctAnswer: 'D',
      explanation: "Freight-out (or delivery expense) is the cost of shipping goods to a customer. This is a selling expense, not a cost of acquiring or preparing inventory for sale. Freight-in, however, is part of inventory cost."
    },
    {
      id: 50,
      question: "A variance in budgeting refers to:",
      options: {
        A: "A delay in preparing a budget",
        B: "A difference between actual and budgeted figures",
        C: "An error in the accounting ledger",
        D: "An adjustment made to fixed assets"
      },
      correctAnswer: 'B',
      explanation: "Variance analysis is a key budgeting tool. A variance is simply the difference between an actual amount and the budgeted or standard amount. They are classified as favorable or unfavorable."
    },
    {
      id: 51,
      question: "Which type of analysis compares financial data over several periods?",
      options: {
        A: "Vertical analysis",
        B: "Ratio analysis",
        C: "Horizontal analysis",
        D: "Break-even analysis"
      },
      correctAnswer: 'C',
      explanation: "Horizontal analysis (or trend analysis) looks at financial statement data across multiple time periods (e.g., comparing revenue growth year-over-year). It focuses on changes in dollar amounts and percentages over time."
    },
    {
      id: 52,
      question: "What is the primary purpose of an aging schedule?",
      options: {
        A: "To identify errors in payroll",
        B: "To track the status of inventory",
        C: "To estimate uncollectible accounts",
        D: "To allocate depreciation expense"
      },
      correctAnswer: 'C',
      explanation: "An accounts receivable aging schedule categorizes customer balances based on how long they have been outstanding. This analysis is used to estimate the amount of uncollectible accounts for the period, which is the basis for the adjusting entry for bad debt expense."
    },
    {
      id: 53,
      question: "If a note receivable is dishonored, the payee should:",
      options: {
        A: "Write off the amount immediately",
        B: "Reverse the original sales transaction",
        C: "Transfer the amount to accounts receivable",
        D: "Notify the bank for a chargeback"
      },
      correctAnswer: 'C',
      explanation: "When a note is dishonored (not paid at maturity), the holder of the note should remove the Note Receivable from the books and transfer the full amount (principal + any accrued interest) to an Accounts Receivable account from the maker, as the debt is still owed."
    },
    {
      id: 54,
      question: "Which form is issued to employees annually to summarize their earnings and tax withholdings?",
      options: {
        A: "W-2",
        B: "W-4",
        C: "1099-NEC",
        D: "1040"
      },
      correctAnswer: 'A',
      explanation: "Form W-2, the Wage and Tax Statement, is provided by employers to employees and the IRS after the end of the year. It summarizes the employee's total annual earnings and the amounts withheld for taxes (federal income, Social Security, Medicare)."
    },
    {
      id: 55,
      question: "Net pay is equal to:",
      options: {
        A: "Gross pay plus taxes",
        B: "Gross pay minus voluntary deductions",
        C: "Gross pay minus taxes and other deductions",
        D: "Payroll tax liability of the employer"
      },
      correctAnswer: 'C',
      explanation: "Net pay is the amount of the paycheck the employee actually gets to take home. It is calculated as Gross Pay (total earnings) minus all mandatory and voluntary deductions (e.g., income taxes, FICA, health insurance, retirement contributions)."
    },
    {
      id: 56,
      question: "The book value of a long-term asset is calculated as:",
      options: {
        A: "Historical cost + salvage value",
        B: "Salvage value - accumulated depreciation",
        C: "Historical cost - accumulated depreciation",
        D: "Replacement cost - salvage value"
      },
      correctAnswer: 'C',
      explanation: "Book value (or carrying value) represents the net amount of the asset reported on the balance sheet. It is the original historical cost of the asset minus the total accumulated depreciation recorded to date."
    },
    {
      id: 57,
      question: "Which of the following would not be capitalized as part of the cost of equipment?",
      options: {
        A: "Sales tax",
        B: "Delivery fees",
        C: "Installation costs",
        D: "Annual maintenance fees"
      },
      correctAnswer: 'D',
      explanation: "Costs to acquire and prepare an asset for use are capitalized (added to its cost). However, annual maintenance fees are recurring costs incurred to maintain the asset's operating efficiency and are expensed as incurred in the period they are paid."
    },
    {
      id: 58,
      question: "A company repurchases its own stock. This transaction is recorded as:",
      options: {
        A: "A reduction in assets",
        B: "An increase in liabilities",
        C: "Treasury stock, a contra-equity account",
        D: "An increase in retained earnings"
      },
      correctAnswer: 'C',
      explanation: "When a company buys back its own shares, the cost of the repurchased stock is recorded in a contra-equity account called Treasury Stock. This account has a normal debit balance and is subtracted from total stockholders' equity on the balance sheet. It represents a reduction of equity."
    }
  ],
  'business-law': [
    {
      id: 1,
      question: "What are the essential elements of a valid contract?",
      options: {
        A: "Offer and acceptance only",
        B: "Offer, acceptance, consideration, and legal capacity",
        C: "Written agreement and signatures",
        D: "Witnesses and notarization"
      },
      correctAnswer: 'B',
      explanation: "A valid contract requires four essential elements: offer, acceptance, consideration (something of value exchanged), and legal capacity of the parties."
    },
    {
      id: 2,
      question: "What is a tort?",
      options: {
        A: "A type of contract",
        B: "A criminal offense",
        C: "A civil wrong causing harm to another",
        D: "A business license"
      },
      correctAnswer: 'C',
      explanation: "A tort is a civil wrong that causes harm to another person or their property, resulting in legal liability for the person who commits the tortious act."
    },
    {
      id: 3,
      question: "Which type of business organization provides limited liability to its owners?",
      options: {
        A: "Sole Proprietorship",
        B: "General Partnership",
        C: "Corporation",
        D: "All of the above"
      },
      correctAnswer: 'C',
      explanation: "A corporation provides limited liability protection to its shareholders, meaning their personal assets are generally protected from business debts and liabilities."
    },
    {
      id: 4,
      question: "What is intellectual property?",
      options: {
        A: "Physical property owned by businesses",
        B: "Creations of the mind protected by law",
        C: "Financial investments",
        D: "Real estate holdings"
      },
      correctAnswer: 'B',
      explanation: "Intellectual property refers to creations of the mind, such as inventions, literary works, designs, and symbols, that are protected by patents, copyrights, and trademarks."
    },
    {
      id: 5,
      question: "What constitutes breach of contract?",
      options: {
        A: "Failure to perform obligations as agreed",
        B: "Requesting contract modifications",
        C: "Paying late fees",
        D: "Verbal disagreements"
      },
      correctAnswer: 'A',
      explanation: "Breach of contract occurs when one party fails to perform their obligations as specified in the contract agreement."
    }
  ]
};

export default function PracticeTestPage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { toast } = useToast();

  const currentQuestions = selectedEvent ? questionBanks[selectedEvent] || [] : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (testStartTime && !showResults) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date().getTime() - testStartTime.getTime()) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [testStartTime, showResults]);

  // Keyboard navigation
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (showResults) return;

    const key = event.key.toLowerCase();
    
    // Answer selection
    if (['a', 'b', 'c', 'd'].includes(key)) {
      setSelectedAnswer(key.toUpperCase() as 'A' | 'B' | 'C' | 'D');
    }
    
    // Navigation
    if ((key === ' ' || key === 'enter') && selectedAnswer) {
      event.preventDefault();
      handleNextQuestion();
    }
  }, [selectedAnswer, showResults]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startTest = () => {
    if (!selectedEvent) {
      toast({
        title: 'Please Select an Event',
        description: 'Choose an FBLA event to begin your practice test.',
        variant: 'destructive'
      });
      return;
    }

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(currentQuestions.length).fill(null));
    setShowResults(false);
    setTestStartTime(new Date());
    setElapsedTime(0);
  };

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      endTest(newAnswers);
    }
  };

  const endTest = (finalAnswers?: (string | null)[]) => {
    const answers = finalAnswers || userAnswers;
    if (selectedAnswer && currentQuestionIndex < currentQuestions.length) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newAnswers);
    }
    setShowResults(true);
  };

  const calculateResults = (): { score: number; percentage: number; results: TestResult[] } => {
    const results: TestResult[] = currentQuestions.map((question, index) => {
      const userAnswer = userAnswers[index] as 'A' | 'B' | 'C' | 'D' | null;
      const isCorrect = userAnswer === question.correctAnswer;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const score = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((score / currentQuestions.length) * 100);

    return { score, percentage, results };
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTest = () => {
    setSelectedEvent('');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setTestStartTime(null);
    setElapsedTime(0);
  };

  if (showResults) {
    const { score, percentage, results } = calculateResults();
    
    return (
      <PageLayout
        title="Practice Test Results"
        subtitle={`${events.find(e => e.id === selectedEvent)?.name} - Test Complete`}
      >
        <div className="practice-test-container">
          <div className="results-header">
            <StyledCard className="results-summary">
              <div className="results-stats">
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-percentage">{percentage}%</span>
                  </div>
                  <div className="score-details">
                    <div className="score-text">
                      {score} out of {currentQuestions.length} correct
                    </div>
                    <div className="time-text">
                      Completed in {formatTime(elapsedTime)}
                    </div>
                  </div>
                </div>
                <Button onClick={resetTest} className="restart-button">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Another Test
                </Button>
              </div>
            </StyledCard>
          </div>

          <div className="results-breakdown">
            <h3 className="breakdown-title">Question Review</h3>
            {results.map((result, index) => (
              <StyledCard key={result.questionId} className={`result-card ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  <span className="question-number">Question {index + 1}</span>
                  {result.isCorrect ? (
                    <CheckCircle className="result-icon correct-icon" />
                  ) : (
                    <XCircle className="result-icon incorrect-icon" />
                  )}
                </div>
                
                <div className="result-question">
                  {result.question}
                </div>
                
                <div className="result-answers">
                  <div className={`answer-display ${result.userAnswer ? (result.isCorrect ? 'correct-answer' : 'incorrect-answer') : 'no-answer'}`}>
                    <span className="answer-label">Your Answer:</span>
                    <span className="answer-value">
                      {result.userAnswer ? `${result.userAnswer}` : 'No answer selected'}
                    </span>
                  </div>
                  
                  {!result.isCorrect && (
                    <div className="answer-display correct-answer">
                      <span className="answer-label">Correct Answer:</span>
                      <span className="answer-value">{result.correctAnswer}</span>
                    </div>
                  )}
                </div>
                
                <div className="result-explanation">
                  <strong>Explanation:</strong> {result.explanation}
                </div>
              </StyledCard>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!selectedEvent || currentQuestions.length === 0) {
    return (
      <PageLayout
        title="Practice Test"
        subtitle="Test your knowledge with FBLA competitive event practice questions"
      >
        <div className="practice-test-container">
          <StyledCard className="event-selection-card">
            <div className="selection-content">
              <div className="selection-header">
                <BookOpen className="selection-icon" />
                <h3 className="selection-title">Choose Your Test Event</h3>
              </div>
              
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="event-select">
                  <SelectValue placeholder="Select an FBLA event to test" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={startTest} className="start-test-button" disabled={!selectedEvent}>
                <Target className="w-4 h-4 mr-2" />
                Start Practice Test
              </Button>
              
              {selectedEvent && currentQuestions.length > 0 && (
                <div className="test-preview">
                  <p className="preview-text">
                    This test contains <strong>{currentQuestions.length} questions</strong> about {events.find(e => e.id === selectedEvent)?.name}.
                  </p>
                  <p className="preview-instructions">
                    Use A/B/C/D keys or click to select answers. Press Space or Enter to continue.
                  </p>
                </div>
              )}
            </div>
          </StyledCard>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${events.find(e => e.id === selectedEvent)?.name} Practice Test`}
      subtitle={`Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`}
    >
      <div className="practice-test-container">
        {/* Header with progress and controls */}
        <div className="test-header">
          <div className="test-progress">
            <Progress 
              value={(currentQuestionIndex / currentQuestions.length) * 100} 
              className="progress-bar"
            />
            <div className="progress-info">
              <span className="progress-text">
                {currentQuestionIndex + 1} / {currentQuestions.length}
              </span>
              <div className="test-timer">
                <Clock className="timer-icon" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
          
          <Button onClick={() => endTest()} variant="destructive" className="end-test-button">
            End Test
          </Button>
        </div>

        {/* Question Card */}
        <StyledCard className="question-card">
          <div className="question-content">
            <div className="question-header">
              <span className="question-number">Question {currentQuestionIndex + 1}</span>
            </div>
            
            <h2 className="question-text">{currentQuestion.question}</h2>
            
            <div className="answer-options">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  className={`answer-option ${selectedAnswer === key ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(key as 'A' | 'B' | 'C' | 'D')}
                >
                  <span className="option-letter">{key}</span>
                  <span className="option-text">{value}</span>
                </button>
              ))}
            </div>
            
            <div className="question-navigation">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="next-button"
              >
                {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
              </Button>
            </div>
            
            <div className="keyboard-hint">
              Press A/B/C/D to select • Space/Enter to continue
            </div>
          </div>
        </StyledCard>
      </div>
    </PageLayout>
  );
}