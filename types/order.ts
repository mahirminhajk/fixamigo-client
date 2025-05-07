import { IAddress } from "./address";

export interface IOrder {
  _id: string;
  user: string;
  address?: IAddress;

  device: {
    _id: string;
    name: string;
    type: string;
    company?: string;
    image: string;
  };
  spareParts?: string[];
  sparePartsDetails?: {
    _id: string;
    name: string;
    category: string;
    price: {
      total: number;
      final: number;
      discountPercentage: number;
    };
  }[];

  price: {
    original: number;
    total: number;
    final: number;
    delivery: number;
  };
  payment?: {
    mode: PaymentMode;
    transactionId?: string;
  };

  status: OrderStatus;

  timeline: ITimeline[];

  schedules?: {
    pickupDate?: Date;
    deliveryDate?: Date;
  };

  createdAt: Date;
}

export enum PaymentMode {
  COD = "COD",
  ONLINE = "ONLINE",
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",

  SCHEDULED_PICKUP = "SCHEDULED_PICKUP",
  EN_ROUTE = "EN_ROUTE",
  PICKED_UP = "PICKED_UP",

  REACHED_STORE = "REACHED_STORE",
  REPAIRING = "REPAIRING",
  REPAIRED = "REPAIRED",

  SCHEDULED_DELIVERY = "SCHEDULED_DELIVERY",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",

  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  OTHERS = "OTHERS",
}

export interface ITimeline {
  status: OrderStatus;
  message: string;
  createdAt: Date;
  data?: { [key: string]: string };
}
