export interface ISparePart {
  _id: string;
  label: string;
  name: string;
  category: string;
  price: {
    total: number;
    repair: number;
    final: number;
    range?: boolean;
    startPrice?: number;
    endPrice?: number;
  };
}
