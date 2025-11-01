"use client";

import { AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { INFO } from "@/constants";
import api from "@/lib/axiosInstance";
import { formatAddress, formatDate, getSparePartsIcon } from "@/lib/utils";
import { IOrder, OrderStatus, SparePartType } from "@/types/order";

type Agent = IOrder["agent"];
type Alert = IOrder["alert"];

interface OrderContentProps {
  order: IOrder;
}

export default function OrderContent({ order }: OrderContentProps) {
  const hasRangeItems =
    order.sparePartsDetails?.some(
      (spare) =>
        spare.price.range && spare.price.startPrice && spare.price.endPrice
    ) || false;

  return (
    <div className="w-full space-y-6">
      <ContactAgentCard agent={order.agent} status={order.status} />
      <DeviceCard order={order} />
      <AlertBanner alert={order.alert} />
      <SparePartsCard order={order} />
      <ServiceDetailsCard order={order} />
      <PaymentDetailsCard order={order} hasRangeItems={hasRangeItems} />
      <OrderActionsCard order={order} />
    </div>
  );
}

function ContactAgentCard({
  agent,
  status,
}: {
  agent?: Agent;
  status: IOrder["status"];
}) {
  if (!agent) return null;
  const show =
    status === OrderStatus.OUT_FOR_DELIVERY || status === OrderStatus.EN_ROUTE;
  if (!show) return null;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
          Contact Agent
        </h2>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="space-y-2">
          <p className="text-sm lg:text-base text-gray-700">
            <span className="font-medium">Name:</span>{" "}
            <span className="font-bold text-gray-900">
              {agent.name.toUpperCase()}
            </span>
          </p>
          <p className="text-sm lg:text-base text-gray-700">
            <span className="font-medium">Phone:</span>{" "}
            <a
              href={`tel:${agent.phone}`}
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              title={`Call agent at ${agent.phone}`}
            >
              {agent.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function DeviceCard({ order }: { order: IOrder }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg lg:text-xl">Device</h2>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-20 lg:w-20 lg:h-24 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
            <Image
              src={order.device.images[0]}
              alt={order.device.name}
              title={`${order.device.name} Image`}
              width={80}
              height={96}
              className="object-contain max-w-full max-h-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base lg:text-lg mb-1">
              {order.device.name.toUpperCase()}
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              Brand -{" "}
              <span className="font-semibold text-gray-800">
                {order.device.company!.toUpperCase()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertBanner({ alert }: { alert?: Alert }) {
  if (!alert?.isActive) return null;
  return (
    <div
      className={`p-4 lg:p-5 rounded-xl border ${
        alert.type === "ERROR"
          ? "bg-red-50 border-red-200 text-red-800"
          : alert.type === "WARNING"
          ? "bg-yellow-50 border-yellow-200 text-yellow-800"
          : alert.type === "SUCCESS"
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-blue-50 border-blue-200 text-blue-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          {alert.title && (
            <h4 className="font-bold text-base lg:text-lg mb-1">
              {alert.title}
            </h4>
          )}
          {alert.message && (
            <p className="text-sm lg:text-base leading-relaxed mb-1">
              {alert.message}
            </p>
          )}
          {alert.createdAt && (
            <p className="text-xs lg:text-sm opacity-75">
              {new Date(alert.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SparePartsCard({ order }: { order: IOrder }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
          Spare Parts
        </h2>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200 space-y-4">
        {order.sparePartsDetails?.map((spare, i) => {
          const needsConfirmation =
            spare.type === SparePartType.UNKNOWN ||
            spare.type === SparePartType.DIAGNOSIS ||
            spare.type === SparePartType.RANGE;
          const stockConfirmed = spare.confirmation?.stockConfirmed ?? false;
          const showRange =
            needsConfirmation &&
            !stockConfirmed &&
            spare.price.range &&
            spare.price.startPrice &&
            spare.price.endPrice;
          const awaitingText = needsConfirmation && !stockConfirmed;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 ${
                i !== 0 ? "pt-4 border-t border-purple-200" : ""
              }`}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                <Image
                  src={getSparePartsIcon(spare.category)}
                  alt={spare.name}
                  title={`${spare.name} Icon`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm lg:text-base truncate">
                  {spare.name.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm mb-1">
                  <span className="font-medium">{spare.category}</span>
                </p>

                {/* Quality and Warranty badges for order spare parts */}
                <div className="flex items-center gap-1">
                  {spare.quality && (
                    <span
                      className={`px-2 py-0.5 text-[10px] lg:text-xs font-medium rounded ${
                        spare.quality === "original"
                          ? "bg-blue-600 text-white"
                          : spare.quality === "best"
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {spare.quality.toUpperCase()}
                    </span>
                  )}
                  {spare.warranty && spare.warranty.duration && (
                    <span className="px-2 py-0.5 text-[10px] lg:text-xs font-medium rounded bg-green-100 text-green-700 border border-green-200">
                      {spare.warranty.duration}{" "}
                      {spare.warranty.unit || "months"} warranty
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                {awaitingText ? (
                  <p className="font-semibold text-sm lg:text-base text-[#D2691E]">
                    {showRange
                      ? `₹${spare.price.startPrice} - ₹${spare.price.endPrice}*`
                      : "Price will be confirmed"}
                  </p>
                ) : (
                  <p className="font-bold text-sm lg:text-base text-[#1f2937]">
                    ₹{spare.price.final}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ServiceDetailsCard({ order }: { order: IOrder }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
          Service Details
        </h2>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm lg:text-base">
              Order Code
            </span>
            <span className="font-bold text-gray-900 text-sm lg:text-base">
              {order.code}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm lg:text-base">
              Ordered Date
            </span>
            <span className="text-gray-900 text-sm lg:text-base font-medium">
              {formatDate(order.createdAt)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm lg:text-base">
              Serviced By
            </span>
            <span className="font-bold text-gray-900 text-sm lg:text-base">
              Fixamigo
            </span>
          </div>
          <div className="pt-2 border-t border-indigo-200">
            <p className="text-gray-600 text-sm lg:text-base mb-1">Address</p>
            <p className="text-gray-900 font-medium text-sm lg:text-base leading-relaxed">
              {formatAddress(order.address!)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentDetailsCard({
  order,
  hasRangeItems,
}: {
  order: IOrder;
  hasRangeItems: boolean;
}) {
  const anyAwaitingConfirmation = order.sparePartsDetails?.some((spare) => {
    const needsConfirmation =
      spare.type === SparePartType.UNKNOWN ||
      spare.type === SparePartType.DIAGNOSIS ||
      spare.type === SparePartType.RANGE;
    const stockConfirmed = spare.confirmation?.stockConfirmed ?? false;
    return needsConfirmation && !stockConfirmed;
  });
  const showMaxEstimatedNote = hasRangeItems && anyAwaitingConfirmation;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg lg:text-xl">
          Payment Details
        </h2>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-200">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm lg:text-base">
              Subtotal
            </span>
            <span
              className={`font-bold text-sm lg:text-base ${
                hasRangeItems ? "text-[#D2691E]" : "text-gray-900"
              }`}
            >
              ₹{order.price.original}
              {hasRangeItems ? "*" : ""}
            </span>
          </div>

          {/* Coupon Discount */}
          {order.coupon && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm lg:text-base flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Coupon ({order.coupon.code})
                </span>
                <span className="font-bold text-sm lg:text-base text-green-600">
                  - ₹{order.coupon.discount}
                </span>
              </div>
            </div>
          )}

          {/* Wallet Discount */}
          {order.walletUsed && order.walletUsed.amount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-blue-600 text-sm lg:text-base flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Wallet Coins Used
              </span>
              <span className="font-bold text-sm lg:text-base text-blue-600">
                - ₹{order.walletUsed.amount}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm lg:text-base">
              Delivery Cost
            </span>
            <span className="text-gray-900 font-bold text-sm lg:text-base">
              ₹{order.price.delivery}
            </span>
          </div>
          <hr className="border-amber-200" />
          <div className="flex justify-between items-center pt-1">
            <span className="font-bold text-gray-900 text-base lg:text-lg">
              Total Price
            </span>
            <span
              className={`font-bold text-lg lg:text-xl ${
                hasRangeItems ? "text-[#D2691E]" : "text-gray-900"
              }`}
            >
              ₹{order.price.final}
              {hasRangeItems ? "*" : ""}
            </span>
          </div>

          {/* Savings Summary */}
          {((order.coupon) || (order.walletUsed && order.walletUsed.amount > 0)) && (
            <div className="mt-3 pt-3 border-t border-amber-300 bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-green-700 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  You saved
                </span>
                <span className="text-lg font-bold text-green-700">
                  ₹{(((order.coupon?.discount || 0)) + (order.walletUsed?.amount || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {showMaxEstimatedNote && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs lg:text-sm text-orange-800 flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Maximum estimated price. Final price will be confirmed by
                  service partner.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loyalty Coins Earned - Show only for completed orders */}
      {order.loyaltyCoins && order.loyaltyCoins.earned > 0 && (
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-900 text-base lg:text-lg">
                  Loyalty Coins Earned
                </p>
                <p className="text-sm text-green-700">
                  Added to your wallet
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                +{order.loyaltyCoins.earned}
              </p>
              <p className="text-xs text-green-700">coins</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderActionsCard({ order }: { order: IOrder }) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const helpMessage = `I need help with my order ${order.code}`;
  const helpHref = INFO.waLink(helpMessage);
  const presetReasons = [
    "Found a better option",
    "Price is too high",
    "Booked by mistake",
    "Device already fixed",
    "Delivery taking too long",
    "Other",
  ];

  const finalReason = () => {
    const base = reason || (customReason ? "Other" : "");
    const extra = customReason.trim();
    return [base, extra].filter(Boolean).join(" - ");
  };

  const onSubmitCancel = async () => {
    setSubmitError(null);
    setSubmitSuccess(null);
    const r = finalReason();
    if (!r) {
      setSubmitError("Please select or enter a reason.");
      return;
    }
    try {
      setSubmitting(true);
      await api.post(`/order/${order._id}/cancel`, { reason: r });
      setSubmitSuccess("Order canceled successfully.");
      setTimeout(() => {
        if (typeof window !== "undefined") window.location.reload();
      }, 800);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const msg = e.response?.data?.message || "Failed to cancel order.";
        setSubmitError(msg);
      } else {
        setSubmitError("Failed to cancel order.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-4 border-t border-gray-200">
      {/** Hide cancel when order is already cancelled */}
      {/** Compute ability to cancel */}
      {/** Using enum ensures type-safe comparison */}
      {/** canCancel = not CANCELLED */}
      {/** WhatsApp help always visible */}
      {/** Sheet slides in from right now */}

      {/* compute cancel visibility */}
      {(() => null)()}
      <div className="flex items-center gap-2 mb-3 text-gray-700">
        <svg
          className="w-4 h-4 opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="font-medium text-sm">Need help or want to cancel?</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={helpHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="secondary" className="w-full">
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.613-.916-2.207-.242-.58-.487-.501-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              WhatsApp Support
            </span>
          </Button>
        </a>

        {order.status !== OrderStatus.CANCELLED && (
          <Sheet open={cancelOpen} onOpenChange={setCancelOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
              >
                Cancel Order
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="max-h-[85vh] overflow-auto">
              <SheetHeader>
                <SheetTitle>Cancel Order</SheetTitle>
              </SheetHeader>
              <div className="mt-2 text-sm text-gray-600">
                Tell us why you want to cancel. This helps us improve.
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="cancel-reason"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select a reason
                  </label>
                  <select
                    id="cancel-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Choose reason</option>
                    {presetReasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="cancel-details"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Additional details (optional)
                  </label>
                  <textarea
                    id="cancel-details"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={4}
                    placeholder="Type more details here..."
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We use this to improve our service.
                  </p>
                </div>
                {submitError && (
                  <div className="text-sm text-red-600">{submitError}</div>
                )}
                {submitSuccess && (
                  <div className="text-sm text-green-700">{submitSuccess}</div>
                )}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Button
                  variant="destructive"
                  onClick={onSubmitCancel}
                  disabled={submitting}
                >
                  {submitting ? "Cancelling..." : "Confirm Cancel"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCancelOpen(false)}
                  disabled={submitting}
                >
                  Close
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </section>
  );
}
