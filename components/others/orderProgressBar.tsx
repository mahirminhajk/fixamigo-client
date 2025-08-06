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
  Completion: {
    icon: FaCheck,
    defaultLabel: "Order Complete",
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-green-100 border-green-500 text-green-600",
      completed: "bg-green-500 border-green-500 text-white",
      failed: "bg-red-100 border-red-500 text-red-600",
    },
  },
};

interface OrderProgressBarProps {
  stepper: IStepper[];
  estimatedDeliveryDate?: string;
}

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
  const remainingSteps = ["Pickup", "Repair", "Delivery", "Completion"];
  remainingSteps.forEach((stepName) => {
    completeSteps.push(
      stepMap.get(stepName) || {
        step: stepName,
        status: "PENDING",
      }
    );
  });

  return completeSteps;
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

  // Find the current active step index
  const currentActiveStepIndex = useMemo(() => {
    return getCurrentActiveStepIndex(completeSteps);
  }, [completeSteps]);

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
    <div className="flex flex-col items-start w-full max-w-sm mx-auto p-2">
      {estimatedDeliveryDate && (
        <p className="text-gray-600 text-xs mb-2">
          Estimated Date of Delivery: <strong>{estimatedDeliveryDate}</strong>
        </p>
      )}

      <div className="relative pl-3 w-full">
        {completeSteps.map((step, index) => {
          const displayConfig = getStepDisplayConfig(step.step);
          const Icon = displayConfig.icon;
          const isActive = index === currentActiveStepIndex;
          const isCompleted = step.status === "COMPLETED";
          const isFailed = step.status === "FAILED";
          const isInProgress = step.status === "IN_PROGRESS";
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
          } else if (isActive || isInProgress) {
            colorClasses = displayConfig.colors.active;
          } else if (isPlaceholder) {
            // Make placeholder steps more subdued
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
            // Filter out reason from additional data as it's shown in status
            const filteredData = Object.entries(step.data)
              .filter(([key]) => key !== "reason")
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
            additionalData = filteredData;
          }

          return (
            <div
              key={`${step.step}-${index}`}
              className="relative mb-4 last:mb-0 flex items-start w-full"
            >
              {/* Vertical Line */}
              {index !== completeSteps.length - 1 && (
                <div
                  className={`absolute left-[11px] top-6 w-[1px] h-full ${
                    isCompleted ? "bg-green-400" : "bg-gray-300"
                  }`}
                ></div>
              )}

              {/* Step Icon Circle */}
              <div
                className={`relative w-6 h-6 flex items-center justify-center rounded-full border-2 z-10 ${colorClasses}`}
              >
                {isCompleted ? (
                  <FaCheck size={10} />
                ) : isFailed ? (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                ) : isActive || isInProgress ? (
                  <FaClock size={10} />
                ) : (
                  <Icon size={10} />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pl-3">
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      isFailed
                        ? "text-red-700"
                        : isCompleted
                        ? "text-green-700"
                        : isActive || isInProgress
                        ? "text-blue-600"
                        : isPlaceholder
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {displayLabel}
                  </p>

                  {/* Status display */}
                  {!isPlaceholder && (
                    <p
                      className={`text-xs mt-0.5 ${
                        isFailed
                          ? "text-red-600"
                          : isCompleted
                          ? "text-gray-500"
                          : isActive || isInProgress
                          ? "text-blue-600 italic"
                          : "text-gray-400 italic"
                      }`}
                    >
                      {statusText}
                    </p>
                  )}

                  {/* Show additional data if available */}
                  {additionalData && !isPlaceholder && (
                    <p className="text-xs text-blue-600 mt-0.5">
                      {additionalData}
                    </p>
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
