export function getPeriodTime(hour: number, minute: number) {
  let displayHour;
  let displayMin;
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

  if (minute === 0) {
    displayMin = "00";
  } else {
    displayMin = minute;
  }

  return `${period} ${displayHour}:${displayMin}`;
}
