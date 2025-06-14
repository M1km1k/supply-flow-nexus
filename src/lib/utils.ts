
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to format currency in Philippine Peso
export function formatPHP(value: number): string {
  return `₱${value.toLocaleString('en-PH')}`;
}

// Convert USD to PHP (approximate rate: 1 USD = 56 PHP)
export function convertUSDtoPHP(usdValue: number): number {
  return Math.round(usdValue * 56);
}

// Universal currency formatter that uses system preferences
export function formatCurrency(value: number, currency?: string): string {
  // Get currency from system preferences if not provided
  const savedPrefs = localStorage.getItem('system-preferences');
  const systemCurrency = savedPrefs ? JSON.parse(savedPrefs).currency : 'USD';
  const currencyToUse = currency || systemCurrency;

  switch (currencyToUse) {
    case 'PHP':
      return `₱${value.toLocaleString('en-PH')}`;
    case 'USD':
      return `$${value.toLocaleString('en-US')}`;
    case 'EUR':
      return `€${value.toLocaleString('de-DE')}`;
    case 'GBP':
      return `£${value.toLocaleString('en-GB')}`;
    case 'JPY':
      return `¥${value.toLocaleString('ja-JP')}`;
    case 'CAD':
      return `C$${value.toLocaleString('en-CA')}`;
    default:
      return `$${value.toLocaleString('en-US')}`;
  }
}
