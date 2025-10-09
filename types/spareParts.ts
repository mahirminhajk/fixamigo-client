import { SparePartType } from "./order";

export interface ISparePart {
  _id: string;
  label: string;
  name: string;
  category: string;
  /**
   * Type of spare part pricing/behavior.
   * UNKNOWN indicates we don't have a concrete spare part entry (placeholder service)
   */
  type?: SparePartType; // Optional for backward compatibility with existing API responses
  warranty?: {
    duration?: number;
    unit?: "days" | "weeks" | "months" | "years";
  };
  quality?: "original" | "best" | "quality";
  price: {
    total: number;
    repair: number;
    final: number;
    range?: boolean;
    startPrice?: number;
    endPrice?: number;
  };
}
