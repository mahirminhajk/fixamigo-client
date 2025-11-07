"use client";

import { applyCoins, previewCoins, removeCoins } from "@/lib/orderCoinApi";
import { useWalletStore } from "@/stores/walletStore";
import { IOrder } from "@/types/order";
import { Coins, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface CheckoutWalletCardProps {
  orderId: string;
  onApplied?: (price: IOrder["price"]) => void;
  onRemoved?: (price: IOrder["price"]) => void;
}

export default function CheckoutWalletCard({
  orderId,
  onApplied,
  onRemoved,
}: CheckoutWalletCardProps) {
  const { balance, isLoading, fetchBalance } = useWalletStore();
  const [useCoins, setUseCoins] = useState(false);
  const [allowedMax, setAllowedMax] = useState(0);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // Maximum wallet amount based on server preview and current balance
  const maxWalletAmount = useMemo(() => {
    return Math.min(allowedMax, balance?.available || 0);
  }, [allowedMax, balance?.available]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Fetch server preview to get allowed spend cap
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const prev = await previewCoins(orderId);
        if (!mounted) return;
        setAllowedMax(prev.allowed || 0);
      } catch {
        // ignore preview errors
      }
    })();
    return () => {
      mounted = false;
    };
  }, [orderId]);

  const handleToggleCoins = async () => {
    if (!orderId || maxWalletAmount <= 0) return;

    setActionLoading(true);
    try {
      if (useCoins) {
        const resp = await removeCoins(orderId);
        setUseCoins(false);
        onRemoved?.(resp.price);
      } else {
        const resp = await applyCoins(orderId, maxWalletAmount);
        setUseCoins(true);
        onApplied?.(resp.price);
      }
    } catch {
    // Keep state unchanged on error
    } finally {
      setActionLoading(false);
    }
  };

  const availableCoins = balance?.available || 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  // Don't show if no coins available
  if (availableCoins === 0 || maxWalletAmount === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={handleToggleCoins}
        disabled={actionLoading}
        className={`w-full p-4 text-left transition-all ${useCoins
            ? "bg-green-50 hover:bg-green-100"
            : "bg-white hover:bg-gray-50"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${useCoins
                  ? "bg-green-600 border-green-600"
                  : "border-gray-300 bg-white"
                }`}
            >
              {useCoins && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Use {maxWalletAmount.toLocaleString()} Fixcoins
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">
                Save ₹{maxWalletAmount.toLocaleString()} on this order
              </p>
            </div>
          </div>
          {actionLoading && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
        </div>
      </button>
    </div>
  );
}
