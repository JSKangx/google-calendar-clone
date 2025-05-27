export default function getStartTime(hour: number, min: number) {
  // (1) 오전/오후는 원래 hour 기준
  const period = hour < 12 ? "오전" : "오후";

  // (2) 표시할 시각 (min >= 45면 hour + 1)
  let displayHour = min < 45 ? hour : hour + 1;
  displayHour = displayHour % 24; // 24 넘어갈 경우 0으로

  // (3) 12시간제로 변환
  const hour12 = displayHour % 12 === 0 ? 12 : displayHour % 12;

  // (4) 표시할 분
  let displayMin: string;
  if (min >= 0 && min < 15) {
    displayMin = "15";
  } else if (min < 30) {
    displayMin = "30";
  } else if (min < 45) {
    displayMin = "45";
  } else {
    displayMin = "00";
  }

  return `${period} ${hour12}:${displayMin}`;
}
