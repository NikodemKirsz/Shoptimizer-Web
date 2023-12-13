
export function pad(obj: any, count = 2, char = '0', start = true) {
  const str: string = typeof obj === 'string' ? obj : String(obj);
  return start
    ? str.padStart(count, char)
    : str.padEnd(count, char);
}

export function isNullOrWhitespace(str: string | undefined | null): boolean {
  if (!str)
    return true;

  return !str.trim();
}

export function trimmedOrNull(str: string | undefined | null): string | null {
  return isNullOrWhitespace(str)
    ? null
    : str!.trim();
}