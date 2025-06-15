import { ISparePart } from "./spareParts";

export interface IDevice {
  _id: string;
  slug: string;
  name: string;
  images: string[];
  type: string;
  company: string;
  spareParts: ISparePart[];
}

export interface ICartDevice {
  _id: string;
  slug: string;
  name: string;
  images: string[];
  company: string;
}
