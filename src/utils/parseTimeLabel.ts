export function parseTimeLabel(label: string): {
  hour: number;
  minute: number;
} {
  const [peried, time] = label.split(" ");
  const [hourStr, minStr] = time.split(":");
  let hour = Number(hourStr);
  const minute = Number(minStr);

  if (peried === "오전" && hour === 12) hour = 0;
  if (peried === "오후" && hour !== 12) hour += 12;

  return { hour, minute };
}
