import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  console.log(createdAt);
  const timeDifference = now.getTime() - createdAt.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
};

// // Example usage:
// const createdAt = new Date(
//   "Sun Jan 01 2023 17:30:00 GMT+0530 (India Standard Time)"
// );
// console.log(getTimestamp(createdAt));
export const formatLargeNumber = (number: number): string => {
  if (number >= 1e12) {
    const formatted = (number / 1e12).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "T"
      : formatted + "T";
  } else if (number >= 1e9) {
    const formatted = (number / 1e9).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "B"
      : formatted + "B";
  } else if (number >= 1e6) {
    const formatted = (number / 1e6).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "M"
      : formatted + "M";
  } else if (number >= 1e3) {
    const formatted = (number / 1e3).toFixed(1);
    return formatted.endsWith(".0")
      ? formatted.slice(0, -2) + "K"
      : formatted + "K";
  } else {
    return number.toString();
  }
};
