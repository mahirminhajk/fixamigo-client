"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { applyCoins, previewCoins, removeCoins } from "@/lib/orderCoinApi";
import { useWalletStore } from "@/stores/walletStore";
import { IOrder } from "@/types/order";
import { Coins, Loader2, Wallet } from "lucide-react";
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
  const [walletAmount, setWalletAmount] = useState(0);
  const [allowedMax, setAllowedMax] = useState(0);
  const [preWalletFinal, setPreWalletFinal] = useState(0);
  const [actionLoading, setActionLoading] = useState<"apply" | "remove" | null>(null);
  
  // Conversion rate: 1 coin = ₹1
  const COIN_TO_RUPEE = 1;
  
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
        setPreWalletFinal(prev.preWalletFinal || 0);
        // Clamp selected to new max if needed
        setWalletAmount((w) => Math.min(w, prev.allowed || 0));
      } catch {
        // ignore preview errors; component can hide itself when no balance
      }
    })();
    return () => { mounted = false; };
  }, [orderId]);

  useEffect(() => {
    // Reset wallet amount if it exceeds new max
    if (walletAmount > maxWalletAmount) {
      setWalletAmount(maxWalletAmount);
    }
  }, [maxWalletAmount, walletAmount]);

  const handleSliderChange = (value: number[]) => {
    const newAmount = value[0];
    setWalletAmount(newAmount);
  };

  const handleUseMax = () => {
    setWalletAmount(maxWalletAmount);
  };

  const handleClear = () => {
    setWalletAmount(0);
  };

  const handleApply = async () => {
    if (!orderId || walletAmount <= 0) return;
    setActionLoading("apply");
    try {
      const resp = await applyCoins(orderId, walletAmount);
      onApplied?.(resp.price);
    } catch {
      // optionally surface error UI
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemove = async () => {
    if (!orderId) return;
    setActionLoading("remove");
    try {
      const resp = await removeCoins(orderId);
      setWalletAmount(0);
      onRemoved?.(resp.price);
    } catch {
      // optionally surface error UI
    } finally {
      setActionLoading(null);
    }
  };

  const discountAmount = walletAmount * COIN_TO_RUPEE;
  const availableCoins = balance?.available || 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  // Don't show if no coins available
  if (availableCoins === 0 || maxWalletAmount === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Use Wallet Coins</h3>
        </div>
        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
          <Coins className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">
            {availableCoins.toLocaleString()} coins
          </span>
        </div>
      </div>

      {/* Wallet Usage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">Select coins to use:</span>
          <span className="font-semibold text-blue-700">
            {walletAmount.toLocaleString()} coins
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Discount if applied:</span>
          <span className="font-semibold text-green-600">
            - ₹{discountAmount.toFixed(2)}
          </span>
        </div>
        {!!preWalletFinal && (
          <div className="flex items-center justify-between mt-1 text-xs text-gray-600">
            <span>Payable before wallet</span>
            <span>₹{preWalletFinal.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <Slider
          value={[walletAmount]}
          onValueChange={handleSliderChange}
          max={maxWalletAmount}
          min={0}
          step={1}
          className="w-full"
          disabled={maxWalletAmount === 0}
        />
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>0</span>
          <span>Max: {maxWalletAmount.toLocaleString()} coins</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUseMax}
          disabled={maxWalletAmount === 0 || walletAmount === maxWalletAmount}
          className="flex-1"
        >
          Use Maximum
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={walletAmount === 0}
          className="flex-1"
        >
          Clear
        </Button>
        <Button
          size="sm"
          onClick={handleApply}
          disabled={walletAmount === 0 || actionLoading === "apply"}
          className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
        >
          {actionLoading === "apply" ? (
            <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Applying…</span>
          ) : (
            "Apply"
          )}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRemove}
          disabled={actionLoading === "remove"}
          className="flex-1"
        >
          {actionLoading === "remove" ? (
            <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Removing…</span>
          ) : (
            "Remove"
          )}
        </Button>
      </div>

      {/* Info Text */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          • 1 coin = ₹1 discount
        </p>
        <p className="text-xs text-gray-500">
          • Server-limited max based on order and rule
        </p>
        {maxWalletAmount < availableCoins && (
          <p className="text-xs text-amber-600">
            • You can use maximum {maxWalletAmount} coins on this order
          </p>
        )}
      </div>
    </div>
  );
}
