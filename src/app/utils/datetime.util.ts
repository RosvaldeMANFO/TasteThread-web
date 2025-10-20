export function longToLocalDateTime(ts: number | string | null | undefined): string {
  if (ts == null) return '';
  const n = typeof ts === 'string' ? Number(ts) : ts;
  if (!Number.isFinite(n)) return '';
  return new Date(n as number).toLocaleString();
}