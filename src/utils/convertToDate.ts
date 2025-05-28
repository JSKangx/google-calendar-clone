export function convertToDate(
  baseDate: Date,
  time: { hour: number; minute: number }
) {
  const date = new Date(baseDate); // 복사
  date.setHours(time.hour);
  date.setMinutes(time.minute);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
