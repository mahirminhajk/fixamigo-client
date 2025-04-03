import { IAddress } from "./address";

export interface IOrder {
  user: string;
  address?: IAddress;
  device: {
    _id: string;
    name: string;
    type: string;
    company?: string;
    image: string;
  };
  spareParts: string[];
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

  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum PaymentMode {
  COD = "COD",
  ONLINE = "ONLINE",
}

export enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",

  SCHEDULED_PICKUP = "SCHEDULED_PICKUP",
  PICKED_UP = "PICKED_UP",
  REACHED_STORE = "REACHED_STORE",
  REPAIRING = "REPAIRING",
  REPAIRED = "REPAIRED",
  SCHEDULED_DELIVERY = "SCHEDULED_DELIVERY",
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
