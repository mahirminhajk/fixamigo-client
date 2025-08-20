import React, { useMemo } from "react";
import {
  FaCheck,
  FaClipboardCheck,
  FaTruck,
  FaTools,
  FaHome,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { IStepper } from "@/types/order";
import { formatDate } from "@/lib/utils";

// Step display configuration mapping based on step names
interface StepDisplayConfig {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colors: {
    pending: string;
    active: string;
    completed: string;
    failed: string;
  };
  defaultLabel: string; // Default label when no substatus is available
}

const STEP_DISPLAY_CONFIG: Record<string, StepDisplayConfig> = {
  "Order Confirmation": {
    icon: FaClipboardCheck,
    defaultLabel: "Order Confirmed",
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-blue-100 border-blue-500 text-blue-600",
      completed: "bg-green-500 border-green-500 text-white",
      failed: "bg-red-100 border-red-500 text-red-600",
    },
  },
  "Price Confirmation": {
    icon: FaDollarSign,
    defaultLabel: "Stock Confirmation",
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-yellow-100 border-yellow-500 text-yellow-600",
      completed: "bg-green-500 border-green-500 text-white",
      failed: "bg-red-100 border-red-500 text-red-600",
    },
  },
  Pickup: {
    icon: FaTruck,
    defaultLabel: "Device Pickup",
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-orange-100 border-orange-500 text-orange-600",
      completed: "bg-green-500 border-green-500 text-white",
      failed: "bg-red-100 border-red-500 text-red-600",
    },
  },
  Repair: {
    icon: FaTools,
    defaultLabel: "Device Repair",
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-purple-100 border-purple-500 text-purple-600",
      completed: "bg-green-500 border-green-500 text-white",
      failed: "bg-red-100 border-red-500 text-red-600",
    },
  },
  Delivery: {
    icon: FaHome,
    defaultLabel: "Device Delivery",
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-indigo-100 border-indigo-500 text-indigo-600",
      completed: "bg-green-500 border-green-500 text-white",
      failed: "bg-red-100 border-red-500 text-red-600",
    },
  },
};

interface OrderProgressBarProps {
  stepper: IStepper[];
  estimatedDeliveryDate?: string;
}

// Default order mapping used when stepNo is missing
const DEFAULT_STEP_ORDER: Record<string, number> = {
  "Order Confirmation": 1,
  "Price Confirmation": 2,
  Pickup: 3,
  Repair: 4,
  Delivery: 5,
};

// Helper to build complete step structure combining expected steps with actual data
const buildCompleteStepStructure = (stepper: IStepper[]): IStepper[] => {
  const stepMap = new Map<string, IStepper>();

  // Create a map of existing steps from backend
  stepper.forEach((step) => {
    stepMap.set(step.step, step);
  });

  // Build complete step structure
  const completeSteps: IStepper[] = [];

  // Always include Order Confirmation
  completeSteps.push(
    stepMap.get("Order Confirmation") || {
      step: "Order Confirmation",
      status: "PENDING",
    }
  );

  // Include Price Confirmation if it exists in the stepper array
  if (stepMap.has("Price Confirmation")) {
    completeSteps.push(stepMap.get("Price Confirmation")!);
  }

  // Add remaining expected steps
  const remainingSteps = ["Pickup", "Repair", "Delivery"];
  remainingSteps.forEach((stepName) => {
    completeSteps.push(
      stepMap.get(stepName) || {
        step: stepName,
        status: "PENDING",
      }
    );
  });

  // Include any additional dynamic steps provided by backend (e.g., "Cancelled")
  const knownSteps = new Set<string>([
    "Order Confirmation",
    "Price Confirmation",
    ...remainingSteps,
  ]);
  stepper.forEach((s) => {
    if (!knownSteps.has(s.step)) {
      completeSteps.push(s);
    }
  });

  // Sort by explicit stepNo first; fallback to default step order; then original order
  const withIndex = completeSteps.map((s, idx) => ({ s, idx }));
  withIndex.sort((a, b) => {
    const aNo =
      a.s.stepNo ?? DEFAULT_STEP_ORDER[a.s.step] ?? Number.MAX_SAFE_INTEGER;
    const bNo =
      b.s.stepNo ?? DEFAULT_STEP_ORDER[b.s.step] ?? Number.MAX_SAFE_INTEGER;
    if (aNo !== bNo) return aNo - bNo;
    // If same order value, fall back to default step order explicitly (helps when both have stepNo)
    const aDef = DEFAULT_STEP_ORDER[a.s.step] ?? Number.MAX_SAFE_INTEGER;
    const bDef = DEFAULT_STEP_ORDER[b.s.step] ?? Number.MAX_SAFE_INTEGER;
    if (aDef !== bDef) return aDef - bDef;
    // Preserve original relative order as a final fallback
    return a.idx - b.idx;
  });

  return withIndex.map((x) => x.s);
};

// Helper to get display configuration for a step
const getStepDisplayConfig = (stepName: string): StepDisplayConfig => {
  return (
    STEP_DISPLAY_CONFIG[stepName] || {
      icon: FaClock,
      defaultLabel: stepName,
      colors: {
        pending: "bg-gray-300 border-gray-400 text-gray-500",
        active: "bg-blue-100 border-blue-500 text-blue-600",
        completed: "bg-green-500 border-green-500 text-white",
        failed: "bg-red-100 border-red-500 text-red-600",
      },
    }
  );
};

// Helper to get the display label for a step
const getStepDisplayLabel = (
  step: IStepper,
  config: StepDisplayConfig
): string => {
  // If there's a substatus and the step has actual data, use it
  if (
    step.substatus &&
    (step.status !== "PENDING" || step.completedAt || step.startedAt)
  ) {
    // For Price Confirmation, replace "Price" with "Stock" in substatus
    if (
      step.step === "Price Confirmation" &&
      step.substatus.includes("Price")
    ) {
      return step.substatus.replace("Price", "Stock");
    }
    return step.substatus;
  }

  // If step has no data (just a placeholder), use default label
  if (
    step.status === "PENDING" &&
    !step.completedAt &&
    !step.startedAt &&
    !step.data
  ) {
    return config.defaultLabel;
  }

  // For Price Confirmation step, show as "Stock Confirmation"
  if (step.step === "Price Confirmation") {
    return "Stock Confirmation";
  }

  // Otherwise use the main step name
  return step.step;
};

// Helper to get the status display text
const getStatusDisplayText = (step: IStepper): string => {
  // For placeholder steps (no real data), show "Pending..."
  if (
    step.status === "PENDING" &&
    !step.completedAt &&
    !step.startedAt &&
    !step.data
  ) {
    return "Pending...";
  }

  if (step.status === "COMPLETED" && step.completedAt) {
    return `Completed: ${formatDate(step.completedAt)}`;
  }

  if (step.status === "IN_PROGRESS") {
    if (step.startedAt) {
      return `Started: ${formatDate(step.startedAt)}`;
    }
    return "In Progress...";
  }

  if (step.status === "FAILED") {
    // Check if it's a cancellation or rejection
    if (step.data?.reason) {
      return step.data.reason;
    }
    return "Failed";
  }

  return "Pending...";
};

// Helper to determine the current active step index
const getCurrentActiveStepIndex = (completeSteps: IStepper[]): number => {
  if (!completeSteps || completeSteps.length === 0) {
    return 0;
  }

  // Find the first IN_PROGRESS step
  const inProgressIndex = completeSteps.findIndex(
    (step) => step.status === "IN_PROGRESS"
  );
  if (inProgressIndex !== -1) {
    return inProgressIndex;
  }

  // Find the first PENDING step that has actual data (not a placeholder)
  const firstActivePendingIndex = completeSteps.findIndex(
    (step) =>
      step.status === "PENDING" &&
      (step.completedAt || step.startedAt || step.data)
  );
  if (firstActivePendingIndex !== -1) {
    return firstActivePendingIndex;
  }

  // Find the first placeholder PENDING step
  const firstPendingIndex = completeSteps.findIndex(
    (step) => step.status === "PENDING"
  );
  if (firstPendingIndex !== -1) {
    return firstPendingIndex;
  }

  // If all steps are completed or failed, return the last index
  return completeSteps.length - 1;
};

const OrderProgressBar: React.FC<OrderProgressBarProps> = ({
  stepper,
  estimatedDeliveryDate,
}) => {
  // Build complete step structure with both backend data and expected steps
  const completeSteps = useMemo(() => {
    return buildCompleteStepStructure(stepper || []);
  }, [stepper]);

  // Determine if order is cancelled based on presence of a "Cancelled" step
  const isOrderCancelled = useMemo(() => {
    return (stepper || []).some((s) => s.step === "Cancelled");
  }, [stepper]);

  // Find the current active step index
  const currentActiveStepIndex = useMemo(() => {
    if (isOrderCancelled) return -1; // No active step when order is cancelled
    return getCurrentActiveStepIndex(completeSteps);
  }, [completeSteps, isOrderCancelled]);

  // If no stepper data at all, show a loading state
  if (!stepper) {
    return (
      <div className="flex flex-col items-start w-full max-w-md mx-auto p-4">
        <div className="text-center text-gray-500">
          Loading order progress...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full">
      {estimatedDeliveryDate && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200 w-full">
          <div className="flex items-center gap-3">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-blue-800 text-sm font-medium">
                Estimated Delivery
              </p>
              <p className="text-blue-900 text-lg font-bold">
                {estimatedDeliveryDate}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative pl-4 lg:pl-6 w-full">
        {completeSteps.map((step, index) => {
          const displayConfig = getStepDisplayConfig(step.step);
          const Icon = displayConfig.icon;
          const isActive = index === currentActiveStepIndex;
          const isCompleted = step.status === "COMPLETED";
          const isFailed = step.status === "FAILED";
          const isInProgress = step.status === "IN_PROGRESS";
          const showActiveHighlight =
            !isOrderCancelled && (isActive || isInProgress);
          const isPlaceholder =
            step.status === "PENDING" &&
            !step.completedAt &&
            !step.startedAt &&
            !step.data;

          // Determine colors based on status
          let colorClasses = displayConfig.colors.pending;
          if (isFailed) {
            colorClasses = displayConfig.colors.failed;
          } else if (isCompleted) {
            colorClasses = displayConfig.colors.completed;
          } else if (showActiveHighlight) {
            colorClasses = displayConfig.colors.active;
          } else if (isPlaceholder) {
            colorClasses = "bg-gray-200 border-gray-300 text-gray-400";
          }

          const displayLabel = getStepDisplayLabel(step, displayConfig);
          const statusText = getStatusDisplayText(step);

          // Additional data display
          let additionalData = "";
          if (
            step.data &&
            Object.keys(step.data).length > 0 &&
            !isPlaceholder
          ) {
            const filteredData = Object.entries(step.data)
              .filter(([key]) => key !== "reason")
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
            additionalData = filteredData;
          }

          return (
            <div
              key={`${step.step}-${index}`}
              className="relative mb-6 last:mb-0 flex items-start w-full"
            >
              {/* Vertical Line */}
              {index !== completeSteps.length - 1 && (
                <div
                  className={`absolute left-[15px] lg:left-[19px] top-12 w-[2px] h-[calc(100%+8px)] ${
                    isCompleted ? "bg-green-400" : "bg-gray-300"
                  }`}
                ></div>
              )}

              {/* Step Icon Circle */}
              <div
                className={`relative w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border-2 z-10 transition-all duration-300 shadow-sm ${colorClasses} ${
                  showActiveHighlight ? "shadow-lg scale-110" : ""
                }`}
              >
                {isCompleted ? (
                  <FaCheck size={14} />
                ) : isFailed ? (
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                ) : showActiveHighlight ? (
                  <FaClock size={14} className="animate-pulse" />
                ) : (
                  <Icon size={14} />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pl-4 lg:pl-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900 text-base lg:text-lg">
                      {displayLabel}
                    </h3>
                    {/* Status Badge */}
                    {isCompleted && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Done
                      </span>
                    )}
                    {isFailed && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Failed
                      </span>
                    )}
                    {!isOrderCancelled &&
                      (isInProgress ||
                        (isActive && !isCompleted && !isFailed)) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <div className="w-3 h-3 mr-1">
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                          </div>
                          Active
                        </span>
                      )}
                  </div>

                  <p
                    className={`text-sm lg:text-base ${
                      isCompleted
                        ? "text-green-600 font-medium"
                        : isFailed
                        ? "text-red-600 font-medium"
                        : isActive || isInProgress
                        ? "text-blue-600 font-medium"
                        : isPlaceholder
                        ? "text-gray-400 italic"
                        : "text-gray-600"
                    }`}
                  >
                    {statusText}
                  </p>

                  {additionalData && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Details:</span>{" "}
                        {additionalData}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressBar;
