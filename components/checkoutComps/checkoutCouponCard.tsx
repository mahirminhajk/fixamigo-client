"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applyCoupon, removeCoupon, validateCoupon } from "@/lib/couponApi";
import { IAppliedCoupon } from "@/types/coupon";
import { AlertCircle, CheckCircle2, Loader2, Tag, X } from "lucide-react";
import { useState } from "react";

interface CheckoutCouponCardProps {
  orderId: string;
  orderValue: number;
  appliedCoupons: IAppliedCoupon[];
  onCouponApplied: () => void;
  onCouponRemoved: () => void;
  orderData?: any;
}

export default function CheckoutCouponCard({
  orderId,
  orderValue,
  appliedCoupons,
  onCouponApplied,
  onCouponRemoved,
  orderData,
}: CheckoutCouponCardProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleValidate = async () => {
    if (!couponCode.trim()) {
      setValidationMessage({ type: "error", text: "Please enter a coupon code" });
      return;
    }

    setIsValidating(true);
    setValidationMessage(null);

    try {
      const result = await validateCoupon(couponCode.toUpperCase(), orderValue, orderData);
      
      if (result.isValid && result.discount !== undefined) {
        setValidationMessage({
          type: "success",
          text: `Valid! You'll save ₹${result.discount.toFixed(2)}`,
        });
      } else {
        setValidationMessage({
          type: "error",
          text: result.message || result.errors?.join(", ") || "Invalid coupon code",
        });
      }
    } catch (error: any) {
      setValidationMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to validate coupon",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleApply = async () => {
    if (!couponCode.trim()) return;

    setIsApplying(true);
    setValidationMessage(null);

    try {
      await applyCoupon(couponCode.toUpperCase(), orderId, orderValue, orderData);
      setCouponCode("");
      setValidationMessage({
        type: "success",
        text: "Coupon applied successfully!",
      });
      onCouponApplied();
    } catch (error: any) {
      setValidationMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to apply coupon",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = async (code: string) => {
    setIsRemoving(code);
    setValidationMessage(null);

    try {
      await removeCoupon(code, orderId);
      setValidationMessage({
        type: "success",
        text: "Coupon removed",
      });
      onCouponRemoved();
    } catch (error: any) {
      setValidationMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to remove coupon",
      });
    } finally {
      setIsRemoving(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-lg">Apply Coupon</h3>
      </div>

      {/* Applied Coupons */}
      {appliedCoupons && appliedCoupons.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Applied Coupons:</p>
          {appliedCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-mono font-semibold text-sm">{coupon.code}</p>
                  <p className="text-xs text-green-700">Saving ₹{coupon.discount}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(coupon.code)}
                disabled={isRemoving === coupon.code}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {isRemoving === coupon.code ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setValidationMessage(null);
            }}
            className="flex-1 font-mono"
            disabled={isValidating || isApplying}
          />
          <Button
            onClick={handleValidate}
            disabled={isValidating || isApplying || !couponCode.trim()}
            variant="outline"
          >
            {isValidating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Validate"
            )}
          </Button>
          <Button
            onClick={handleApply}
            disabled={isValidating || isApplying || !couponCode.trim()}
          >
            {isApplying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>

        {/* Validation Message */}
        {validationMessage && (
          <div
            className={`flex items-center gap-2 p-2 rounded text-sm ${
              validationMessage.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {validationMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{validationMessage.text}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Coupons can be applied to get instant discounts on your order
      </p>
    </div>
  );
}
