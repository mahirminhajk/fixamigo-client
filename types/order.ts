import { IAddress } from "./address";

export interface IOrder {
  _id: string;
  code: string;
  user: string;
  address?: IAddress;

  device: {
    _id: string;
    name: string;
    type: string;
    company?: string;
    images: string[];
  };
  sparePartsDetails?: {
    _id?: string;
    name: string;
    category: string;
    type?: SparePartType;
    quality?: "original" | "best" | "quality";
    warranty?: {
      duration?: number;
      unit?: "days" | "weeks" | "months" | "years";
    };
    price: {
      repair: number;
      total: number;
      final: number;
      rule: string;
      range?: boolean; // indicates if price is still a range
      startPrice?: number;
      endPrice?: number;
    };
    confirmation?: {
      confirmedAt?: Date;
      stockConfirmed?: boolean; // stock availability confirmed for non-range pricing
    };
  }[];

  price: {
    original: number;
    total: number;
    final: number;
    delivery: number;
    breakdown?: {
      subtotal?: number;
      tax?: number;
      couponsTotal?: number;
      walletDeduction?: number;
    };
  };

  // Single applied coupon (if any)
  coupon?: {
    code: string;
    couponId: string;
    type: string;
    value: number;
    discount: number;
    applyOrderStage?: string;
  };

  walletUsed?: {
    amount: number;
    holdId?: string;
    transactionId?: string;
  };

  loyaltyCoins?: {
    earned: number;
    transactionId?: string;
  };

  payment?: {
    mode: PaymentMode;
    transactionId?: string;
  };

  agent?: {
    _id: string;
    name: string;
    phone: string;
  };

  status: OrderStatus;

  alert?: {
    isActive: boolean;
    type: "INFO" | "WARNING" | "ERROR" | "SUCCESS";
    title?: string;
    message?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  stepper: IStepper[];

  schedules?: {
    pickupDate?: Date;
    deliveryDate?: Date;
  };

  createdAt: Date;
  note?: string;
}

export enum PaymentMode {
  COD = "COD",
  ONLINE = "ONLINE",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMING_STOCK = "CONFIRMING_STOCK",
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

  PENDING_CANCELLATION = "PENDING_CANCELLATION",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  OTHERS = "OTHERS",
}

export enum SparePartType {
  DEFAULT = "DEFAULT",
  RANGE = "RANGE",
  DIAGNOSIS = "DIAGNOSIS",
  UNKNOWN = "UNKNOWN", // For parts/services without predefined spare part pricing
}

export interface IStepper {
  step: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  substatus?: string; // For detailed status within a step
  completedAt?: Date;
  startedAt?: Date;
  stepNo?: number;
  data?: { [key: string]: string };
}

// Dynamic stepper step types
export enum StepperStepType {
  ORDER_CONFIRMATION = "Order Confirmation",
  PRICE_CONFIRMATION = "Price Confirmation",
  PICKUP = "Pickup",
  REPAIR = "Repair",
  DELIVERY = "Delivery",
  COMPLETION = "Completion",
}
