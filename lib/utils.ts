import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";
import { IAddress } from "@/types/address";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSparePartsIcon = (category: string) =>
  `/icons/${category.toLowerCase()}.png`;

export const convertDate = (date: Date): string => {
  return moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY");
};

export const formatDate = (utcDate: string | Date): string => {
  return moment
    .utc(utcDate) // interpret as UTC
    .tz("Asia/Kolkata") // convert to IST
    .format("MMMM DD, YYYY");
};

export const formatAddress = (address: IAddress): string => {
  const {
    name,
    phone,
    altPhone,
    address: street,
    landmark,
    city,
    state,
    pincode,
  } = address;

  const parts = [
    name,
    `Phone: ${phone}`,
    altPhone ? `Alt: ${altPhone}` : null,
    street,
    landmark,
    `${city} - ${pincode}`,
    state,
  ];

  return parts.filter(Boolean).join(", ");
};
