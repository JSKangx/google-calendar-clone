import type React from "react";

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

export interface IconWrapperProps {
  wrapperSize: string;
  className?: string;
  children: React.ReactNode;
}

export type FormValues = {
  title: string;
  startTime: string;
  endTime: string;
};
