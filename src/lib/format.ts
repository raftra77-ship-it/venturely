/**
 * Deterministic formatting helpers for currency and numbers
 * Ensures 100% hydration consistency between SSR (Node.js) and Client (Browser)
 */

export function formatCurrency(amount: number | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '0';
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}
