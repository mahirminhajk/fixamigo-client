"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useWalletStore } from "@/stores/walletStore";
import { Coins, Loader2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

interface CheckoutWalletCardProps {
  orderValue: number;
  onWalletChange: (amount: number) => void;
  initialWalletAmount?: number;
}

export default function CheckoutWalletCard({
  orderValue,
  onWalletChange,
  initialWalletAmount = 0,
}: CheckoutWalletCardProps) {
  const { balance, isLoading, fetchBalance } = useWalletStore();
  const [walletAmount, setWalletAmount] = useState(initialWalletAmount);
  
  // Conversion rate: 1 coin = ₹1
  const COIN_TO_RUPEE = 1;
  
  // Maximum wallet amount that can be used
  const maxWalletAmount = Math.min(
    balance?.available || 0,
    Math.floor(orderValue * 0.7) // Can use up to 70% of order value
  );

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    // Reset wallet amount if it exceeds new max
    if (walletAmount > maxWalletAmount) {
      setWalletAmount(maxWalletAmount);
      onWalletChange(maxWalletAmount * COIN_TO_RUPEE);
    }
  }, [maxWalletAmount]);

  const handleSliderChange = (value: number[]) => {
    const newAmount = value[0];
    setWalletAmount(newAmount);
    onWalletChange(newAmount * COIN_TO_RUPEE);
  };

  const handleUseMax = () => {
    setWalletAmount(maxWalletAmount);
    onWalletChange(maxWalletAmount * COIN_TO_RUPEE);
  };

  const handleClear = () => {
    setWalletAmount(0);
    onWalletChange(0);
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
  if (availableCoins === 0) {
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
          <span className="text-sm text-gray-700">Using coins:</span>
          <span className="font-semibold text-blue-700">
            {walletAmount.toLocaleString()} coins
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Discount:</span>
          <span className="font-semibold text-green-600">
            - ₹{discountAmount.toFixed(2)}
          </span>
        </div>
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
      </div>

      {/* Info Text */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          • 1 coin = ₹1 discount
        </p>
        <p className="text-xs text-gray-500">
          • Use up to 70% of order value
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
