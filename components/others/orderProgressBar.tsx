import React, { useMemo } from "react";
import {
  FaCheck,
  FaClipboardCheck,
  FaTruck,
  FaTools,
  FaHome,
  FaClock,
} from "react-icons/fa";
import { IStepper } from "@/types/order";
import { formatDate } from "@/lib/utils";

// Configuration for the combined visual steps in the progress bar
interface CombinedStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  backendSteps: string[]; // Array of backend step names that belong to this UI step
  progressiveLabels?: {
    initial: string;
    intermediate?: string[];
    completed: string;
  };
  colors: {
    pending: string;
    active: string;
    completed: string;
  };
}

const COMBINED_STEPS: CombinedStep[] = [
  {
    id: "confirmation",
    label: "Order & Price Confirmation",
    icon: FaClipboardCheck,
    backendSteps: ["Order Confirmation", "Price Confirmation"],
    progressiveLabels: {
      initial: "Confirming Order",
      intermediate: ["Price Confirmation"],
      completed: "Confirmed",
    },
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-blue-100 border-blue-500 text-blue-600",
      completed: "bg-green-500 border-green-500 text-white",
    },
  },
  {
    id: "pickup",
    label: "Pickup & Collection",
    icon: FaTruck,
    backendSteps: ["Pickup Scheduled", "Agent En Route", "Device Picked Up"],
    progressiveLabels: {
      initial: "Scheduling Pickup",
      intermediate: ["Agent En Route", "Collecting Device"],
      completed: "Device Collected",
    },
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-orange-100 border-orange-500 text-orange-600",
      completed: "bg-green-500 border-green-500 text-white",
    },
  },
  {
    id: "repair",
    label: "Repair & Quality Check",
    icon: FaTools,
    backendSteps: ["Repair Assessment", "Repairing", "Quality Check"],
    progressiveLabels: {
      initial: "Assessing Device",
      intermediate: ["Repairing", "Quality Check"],
      completed: "Repair Completed",
    },
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-purple-100 border-purple-500 text-purple-600",
      completed: "bg-green-500 border-green-500 text-white",
    },
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: FaHome,
    backendSteps: ["Delivery Scheduled", "On the Way"],
    progressiveLabels: {
      initial: "Scheduling Delivery",
      intermediate: ["Out for Delivery"],
      completed: "Delivered",
    },
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-indigo-100 border-indigo-500 text-indigo-600",
      completed: "bg-green-500 border-green-500 text-white",
    },
  },
  {
    id: "completed",
    label: "Completed",
    icon: FaCheck,
    backendSteps: ["Completed"],
    progressiveLabels: {
      initial: "Finalizing",
      completed: "Completed",
    },
    colors: {
      pending: "bg-gray-300 border-gray-400 text-gray-500",
      active: "bg-green-100 border-green-500 text-green-600",
      completed: "bg-green-500 border-green-500 text-white",
    },
  },
];

interface OrderProgressBarProps {
  stepper: IStepper[];
  estimatedDeliveryDate?: string; // e.g., "Sep 30, 2024" or a Date object
}

// Helper to get progressive label based on completed substeps
const getProgressiveLabel = (
  combinedStep: CombinedStep,
  stepper: IStepper[]
): { label: string; lastCompletedStep?: IStepper } => {
  if (!combinedStep.progressiveLabels) {
    return { label: combinedStep.label };
  }

  const relatedSteps = stepper.filter((step) =>
    combinedStep.backendSteps.some(
      (backendStep) =>
        step.step.toLowerCase().includes(backendStep.toLowerCase()) ||
        backendStep.toLowerCase().includes(step.step.toLowerCase())
    )
  );

  const completedSteps = relatedSteps.filter(
    (step) => step.status === "COMPLETED"
  );

  // If no steps completed, show initial label
  if (completedSteps.length === 0) {
    return { label: combinedStep.progressiveLabels.initial };
  }

  // Find the last completed step
  const lastCompleted = completedSteps.reduce((latest, current) => {
    if (!latest.completedAt || !current.completedAt) return latest;
    return new Date(current.completedAt) > new Date(latest.completedAt)
      ? current
      : latest;
  });

  // If all steps completed, show completed label with last completed step
  if (
    completedSteps.length === relatedSteps.length ||
    completedSteps.length === combinedStep.backendSteps.length
  ) {
    return {
      label: combinedStep.progressiveLabels.completed,
      lastCompletedStep: lastCompleted,
    };
  }

  // For partial completion, determine which intermediate label to show
  const { intermediate } = combinedStep.progressiveLabels;
  if (intermediate && intermediate.length > 0) {
    // Special handling for confirmation step
    if (combinedStep.id === "confirmation") {
      // If Order Confirmation is done, show "Price Confirmation"
      const orderConfirmationDone = completedSteps.some((step) =>
        step.step.toLowerCase().includes("order confirmation")
      );
      const priceConfirmationDone = completedSteps.some((step) =>
        step.step.toLowerCase().includes("price confirmation")
      );

      if (orderConfirmationDone && !priceConfirmationDone) {
        // Order confirmed but price confirmation pending
        return {
          label: "Price Confirmation",
          lastCompletedStep: undefined, // Don't show completion time for pending step
        };
      } else if (orderConfirmationDone) {
        return {
          label: "Price Confirmation",
          lastCompletedStep: lastCompleted,
        };
      }
    }

    // For other steps, show appropriate intermediate label based on progress
    const progressIndex = Math.min(
      completedSteps.length - 1,
      intermediate.length - 1
    );
    return {
      label: intermediate[progressIndex],
      lastCompletedStep: lastCompleted,
    };
  }

  return { label: combinedStep.progressiveLabels.initial };
};

// Helper to determine step status based on stepper data
const getStepStatus = (
  combinedStep: CombinedStep,
  stepper: IStepper[]
): {
  status: "pending" | "active" | "completed";
  latestStep?: IStepper;
  completedAt?: Date;
} => {
  const relatedSteps = stepper.filter((step) =>
    combinedStep.backendSteps.some(
      (backendStep) =>
        step.step.toLowerCase().includes(backendStep.toLowerCase()) ||
        backendStep.toLowerCase().includes(step.step.toLowerCase())
    )
  );

  if (relatedSteps.length === 0) {
    return { status: "pending" };
  }

  const completedSteps = relatedSteps.filter(
    (step) => step.status === "COMPLETED"
  );
  const pendingSteps = relatedSteps.filter((step) => step.status === "PENDING");

  // If all related steps are completed
  if (completedSteps.length === relatedSteps.length) {
    const latestCompleted = completedSteps.reduce((latest, current) => {
      if (!latest.completedAt || !current.completedAt) return latest;
      return new Date(current.completedAt) > new Date(latest.completedAt)
        ? current
        : latest;
    });
    return {
      status: "completed",
      latestStep: latestCompleted,
      completedAt: latestCompleted.completedAt,
    };
  }

  // If some steps are completed or there are pending steps
  if (completedSteps.length > 0 || pendingSteps.length > 0) {
    const latestStep = [...completedSteps, ...pendingSteps].reduce(
      (latest, current) => {
        if (!latest.completedAt && !current.completedAt) return latest;
        if (!latest.completedAt) return current;
        if (!current.completedAt) return latest;
        return new Date(current.completedAt) > new Date(latest.completedAt)
          ? current
          : latest;
      }
    );
    return { status: "active", latestStep };
  }

  return { status: "pending" };
};

const OrderProgressBar = ({
  stepper,
  estimatedDeliveryDate,
}: OrderProgressBarProps) => {
  // Calculate step statuses
  const stepStatuses = useMemo(() => {
    // If no stepper data, show first step as active, rest as pending
    if (!stepper || stepper.length === 0) {
      return COMBINED_STEPS.map((step, index) => ({
        ...step,
        status: index === 0 ? ("active" as const) : ("pending" as const),
        latestStep: undefined,
        completedAt: undefined,
      }));
    }

    return COMBINED_STEPS.map((step) => ({
      ...step,
      ...getStepStatus(step, stepper),
    }));
  }, [stepper]);

  // Find the current active step (first non-completed step)
  const currentActiveStepIndex = useMemo(() => {
    const activeIndex = stepStatuses.findIndex(
      (step) => step.status === "active"
    );
    if (activeIndex !== -1) return activeIndex;

    const firstPendingIndex = stepStatuses.findIndex(
      (step) => step.status === "pending"
    );
    return firstPendingIndex !== -1
      ? firstPendingIndex
      : stepStatuses.length - 1;
  }, [stepStatuses]);

  return (
    <div className="flex flex-col items-start w-full max-w-md mx-auto p-4">
      {estimatedDeliveryDate && (
        <p className="text-gray-600 text-sm mb-4">
          Estimated Date of Delivery: <strong>{estimatedDeliveryDate}</strong>
        </p>
      )}

      <div className="relative pl-4 w-full">
        {stepStatuses.map((stepData, index) => {
          const Icon = stepData.icon;
          const isActive = index === currentActiveStepIndex;
          const isCompleted = stepData.status === "completed";

          // Get progressive label and completion info
          const progressiveInfo = getProgressiveLabel(stepData, stepper);

          // Determine colors based on status
          let colorClasses = stepData.colors.pending;
          if (isCompleted) {
            colorClasses = stepData.colors.completed;
          } else if (isActive) {
            colorClasses = stepData.colors.active;
          }

          // Show completion time or current step data
          let timeDisplay = "";
          let additionalData = "";

          // For completed steps, show the last completed substep's time
          // Special handling for confirmation step - don't show time if price confirmation is pending
          if (
            stepData.id === "confirmation" &&
            progressiveInfo.label === "Price Confirmation"
          ) {
            // Don't show completion time when price confirmation is still pending/active
            timeDisplay = "";
          } else if (progressiveInfo.lastCompletedStep?.completedAt) {
            timeDisplay = formatDate(
              progressiveInfo.lastCompletedStep.completedAt
            );
          } else if (stepData.completedAt) {
            timeDisplay = formatDate(stepData.completedAt);
          }

          if (
            stepData.latestStep?.data &&
            Object.keys(stepData.latestStep.data).length > 0
          ) {
            additionalData = Object.entries(stepData.latestStep.data)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ");
          }

          return (
            <div
              key={stepData.id}
              className="relative mb-6 last:mb-0 flex items-start w-full"
            >
              {/* Vertical Line */}
              {index !== stepStatuses.length - 1 && (
                <div className="absolute left-[15px] top-8 w-[2px] h-full bg-gray-300"></div>
              )}
              {/* Completed line section */}
              {isCompleted && index !== stepStatuses.length - 1 && (
                <div className="absolute left-[15px] top-8 w-[2px] h-full bg-green-400"></div>
              )}

              {/* Step Icon Circle */}
              <div
                className={`relative w-8 h-8 flex items-center justify-center rounded-full border-2 z-10 ${colorClasses}`}
              >
                {isCompleted ? (
                  <FaCheck size={14} />
                ) : isActive ? (
                  <FaClock size={14} />
                ) : (
                  <Icon size={14} />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pl-4">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isCompleted
                        ? "text-green-700"
                        : isActive
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {progressiveInfo.label}
                  </p>

                  {/* Show completion time with special handling for confirmation step */}
                  {timeDisplay && (
                    <p className="text-xs text-gray-500 mt-1">
                      {stepData.id === "confirmation" &&
                      progressiveInfo.label === "Confirmed"
                        ? `Price Confirmation completed: ${timeDisplay}`
                        : `Completed: ${timeDisplay}`}
                    </p>
                  )}

                  {/* Show current status for price confirmation when pending */}
                  {stepData.id === "confirmation" &&
                    progressiveInfo.label === "Price Confirmation" &&
                    !timeDisplay && (
                      <p className="text-xs text-blue-600 italic mt-1">
                        Waiting for price confirmation...
                      </p>
                    )}

                  {/* Show additional data if available and it's the current active step */}
                  {additionalData && isActive && (
                    <p className="text-xs text-blue-600 mt-1">
                      {additionalData}
                    </p>
                  )}

                  {/* Show pending status for non-completed, non-active steps */}
                  {!isCompleted && !isActive && (
                    <p className="text-xs text-gray-400 italic mt-1">
                      Pending...
                    </p>
                  )}

                  {/* Show current status for active step */}
                  {isActive && !timeDisplay && (
                    <p className="text-xs text-blue-600 italic mt-1">
                      In Progress...
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
