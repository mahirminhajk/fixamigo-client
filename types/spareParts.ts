export enum SparePartType {
  DEFAULT = "DEFAULT",
  RANGE = "RANGE",
  DIAGNOSIS = "DIAGNOSIS",
  UNKNOWN = "UNKNOWN", // For parts/services without predefined spare part pricing
}

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
  price: {
    total: number;
    repair: number;
    final: number;
    range?: boolean;
    startPrice?: number;
    endPrice?: number;
  };
}
