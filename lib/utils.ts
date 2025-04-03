import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSparePartsIcon = (category: string) =>
  `/icons/${category.toLowerCase()}.png`;

export const convertDate = (date: Date): string => {
  return moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY");
};
