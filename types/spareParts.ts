export interface SparePart {
  _id: string;
  label: string;
  name: string;
  category: string;
  price: {
    total: number;
    discountPercentage: number;
    final: number;
  };
}
