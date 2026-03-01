export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CHF';

export const CURRENCIES: { code: Currency; symbol: string; name: string }[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
];

export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  CAD: 0.74,
  AUD: 0.65,
  JPY: 0.0067,
  CHF: 1.13,
};

export function convertToBase(amount: number, currency: Currency, baseCurrency: Currency = 'USD'): number {
  const amountInUSD = amount * EXCHANGE_RATES[currency];
  return amountInUSD / EXCHANGE_RATES[baseCurrency];
}

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export const EXPENSE_CATEGORIES = [
  'Software & Tools',
  'Office Supplies',
  'Travel',
  'Marketing',
  'Professional Services',
  'Insurance',
  'Education',
  'Internet & Phone',
  'Meals & Entertainment',
  'Other',
] as const;
