import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PageLayout } from '@/components/shared/PageLayout';
import { StyledCard } from '@/components/shared/StyledCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import type { Question, Event } from '@shared/schema';

// Transform database Question to component format
interface ComponentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PracticeEvent extends Event {
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

// Explanation mapping for Accounting II questions
const accountingIIExplanations: Record<string, string> = {
  "A company issues 5,000 shares of $10 par common stock for $75,000. What amount is credited to the Paid-in Capital in Excess of Par account?": "The total cash received is $75,000. The par value of the shares is calculated as 5,000 shares × $10 par = $50,000. The excess amount paid over par is $75,000 - $50,000 = $25,000. This excess is credited to the Paid-in Capital in Excess of Par account.",
  "Which of the following accounts would not appear on the post-closing trial balance?": "The post-closing trial balance only contains permanent accounts (assets, liabilities, and equity). Sales Revenue is a temporary account (revenue) that is closed to Retained Earnings at the end of the accounting period, so it will have a zero balance and not appear on the post-closing trial balance.",
  "Using the FIFO method, what is the cost of goods sold if 80 units are sold from inventory with the following: 40 units at $20, 50 units at $22, 60 units at $24?": "Under FIFO (First-In, First-Out), the oldest units are sold first. To find the cost of 80 units: Sell the first 40 units @ $20 = $800. Sell the next 40 units from the following purchase @ $22 = $880. Total Cost of Goods Sold = $800 + $880 = $1,680.",
  "Which transaction increases both assets and liabilities?": "Purchasing supplies increases the asset account 'Supplies'. Purchasing them \"on account\" means you haven't paid yet, which increases the liability account 'Accounts Payable'.",
  "The current ratio is 2.5. If current liabilities total $40,000, what are current assets?": "The current ratio formula is Current Assets / Current Liabilities = 2.5. Plugging in the known value: Current Assets / $40,000 = 2.5. Therefore, Current Assets = 2.5 × $40,000 = $100,000.",
  "A flexible budget is best used to:": "A flexible budget adjusts or \"flexes\" for changes in actual volume or activity levels. This allows managers to compare actual results to what the budget should have been at that level of activity, making it an excellent tool for performance evaluation.",
  "If a partner contributes non-cash assets to a partnership, at what amount are they recorded?": "When a partner contributes a non-cash asset, it is recorded at its fair market value on the date of contribution. This value must be agreed upon by all partners to ensure equity in the partnership.",
  "The company has the following balances: Net Income: $20,000; Dividends Paid: $5,000; Beginning Retained Earnings: $40,000. What is the ending retained earnings?": "The formula for Ending Retained Earnings is: Beginning Retained Earnings + Net Income - Dividends Paid. $40,000 + $20,000 - $5,000 = $55,000.",
  "Which cost would be considered indirect labor in a manufacturing firm?": "Indirect labor is the cost of employees who are necessary for the manufacturing process but are not directly involved in hands-on production of the product. A supervisor's salary fits this description, unlike the wages of a factory line worker or raw materials handler (direct labor).",
  "In accrual accounting, when should revenue be recorded?": "The core principle of accrual accounting is the revenue recognition principle. This principle states that revenue should be recorded when it is earned (i.e., when the service is performed or the good is delivered), regardless of when the cash is actually received.",
  "A corporation declares a 10% stock dividend when there are 100,000 shares outstanding, and the market value is $30/share. The par value is $1. What is the total amount transferred from retained earnings?": "A stock dividend is based on the market value of the stock. The number of new shares issued is 10% of 100,000 = 10,000 shares. The total amount transferred from Retained Earnings to equity accounts is 10,000 shares × $30 market value per share = $300,000.",
  "Which type of depreciation would result in the highest expense in the first year?": "The declining balance method is an accelerated depreciation method. It calculates depreciation based on a fixed percentage of the asset's book value, which is highest in the first year, resulting in a larger depreciation expense upfront compared to straight-line or units-of-production.",
  "A factory incurs $5,000 in direct materials, $2,500 in direct labor, and $1,500 in overhead. What is the cost of goods manufactured?": "The cost of goods manufactured is the total cost of all goods completed during the period. It is calculated as: Direct Materials + Direct Labor + Manufacturing Overhead. $5,000 + $2,500 + $1,500 = $9,000.",
  "Which ratio best indicates how efficiently a company is using its assets to generate profit?": "Return on Assets (ROA) is calculated as Net Income / Average Total Assets. It measures how profitably a company uses its assets to generate earnings, making it a key efficiency ratio.",
  "What is the main difference between LIFO and FIFO during periods of rising prices?": "In a period of rising prices, LIFO (Last-In, First-Out) assigns the most recent, higher costs to Cost of Goods Sold (COGS). This higher COGS results in a lower gross profit and, consequently, a lower net income compared to FIFO.",
  "Which of the following is not part of cash flows from operating activities?": "Operating activities are related to a company's core business operations (e.g., selling goods, providing services). The purchase of equipment is an investment in long-term assets and is classified as an investing activity on the statement of cash flows.",
  "A business pays $12,000 in rent covering 12 months. After two months, what is the balance in the Prepaid Rent account?": "The monthly rent is $12,000 / 12 months = $1,000 per month. After 2 months, 2 months' worth of expense has been recorded, leaving 10 months of rent still prepaid. The balance in the Prepaid Rent (asset) account is 10 months × $1,000 = $10,000.",
  "Which method best allocates overhead based on multiple cost drivers?": "Activity-based costing (ABC) is a precise method that identifies key activities in a process and assigns overhead costs to products based on the products' consumption of each activity, using multiple cost drivers.",
  "An accounts receivable aging report shows $1,500 in likely uncollectible accounts. The current Allowance for Doubtful Accounts has a $200 credit balance. What is the required adjustment?": "The aging report indicates the desired ending balance in the Allowance for Doubtful Accounts should be a $1,500 credit. Since there is already a $200 credit balance, only an additional $1,300 is needed to reach the desired balance. The adjusting entry is a debit to Bad Debt Expense and a credit to Allowance for Doubtful Accounts for $1,300.",
  "When recording payroll, the employer portion of FICA taxes is recorded as:": "The employer's share of FICA (Social Security and Medicare) taxes is an additional expense to the company, separate from the wages earned by the employee. It is recorded as a debit to an expense account (e.g., Payroll Tax Expense) and a credit to a liability account (e.g., FICA Taxes Payable) until it is paid.",
  "What is the primary purpose of adjusting entries in the accounting cycle?": "Adjusting entries are made at the end of an accounting period to ensure that revenues are recorded in the period they are earned and expenses are recorded in the period they are incurred (matching principle). This updates balance sheet and income statement accounts so the financial statements reflect the correct financial position and performance.",
  "Which of the following accounts would typically require an adjusting entry?": "Prepaid Insurance is an asset that expires over time. An adjusting entry is needed to recognize the portion of the prepaid asset that has expired (i.e., insurance expense for the period).",
  "Under the perpetual inventory system, what entry is made when merchandise is sold?": "In a perpetual system, two entries are made at the point of sale: 1) To record the sale and receivable/revenue, and 2) To simultaneously update the inventory record and recognize the cost of the goods that were sold.",
  "Which inventory costing method results in the highest net income during a period of rising prices?": "In rising prices, FIFO (First-In, First-Out) assigns the oldest, lowest costs to Cost of Goods Sold. This results in a lower COGS, a higher gross profit, and consequently, the highest net income compared to LIFO or weighted average.",
  "What is the primary purpose of a flexible budget?": "A flexible budget is designed to adjust or \"flex\" based on changes in actual activity levels (e.g., units produced, units sold). It shows what revenues and costs should have been at the actual level of activity, which is crucial for accurate performance evaluation.",
  "Which of the following is not typically included in a master budget?": "A master budget is a comprehensive set of future budgeted financial statements and supporting schedules (sales, production, etc.). A trial balance is an actual internal accounting report from the general ledger, not a budget.",
  "Which document authorizes a payment to a vendor?": "A voucher is an internal document, often part of a voucher system, that summarizes the supporting documents (invoice, purchase order, receiving report) and is used to authorize payment to a vendor.",
  "A company uses the allowance method for bad debts. What entry is made when an account is written off?": "Writing off a specific uncollectible account removes the receivable from the books. Since the loss was already estimated and recorded via the Allowance account, the write-off entry reduces both the Allowance (a contra-asset) and the Accounts Receivable (an asset). There is no expense recorded at the time of write-off.",
  "Which tax is only paid by the employer and not withheld from the employee's paycheck?": "Federal Unemployment Tax Act (FUTA) tax is paid solely by the employer to fund state unemployment agencies. It is not deducted from an employee's wages.",
  "What is the purpose of a Form W-4?": "Form W-4, the Employee's Withholding Certificate, is completed by the employee. It provides the employer with information (like filing status and number of allowances) to calculate how much federal income tax to withhold from the employee's paycheck.",
  "Which depreciation method results in higher depreciation expense in the earlier years of an asset's life?": "The declining-balance method is an accelerated depreciation method. It applies a constant depreciation rate to the asset's declining book value each year, resulting in higher expenses in the early years and lower expenses in the later years.",
  "When a company disposes of an asset for more than its book value, what is the result?": "The book value is Cost - Accumulated Depreciation. If the cash received from the sale is greater than the book value, the company has sold the asset for more than its accounting value, resulting in a gain.",
  "Which of the following accounts is affected when a company issues common stock for cash?": "When stock is issued for cash, the Common Stock account is credited for the par value of the shares. The amount received above par value is credited to Additional Paid-in Capital.",
  "Which dividend date requires a journal entry on the corporation's books?": "On the date of declaration, the board of directors formally announces the dividend. This action creates a legal liability for the corporation, requiring a journal entry to debit Retained Earnings and credit Dividends Payable.",
  "Which of the following would be included in a partnership agreement?": "A partnership agreement is a contract between partners. A fundamental element of this contract is how profits and losses will be divided among the partners, which may not necessarily be based on their capital contributions.",
  "When a partner contributes a non-cash asset to a partnership, it should be recorded at:": "To ensure equity among partners, a contributed non-cash asset is recorded at its fair market value on the date it is contributed to the partnership. This value is agreed upon by all partners.",
  "Which of the following actions would violate the AICPA Code of Professional Conduct?": "The AICPA Code of Professional Conduct includes a rule on confidential client information. Disclosing this information without specific consent from the client is a major violation of ethical standards, unless there is a legal or professional duty to do so.",
  "Which law protects whistleblowers who report fraudulent accounting practices?": "The Sarbanes-Oxley Act of 2002 (SOX) contains specific provisions that protect employees of public companies who act as whistleblowers and report suspected fraud.",
  "Which ratio best measures a company's ability to meet short-term obligations?": "The Current Ratio (Current Assets / Current Liabilities) is a primary liquidity ratio. It measures a company's ability to pay its short-term debts with its short-term assets.",
  "Which financial statement shows the profitability of a company over a specific period?": "The Income Statement summarizes a company's revenues and expenses over a period of time (e.g., a month, quarter, or year), resulting in its net income or loss, which is a measure of profitability.",
  "What is the correct order of the steps in the accounting cycle?": "The core sequence of the accounting cycle is: 1) Analyze and Journalize transactions, 2) Post to the general ledger, 3) Prepare an unadjusted trial balance, 4) Prepare adjusting entries, 5) Prepare an adjusted trial balance, 6) Prepare financial statements, and 7) Close temporary accounts.",
  "Which of the following errors will not affect the trial balance totals?": "If a transaction is recorded with the correct debit and credit amounts but posted to the wrong account (e.g., debiting Supplies instead of Prepaid Rent), the total debits will still equal the total credits, and the trial balance will still balance. The error is one of classification, not arithmetic.",
  "In a periodic inventory system, the cost of goods sold is calculated:": "Under a periodic system, inventory and Cost of Goods Sold (COGS) are not updated continuously. COGS is calculated only at the end of the period using a formula: Beginning Inventory + Net Purchases - Ending Inventory = COGS.",
  "Which of the following is not included in the cost of inventory under the periodic system?": "Freight-out (or delivery expense) is the cost of shipping goods to a customer. This is a selling expense, not a cost of acquiring or preparing inventory for sale. Freight-in, however, is part of inventory cost.",
  "A variance in budgeting refers to:": "Variance analysis is a key budgeting tool. A variance is simply the difference between an actual amount and the budgeted or standard amount. They are classified as favorable or unfavorable.",
  "Which type of analysis compares financial data over several periods?": "Horizontal analysis (or trend analysis) looks at financial statement data across multiple time periods (e.g., comparing revenue growth year-over-year). It focuses on changes in dollar amounts and percentages over time.",
  "What is the primary purpose of an aging schedule?": "An accounts receivable aging schedule categorizes customer balances based on how long they have been outstanding. This analysis is used to estimate the amount of uncollectible accounts for the period, which is the basis for the adjusting entry for bad debt expense.",
  "If a note receivable is dishonored, the payee should:": "When a note is dishonored (not paid at maturity), the holder of the note should remove the Note Receivable from the books and transfer the full amount (principal + any accrued interest) to an Accounts Receivable account from the maker, as the debt is still owed.",
  "Which form is issued to employees annually to summarize their earnings and tax withholdings?": "Form W-2, the Wage and Tax Statement, is provided by employers to employees and the IRS after the end of the year. It summarizes the employee's total annual earnings and the amounts withheld for taxes (federal income, Social Security, Medicare).",
  "Net pay is equal to:": "Net pay is the amount of the paycheck the employee actually gets to take home. It is calculated as Gross Pay (total earnings) minus all mandatory and voluntary deductions (e.g., income taxes, FICA, health insurance, retirement contributions).",
  "The book value of a long-term asset is calculated as:": "Book value (or carrying value) represents the net amount of the asset reported on the balance sheet. It is the original historical cost of the asset minus the total accumulated depreciation recorded to date.",
  "Which of the following would not be capitalized as part of the cost of equipment?": "Costs to acquire and prepare an asset for use are capitalized (added to its cost). However, annual maintenance fees are recurring costs incurred to maintain the asset's operating efficiency and are expensed as incurred in the period they are paid.",
  "A company repurchases its own stock. This transaction is recorded as:": "When a company buys back its own shares, the cost of the repurchased stock is recorded in a contra-equity account called Treasury Stock. This account has a normal debit balance and is subtracted from total stockholders' equity on the balance sheet. It represents a reduction of equity.",
  
  // Questions 54-100 explanations
  "When declaring a cash dividend, which account is debited?": "Declaring a cash dividend reduces the company's retained earnings (the pool of profits available for distribution). The entry is a debit to Retained Earnings and a credit to Dividends Payable.",
  "How are profits typically divided in the absence of a partnership agreement?": "The Uniform Partnership Act, which governs partnerships in the absence of a specific agreement, states that profits and losses are to be shared equally among the partners, regardless of their capital contributions or time invested.",
  "If a partner withdraws from a partnership, the remaining partners must:": "When a partner leaves, the old partnership is legally dissolved. To ensure fairness in the final settlement with the withdrawing partner, the partnership's assets and liabilities are revalued to their current fair market value. This establishes the true worth of the partner's capital balance.",
  "Which organization issues the Generally Accepted Accounting Principles (GAAP) in the U.S.?": "The Financial Accounting Standards Board (FASB) is the private, non-profit organization responsible for establishing and improving financial accounting and reporting standards (GAAP) for public and private companies in the United States.",
  "Which of the following is considered unethical in accounting?": "The revenue recognition principle requires that revenue be recorded in the period it is earned. Intentionally delaying revenue recognition to manipulate financial results (e.g., to smooth income) is a violation of ethical standards and accounting principles.",
  "Which financial statement reports a company's assets and liabilities at a specific point in time?": "The Balance Sheet (or Statement of Financial Position) is a snapshot of a company's assets, liabilities, and equity at a specific point in time, such as the end of a quarter or year.",
  "Return on equity (ROE) is calculated by dividing net income by:": "Return on Equity (ROE) measures profitability relative to shareholders' investment. The formula is Net Income / Average Stockholders' Equity. Using the average equity accounts for changes that occurred during the period.",
  "Which of the following accounts would normally have a credit balance?": "Revenue accounts, like Sales Revenue, have normal credit balances because they increase equity. Assets (like Accounts Receivable, Supplies, and Cash) have normal debit balances.",
  "What type of account is Unearned Revenue?": "Unearned Revenue represents cash received from a customer for services or goods not yet provided. Because the company has an obligation (a liability) to deliver the product or service in the future, it is classified as a liability.",
  "Which inventory costing method tends to result in higher income during periods of rising prices?": "During rising prices, FIFO (First-In, First-Out) assigns the oldest, lowest costs to Cost of Goods Sold. This results in a lower COGS and a higher reported net income compared to other methods like LIFO.",
  "If ending inventory is overstated, what is the impact on net income?": "The formula for Cost of Goods Sold is: Beginning Inventory + Purchases - Ending Inventory. If Ending Inventory is overstated, COGS is understated. If COGS is understated, Net Income is overstated.",
  "Break-even point is the level of sales at which:": "The break-even point is the exact sales volume where a company's total revenues equal its total expenses, resulting in zero profit or loss.",
  "The formula for computing contribution margin is:": "Contribution Margin is the amount of revenue remaining after subtracting all variable costs. It is the amount that \"contributes\" to covering fixed costs and generating profit.",
  "A company uses the allowance method to account for uncollectible accounts. What is the journal entry to write off a specific account?": "When a specific customer account is deemed uncollectible, it is written off. This entry reduces both the Allowance for Doubtful Accounts (the estimate) and Accounts Receivable (the specific asset). No expense is recorded at the time of write-off under the allowance method.",
  "Which of the following documents initiates the accounts payable process?": "The purchase order is the document issued by the buyer to the vendor authorizing the purchase. It is the first document in the sequence that initiates the accounts payable process.",
  "Which of the following taxes is only paid by the employer?": "Federal Unemployment Tax (FUTA) is paid solely by the employer to fund state unemployment agencies. It is not withheld from the employee's wages.",
  "Which document is completed by an employee to indicate tax withholding preferences?": "Form W-4, the Employee's Withholding Certificate, is filled out by the employee upon hire. It provides information on filing status and allowances so the employer can calculate how much federal income tax to withhold.",
  "Depreciation expense is reported on which financial statement?": "Depreciation Expense is an operating expense and is reported on the Income Statement. The related accumulated depreciation account is reported on the Balance Sheet.",
  "Which depreciation method results in the same depreciation expense each year?": "The straight-line method allocates the depreciable cost of an asset evenly over its useful life, resulting in the same depreciation expense each full year.",
  "Preferred stock differs from common stock in that it typically:": "The key feature of preferred stock is that it usually pays a fixed dividend rate. Preferred stockholders typically do not have voting rights, unlike common stockholders.",
  "What is the effect of issuing common stock above par value?": "When stock is issued above par value, the Common Stock account is credited for the par value. The amount received above par is credited to Additional Paid-in Capital, which increases total paid-in capital.",
  "In a partnership, drawings by a partner:": "Drawings are withdrawals of assets from the partnership by a partner for personal use. These withdrawals reduce that partner's capital account balance.",
  "What happens when a new partner is admitted into an existing partnership?": "Legally, the admission of a new partner dissolves the old partnership and creates a new partnership entity. This often requires revaluation of assets and a new partnership agreement.",
  "Which of the following best describes ethical behavior in accounting?": "The cornerstone of ethical behavior in accounting is integrity, which involves being honest, candid, and free of conflicts of interest. This means providing financial information that is accurate and honest.",
  "The Sarbanes-Oxley Act was passed to:": "The Sarbanes-Oxley Act (SOX) of 2002 was enacted in response to major accounting scandals. Its primary goals are to prevent corporate accounting fraud and improve the accuracy and transparency of financial reporting.",
  "Which of the following is a measure of a company's liquidity?": "Liquidity refers to a company's ability to meet its short-term obligations. The Current Ratio (Current Assets / Current Liabilities) is a primary measure of liquidity.",
  "Which financial ratio is most useful in evaluating a company's ability to pay short-term obligations?": "The Quick (Acid-Test) Ratio is a more stringent measure of liquidity than the current ratio because it excludes less liquid current assets like inventory. It measures the ability to pay short-term obligations using only the most liquid assets (cash, marketable securities, and receivables).",
  "Which of the following entries is correct for purchasing supplies on account?": "Purchasing supplies increases the asset Supplies (debit) and creates a liability, Accounts Payable (credit), because the purchase was made \"on account\" (on credit).",
  "Adjusting entries are made:": "In the accounting cycle, adjusting entries are journalized and posted after the unadjusted trial balance is prepared but before the financial statements are created.",
  "Which of the following accounts is used in a perpetual inventory system?": "A key feature of a perpetual inventory system is that the Cost of Goods Sold account is updated continuously with each sale. Accounts like \"Purchases\" and \"Purchase Discounts\" are used in a periodic system.",
  "In a perpetual inventory system, when merchandise is returned by a customer, which accounts are affected?": "In a perpetual system, a sales return requires two entries: 1) Debit to Sales Returns & Allowances (a contra-revenue account) and a credit to Accounts Receivable/Cash, and 2) Debit to Inventory and a credit to Cost of Goods Sold (to reverse the cost of the sale).",
  "Which of the following would be considered a fixed cost?": "A fixed cost remains constant in total regardless of the level of production or sales activity (within a relevant range). Rent is a classic example. The other options are variable costs.",
  "If sales increase but fixed costs remain the same, what happens to operating leverage?": "Operating leverage measures the proportion of fixed costs in a company's cost structure. If sales increase while fixed costs stay the same, the percentage of fixed costs to total costs decreases, thereby reducing the degree of operating leverage.",
  "Which method of estimating uncollectible accounts emphasizes the balance sheet?": "The aging of receivables method focuses on estimating the desired ending balance for the Allowance for Doubtful Accounts (a balance sheet account) based on the age and collectibility of existing receivables.",
  "Trade credit terms of \"2/10, net 30\" mean:": "The terms \"2/10, net 30\" mean the buyer can take a 2% discount if the invoice is paid within 10 days. Otherwise, the full (net) amount is due in 30 days.",
  "The employer's portion of FICA taxes is recorded as:": "The employer's share of FICA (Social Security and Medicare) taxes is an additional expense to the company. It is debited to an expense account, typically called Payroll Tax Expense.",
  "Which of the following would not be included in gross wages?": "Gross wages represent total earnings before any deductions are subtracted. A 401(k) deduction is a voluntary deduction taken from gross wages to arrive at net pay. It is not part of the gross amount.",
  "Which of the following assets is not depreciated?": "Land is considered to have an indefinite useful life and its value typically does not decline over time (it may even appreciate). Therefore, it is not depreciated. All other listed assets have finite useful lives.",
  "When a company disposes of equipment at a gain, it should:": "If the cash received from the sale of an asset is greater than its book value, the company has a gain. This gain is recorded as a credit to an account such as Gain on Disposal of Equipment.",
  "Dividends declared but not yet paid are recorded as:": "When a company declares a dividend, it creates a legal obligation to pay shareholders. This obligation is recorded as a current liability called Dividends Payable until the payment is made.",
  "Which document authorizes the issuance of stock?": "The Articles of Incorporation is the legal document filed with the state that creates the corporation and specifies key details including the types and amounts of stock the corporation is authorized to issue.",
  "Which financial statement shows each partner's capital balance?": "The Statement of Partnership Equity (similar to a Statement of Stockholders' Equity for corporations) shows the changes in each partner's capital account during the period, including contributions, withdrawals, and their share of partnership income or loss.",
  "A partner contributes equipment to a new partnership. The equipment should be recorded at:": "When a partner contributes a non-cash asset to a partnership, it should be recorded at its current fair market value on the date of contribution. This ensures all partners receive fair credit for their contributions.",
  "Confidentiality in accounting refers to:": "Confidentiality is a fundamental principle in accounting ethics. It requires accountants to respect the confidentiality of information acquired as a result of professional relationships and not disclose any such information without proper authority or unless there is a legal or professional obligation to do so.",
  "An accountant who falsifies financial records is violating which principle?": "Integrity is the fundamental principle that requires accountants to be straightforward and honest in all professional and business relationships. Falsifying financial records is a direct violation of the integrity principle.",
  "Which financial statement shows cash inflows and outflows?": "The Statement of Cash Flows reports a company's cash receipts (inflows) and cash payments (outflows) during a specific period, organized into three categories: operating, investing, and financing activities.",
  "The primary purpose of financial statement analysis is to:": "Financial statement analysis involves examining and interpreting financial statements to evaluate a company's performance, financial position, and future prospects. This helps stakeholders make informed economic decisions about investing, lending, or other business relationships."
};

// Transform database question to component format
const transformQuestion = (dbQuestion: Question): ComponentQuestion => ({
  id: dbQuestion.id.toString(),
  question: dbQuestion.questionText,
  options: [dbQuestion.optionA, dbQuestion.optionB, dbQuestion.optionC, dbQuestion.optionD],
  correctAnswer: dbQuestion.correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0),
  explanation: accountingIIExplanations[dbQuestion.questionText] || `The correct answer is ${dbQuestion.correctAnswer}.`
});

// Event metadata mapping (icons, difficulty, category)
const eventMetadata: Record<string, { icon: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; category: string }> = {
  'Accounting I': { icon: '📊', difficulty: 'Intermediate', category: 'Finance' },
  'Accounting II': { icon: '🧮', difficulty: 'Advanced', category: 'Finance' },
  'Banking & Financial Systems': { icon: '🏦', difficulty: 'Intermediate', category: 'Finance' },
  'Business Management': { icon: '💼', difficulty: 'Intermediate', category: 'Management' },
  'Business Law': { icon: '⚖️', difficulty: 'Advanced', category: 'Legal' },
  'Client Service': { icon: '🤝', difficulty: 'Beginner', category: 'Communication' },
  'Economics': { icon: '📈', difficulty: 'Intermediate', category: 'Finance' },
  'Entrepreneurship': { icon: '🚀', difficulty: 'Advanced', category: 'Business' },
  'Introduction to Business Concepts': { icon: '📋', difficulty: 'Beginner', category: 'Business' },
  'Introduction to Financial Math': { icon: '🔢', difficulty: 'Beginner', category: 'Finance' },
  'Introduction to Marketing Concepts': { icon: '📢', difficulty: 'Beginner', category: 'Marketing' },
  'Introduction to Parliamentary Procedure': { icon: '🏛️', difficulty: 'Beginner', category: 'Leadership' },
  'Management Information Systems': { icon: '💻', difficulty: 'Advanced', category: 'Technology' },
  'Personal Finance': { icon: '💰', difficulty: 'Beginner', category: 'Finance' },
  'Securities & Investments': { icon: '📊', difficulty: 'Advanced', category: 'Finance' },
  'Business Ethics': { icon: '🎯', difficulty: 'Intermediate', category: 'Business' },
  'International Business': { icon: '🌍', difficulty: 'Advanced', category: 'Business' },
  'Marketing': { icon: '📈', difficulty: 'Intermediate', category: 'Marketing' },
  'Sports & Entertainment Marketing': { icon: '🎭', difficulty: 'Intermediate', category: 'Marketing' },
  'Hospitality Management': { icon: '🏨', difficulty: 'Intermediate', category: 'Management' },
  'Human Resource Management': { icon: '👥', difficulty: 'Intermediate', category: 'Management' },
  'Public Speaking': { icon: '🎤', difficulty: 'Beginner', category: 'Communication' },
  'Future Business Leader': { icon: '👑', difficulty: 'Intermediate', category: 'Leadership' },
  'Introduction to Event Planning': { icon: '📅', difficulty: 'Beginner', category: 'Management' },
  'Sales Presentation': { icon: '💡', difficulty: 'Intermediate', category: 'Communication' },
};

export default function PracticeModePage() {
  const [match, params] = useRoute('/practice/:eventId');
  const [, setLocation] = useLocation();
  const eventId = params?.eventId;
  
  // Create a session timestamp to force fresh data on each practice session
  const [sessionTimestamp] = useState(() => Date.now());
  
  // Fetch event details and questions from database
  const { data: event, isLoading: eventLoading, error: eventError } = useQuery<Event>({
    queryKey: ['/api/events', eventId],
    enabled: !!eventId
  });
  
  const { data: dbQuestions, isLoading: questionsLoading, error: questionsError } = useQuery<Question[]>({
    queryKey: ['/api/events', eventId, 'questions', sessionTimestamp],
    queryFn: async () => {
      const res = await fetch(`/api/events/${eventId}/questions`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error('Failed to fetch questions');
      }
      return await res.json();
    },
    enabled: !!eventId
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: number; correct: boolean }[]>([]);

  // Loading state for both event and questions
  const isLoading = eventLoading || questionsLoading;
  const error = eventError || questionsError;

  // Transform database questions to component format and combine event with metadata
  const questions: ComponentQuestion[] = dbQuestions ? dbQuestions.map(transformQuestion) : [];
  const practiceEvent: PracticeEvent | null = event ? {
    ...event,
    ...eventMetadata[event.name] || { icon: '📝', difficulty: 'Beginner' as const, category: 'General' }
  } : null;
  const currentQuestion = questions[currentQuestionIndex];
  
  // Debug logging for question state
  console.log('PracticeModePage render:', {
    eventId,
    currentQuestionIndex,
    questionsLength: questions.length,
    currentQuestionExists: !!currentQuestion,
    currentQuestionId: currentQuestion?.id,
    dbQuestionsLength: dbQuestions?.length,
    isLoading,
    error: !!error
  });

  // Reset state when component mounts or event changes
  useEffect(() => {
    console.log('Resetting practice state for eventId:', eventId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setPracticeComplete(false);
    setAnswers([]);
  }, [eventId]);

  // Validate currentQuestionIndex bounds when questions array changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      console.warn('Current question index out of bounds, resetting to 0:', {
        currentQuestionIndex,
        questionsLength: questions.length
      });
      setCurrentQuestionIndex(0);
    }
  }, [questions.length, currentQuestionIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or if practice is complete
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || practiceComplete) {
        return;
      }

      const key = event.key.toLowerCase();
      
      // Answer selection shortcuts (1-4 or A-D)
      if (['1', '2', '3', '4', 'a', 'b', 'c', 'd'].includes(key) && currentQuestion && !showFeedback) {
        event.preventDefault();
        let answerIndex: number;
        
        if (['1', '2', '3', '4'].includes(key)) {
          answerIndex = parseInt(key) - 1;
        } else {
          answerIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
        }
        
        if (answerIndex < (currentQuestion?.options?.length || 0)) {
          setSelectedAnswer(answerIndex);
        }
      }
      
      // Submit answer or go to next question
      if (key === 'enter' || key === ' ') {
        event.preventDefault();
        if (!showFeedback && selectedAnswer !== null) {
          handleSubmitAnswer();
        } else if (showFeedback) {
          handleNextQuestion();
        }
      }
      
      // End practice
      if (key === 'escape') {
        event.preventDefault();
        handleEndPractice();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, selectedAnswer, showFeedback, practiceComplete]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after feedback shown
    setSelectedAnswer(answerIndex);
  };

  // Handle answer submission and show immediate feedback
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Record the answer
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct
    }]);
  };

  // Handle moving to next question
  const handleNextQuestion = () => {
    console.log('handleNextQuestion called:', {
      currentQuestionIndex,
      questionsLength: questions.length,
      nextIndex: currentQuestionIndex + 1,
      hasNextQuestion: currentQuestionIndex < questions.length - 1,
      questions: questions.map(q => ({ id: q.id, question: q.question.substring(0, 50) + '...' }))
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      console.log('Moving to next question:', { nextIndex, nextQuestion: questions[nextIndex] });
      
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      console.log('Practice complete, finishing...');
      handleFinishPractice();
    }
  };

  // Handle ending practice early or finishing
  const handleEndPractice = () => {
    handleFinishPractice();
  };

  // Navigate to results page
  const handleFinishPractice = () => {
    // Save practice results to sessionStorage for results page with error handling
    if (!eventId || !practiceEvent) {
      console.error('Cannot save results: missing eventId or practiceEvent', { eventId, practiceEvent });
      return;
    }

    try {
      const resultsData = {
        eventId,
        eventName: practiceEvent.name,
        eventIcon: practiceEvent.icon,
        answers: answers.map(answer => {
          const question = questions.find(q => q.id === answer.questionId);
          return {
            questionId: answer.questionId,
            question: question?.question || '',
            selectedAnswer: answer.selectedAnswer,
            correctAnswer: question?.correctAnswer || 0,
            options: question?.options || [],
            explanation: question?.explanation || '',
            correct: answer.correct
          };
        }),
        completedAt: new Date().toISOString(),
        totalTime: undefined // Could add timer in future
      };
      
      console.log('Saving practice results for eventId:', eventId);
      console.log('Results data:', resultsData);
      
      // Store with error checking
      const storageKey = `practiceResults:${eventId}`;
      const serializedData = JSON.stringify(resultsData);
      sessionStorage.setItem(storageKey, serializedData);
      
      // Verify the data was stored correctly
      const storedData = sessionStorage.getItem(storageKey);
      if (!storedData) {
        console.error('Failed to store results data to sessionStorage');
        return;
      }
      
      console.log('Successfully stored results data, navigating to results page');
      
      // Add a small delay to ensure storage is complete before navigation
      setTimeout(() => {
        setLocation(`/practice/${eventId}/results`);
      }, 10);
      
    } catch (error) {
      console.error('Error saving practice results:', error);
      // Still navigate but user will see error page
      setLocation(`/practice/${eventId}/results`);
    }
  };

  // Handle restarting practice
  const handleRestartPractice = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setPracticeComplete(false);
    setAnswers([]);
  };

  // Handle returning to practice list
  const handleBackToPractice = () => {
    setLocation('/practice');
  };

  // Get difficulty color class
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageLayout
        title="Loading Practice..."
        subtitle="Preparing your practice session"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fbla-blue"></div>
          <p className="text-gray-600">Loading practice questions...</p>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout
        title="Practice Error"
        subtitle="Failed to load practice session"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-red-600">Failed to load practice questions. Please try again.</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If event not found
  if (!match || !event) {
    return (
      <PageLayout
        title="Practice Not Found"
        subtitle="The practice event you're looking for doesn't exist"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Sorry, we couldn't find that practice event.</p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If no questions available
  if (questions.length === 0) {
    return (
      <PageLayout
        title={practiceEvent?.name || 'Event'}
        subtitle="No questions available for this event"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Questions for this event are coming soon!</p>
          <Button onClick={handleBackToPractice}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </PageLayout>
    );
  }

  // If currentQuestion is not available (safety check)
  if (!currentQuestion) {
    console.error('Current question not found:', { currentQuestionIndex, questionsLength: questions.length, questions });
    return (
      <PageLayout
        title={practiceEvent?.name || 'Event'}
        subtitle="Question not available"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <p className="text-gray-600">Unable to load question. Please try again.</p>
          <div className="space-x-3">
            <Button onClick={() => setCurrentQuestionIndex(0)} variant="outline">
              Restart Practice
            </Button>
            <Button onClick={handleBackToPractice}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Practice
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Remove inline results view - now navigates to dedicated results page

  // Main practice interface
  return (
    <PageLayout
      title={practiceEvent?.name || 'Event'}
      subtitle={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header with progress and event info */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleBackToPractice} 
            variant="outline"
            data-testid="button-back-to-practice"
            className="text-gray-900 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Practice
          </Button>
          
          <div className="flex items-center space-x-4">
            <Badge className={getDifficultyColor(practiceEvent?.difficulty || 'Beginner')}>
              {practiceEvent?.difficulty || 'Beginner'}
            </Badge>
            <Badge variant="outline">{practiceEvent?.category || 'General'}</Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <Progress 
            value={((currentQuestionIndex + 1) / questions.length) * 100} 
            className="h-2"
          />
        </div>

        {/* Question card */}
        <StyledCard className="p-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" data-testid="question-text">
              {currentQuestion?.question || 'Loading question...'}
            </h2>
            
            {/* Answer options */}
            <div className="space-y-3">
              {(currentQuestion?.options || []).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  data-testid={`answer-option-${index}`}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? showFeedback
                        ? index === (currentQuestion?.correctAnswer ?? -1)
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : 'bg-red-50 border-red-500 text-red-800'
                        : 'bg-fbla-blue text-white border-fbla-blue'
                      : showFeedback && index === (currentQuestion?.correctAnswer ?? -1)
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-white border-gray-200 text-gray-900 hover:border-fbla-blue hover:bg-gray-50 hover:text-gray-900'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showFeedback && index === (currentQuestion?.correctAnswer ?? -1) && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== (currentQuestion?.correctAnswer ?? -1) && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback section */}
            {showFeedback && (
              <div className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-gray-700 mt-1">{currentQuestion?.explanation || 'No explanation available.'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                onClick={handleEndPractice} 
                variant="outline"
                data-testid="button-end-practice"
                className="text-gray-900 hover:text-gray-900"
              >
                End Practice
              </Button>
              
              <div className="space-x-3">
                {!showFeedback ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    data-testid="button-submit-answer"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    data-testid="button-next-question"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </StyledCard>
      </div>
    </PageLayout>
  );
}