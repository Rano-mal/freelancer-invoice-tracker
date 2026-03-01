import { Currency } from './currencies';

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  currency: Currency;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  total: number;
  convertedTotal: number;
  exchangeRate: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  country: string;
  defaultCurrency: Currency;
  totalRevenue: number;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  currency: Currency;
  convertedAmount: number;
}

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Sarah Chen', email: 'sarah@techstart.io', company: 'TechStart Inc.', country: 'United States', defaultCurrency: 'USD', totalRevenue: 24500 },
  { id: 'c2', name: 'Marcus Weber', email: 'marcus@designhaus.de', company: 'DesignHaus GmbH', country: 'Germany', defaultCurrency: 'EUR', totalRevenue: 18200 },
  { id: 'c3', name: 'James Whitfield', email: 'james@bridgeworth.co.uk', company: 'Bridgeworth Ltd', country: 'United Kingdom', defaultCurrency: 'GBP', totalRevenue: 31000 },
  { id: 'c4', name: 'Emily Tremblay', email: 'emily@nordik.ca', company: 'Nordik Digital', country: 'Canada', defaultCurrency: 'CAD', totalRevenue: 12800 },
  { id: 'c5', name: 'Yuki Tanaka', email: 'yuki@sakura.jp', company: 'Sakura Systems', country: 'Japan', defaultCurrency: 'JPY', totalRevenue: 9500 },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'inv1', number: 'INV-001', clientId: 'c1', clientName: 'TechStart Inc.', currency: 'USD', status: 'Paid', issueDate: '2026-01-05', dueDate: '2026-02-04', lineItems: [{ id: 'l1', description: 'Web Development - January', quantity: 80, rate: 125 }], total: 10000, convertedTotal: 10000, exchangeRate: 1 },
  { id: 'inv2', number: 'INV-002', clientId: 'c2', clientName: 'DesignHaus GmbH', currency: 'EUR', status: 'Paid', issueDate: '2026-01-10', dueDate: '2026-02-09', lineItems: [{ id: 'l2', description: 'UI/UX Design Sprint', quantity: 1, rate: 4500 }], total: 4500, convertedTotal: 4860, exchangeRate: 1.08 },
  { id: 'inv3', number: 'INV-003', clientId: 'c3', clientName: 'Bridgeworth Ltd', currency: 'GBP', status: 'Sent', issueDate: '2026-02-01', dueDate: '2026-03-03', lineItems: [{ id: 'l3', description: 'Consulting - Q1', quantity: 40, rate: 150 }], total: 6000, convertedTotal: 7620, exchangeRate: 1.27 },
  { id: 'inv4', number: 'INV-004', clientId: 'c1', clientName: 'TechStart Inc.', currency: 'USD', status: 'Paid', issueDate: '2026-02-05', dueDate: '2026-03-07', lineItems: [{ id: 'l4', description: 'Web Development - February', quantity: 60, rate: 125 }], total: 7500, convertedTotal: 7500, exchangeRate: 1 },
  { id: 'inv5', number: 'INV-005', clientId: 'c4', clientName: 'Nordik Digital', currency: 'CAD', status: 'Overdue', issueDate: '2026-01-15', dueDate: '2026-02-14', lineItems: [{ id: 'l5', description: 'Brand Strategy Package', quantity: 1, rate: 8500 }], total: 8500, convertedTotal: 6290, exchangeRate: 0.74 },
  { id: 'inv6', number: 'INV-006', clientId: 'c2', clientName: 'DesignHaus GmbH', currency: 'EUR', status: 'Draft', issueDate: '2026-02-20', dueDate: '2026-03-22', lineItems: [{ id: 'l6', description: 'Design System v2', quantity: 1, rate: 7200 }], total: 7200, convertedTotal: 7776, exchangeRate: 1.08 },
  { id: 'inv7', number: 'INV-007', clientId: 'c3', clientName: 'Bridgeworth Ltd', currency: 'GBP', status: 'Paid', issueDate: '2026-01-20', dueDate: '2026-02-19', lineItems: [{ id: 'l7', description: 'API Integration', quantity: 1, rate: 12000 }], total: 12000, convertedTotal: 15240, exchangeRate: 1.27 },
  { id: 'inv8', number: 'INV-008', clientId: 'c5', clientName: 'Sakura Systems', currency: 'JPY', status: 'Sent', issueDate: '2026-02-10', dueDate: '2026-03-12', lineItems: [{ id: 'l8', description: 'Mobile App Prototype', quantity: 1, rate: 1500000 }], total: 1500000, convertedTotal: 10050, exchangeRate: 0.0067 },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1', date: '2026-01-05', description: 'Figma Pro Annual', category: 'Software & Tools', amount: 144, currency: 'USD', convertedAmount: 144 },
  { id: 'e2', date: '2026-01-10', description: 'AWS Hosting', category: 'Software & Tools', amount: 85, currency: 'USD', convertedAmount: 85 },
  { id: 'e3', date: '2026-01-15', description: 'Co-working Space', category: 'Office Supplies', amount: 350, currency: 'USD', convertedAmount: 350 },
  { id: 'e4', date: '2026-01-22', description: 'Flight to London - Client Meeting', category: 'Travel', amount: 480, currency: 'GBP', convertedAmount: 609.6 },
  { id: 'e5', date: '2026-02-01', description: 'Google Workspace', category: 'Software & Tools', amount: 14.99, currency: 'USD', convertedAmount: 14.99 },
  { id: 'e6', date: '2026-02-05', description: 'Online Course - Advanced React', category: 'Education', amount: 199, currency: 'USD', convertedAmount: 199 },
  { id: 'e7', date: '2026-02-10', description: 'LinkedIn Premium', category: 'Marketing', amount: 59.99, currency: 'USD', convertedAmount: 59.99 },
  { id: 'e8', date: '2026-02-15', description: 'Business Insurance', category: 'Insurance', amount: 125, currency: 'USD', convertedAmount: 125 },
  { id: 'e9', date: '2026-02-18', description: 'Internet Service', category: 'Internet & Phone', amount: 89, currency: 'USD', convertedAmount: 89 },
  { id: 'e10', date: '2026-02-25', description: 'Client Dinner', category: 'Meals & Entertainment', amount: 95, currency: 'EUR', convertedAmount: 102.6 },
];

export const MONTHLY_REVENUE = [
  { month: 'Sep', revenue: 8200 },
  { month: 'Oct', revenue: 12400 },
  { month: 'Nov', revenue: 15600 },
  { month: 'Dec', revenue: 9800 },
  { month: 'Jan', revenue: 30100 },
  { month: 'Feb', revenue: 29346 },
];
