import { TIMES } from "@/constants/time";

export type TimePeriod = "오전" | "오후";

export interface TimeOption {
  label: string;
  value: {
    period: TimePeriod;
    hour: number;
    minute: string;
  };
}

export default function getTimeOptions() {
  const timeOptions: TimeOption[] = [];

  for (const period of TIMES[0] as TimePeriod[]) {
    for (const hour of TIMES[1] as number[]) {
      for (const min of TIMES[2] as string[]) {
        timeOptions.push({
          label: `${period} ${hour}:${min}`,
          value: {
            period,
            hour,
            minute: min,
          },
        });
      }
    }
  }

  return timeOptions;
}
