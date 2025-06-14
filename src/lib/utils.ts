
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
