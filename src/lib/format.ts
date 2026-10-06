/** £48,200 · −£15,000 */
export function gbp(n: number) {
  const sign = n < 0 ? "−" : "";
  return `${sign}£${Math.round(Math.abs(n)).toLocaleString("en-GB")}`;
}

/** Prices: £750 · £637.50 (pence only when there are any). */
export function gbpPrice(n: number) {
  if (Number.isInteger(n)) return gbp(n);
  return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** £750k · £5.0M · £1.25M */
export function gbpShort(n: number) {
  if (n >= 1e6) return `£${(n / 1e6).toFixed(2).replace(/0$/, "")}M`;
  return `£${Math.round(n / 1000)}k`;
}

export function pct(rate: number, digits = 1) {
  return `${(rate * 100).toFixed(digits)}%`;
}
