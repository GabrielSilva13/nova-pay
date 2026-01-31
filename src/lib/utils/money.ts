export function toCents(value: number) {
  return Math.round(value * 100);
}

export function isTwoDecimalNumber(value: number) {
  return Number.isFinite(value) && toCents(value) / 100 === value;
}
