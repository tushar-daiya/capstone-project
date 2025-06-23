function toOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  return `${n}${suffix}`;
}

export function generateAchievement(a: {
  position: number;
  event: string;
  heldAt: string;
}) {
  return `${toOrdinal(a.position)} position in ${a.event} held at ${a.heldAt}`;
}
