export function objToStyle(obj: Record<string, string>) {
  return JSON.stringify(obj).replace(/[{"}]/g, '').replace(/,-/g, ';-');
}
