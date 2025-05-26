export function getFormattedDate(hour: number) {
  // 0시(자정)는 표시하지 않음
  if (hour === 0) {
    return "";
  }

  let displayHour;
  let period;

  if (hour < 12) {
    displayHour = hour;
    period = "오전";
  } else if (hour === 12) {
    displayHour = 12;
    period = "오후";
  } else {
    displayHour = hour - 12;
    period = "오후";
  }
  return `${period} ${displayHour}시`;
}
