/**
 * Wallet Types
 * Customer wallet and transaction types for the loyalty system
 */

export interface IWalletBalance {
  balance: number;
  available: number;
  locked: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
}

export interface IWalletTransaction {
  _id: string;
  userId: string;
  type: "CREDIT" | "DEBIT" | "HOLD" | "RELEASE" | "COMMIT" | "EXPIRE";
  amount: number;
  balance: number;
  reason: string;
  description?: string;
  metadata?: {
    orderId?: string;
    couponId?: string;
    campaignId?: string;
    ruleId?: string;
  };
  expiresAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type WalletTransactionType = IWalletTransaction["type"];

export interface IWalletSummary {
  balance: IWalletBalance;
  recentTransactions: IWalletTransaction[];
}
