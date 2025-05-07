import React, { useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { ITimeline, OrderStatus } from "@/types/order"; // Assuming your types are in './types'
import { formatDate } from "@/lib/utils";

// Define the order of progression for statuses (important for logic)
const ORDER_PROGRESSION: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.ACCEPTED,
  OrderStatus.SCHEDULED_PICKUP,
  OrderStatus.EN_ROUTE, // Often an intermediate status before PICKED_UP
  OrderStatus.PICKED_UP,
  OrderStatus.REACHED_STORE,
  OrderStatus.REPAIRING,
  OrderStatus.REPAIRED,
  OrderStatus.SCHEDULED_DELIVERY, // Can be an alternative or precursor to OUT_FOR_DELIVERY
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.COMPLETED,
];

// Configuration for the visual steps in the progress bar
interface MappedStep {
  id: string; // Unique key for React map
  label: string;
  /** The primary OrderStatus that signifies this step's core achievement. */
  statusMarker: OrderStatus;
  /** OrderStatuses that, if current, make THIS visual step the active focus. */
  activeWhenStatusIs: OrderStatus[];
}

const MAPPED_STEPS: MappedStep[] = [
  {
    id: "pickupScheduled",
    label: "Pickup Scheduled",
    statusMarker: OrderStatus.SCHEDULED_PICKUP,
    activeWhenStatusIs: [OrderStatus.SCHEDULED_PICKUP],
  },
  {
    id: "pickedUp",
    label: "Picked Up",
    statusMarker: OrderStatus.PICKED_UP,
    activeWhenStatusIs: [OrderStatus.EN_ROUTE, OrderStatus.PICKED_UP],
  },
  {
    id: "atCenter",
    label: "Arrived at Service Center",
    statusMarker: OrderStatus.REACHED_STORE,
    activeWhenStatusIs: [OrderStatus.REACHED_STORE],
  },
  {
    id: "repairing",
    label: "Repairing",
    statusMarker: OrderStatus.REPAIRING,
    activeWhenStatusIs: [OrderStatus.REPAIRING],
  },
  {
    id: "repaired",
    label: "Repair Completed",
    statusMarker: OrderStatus.REPAIRED,
    activeWhenStatusIs: [OrderStatus.REPAIRED],
  },
  {
    id: "outForDelivery",
    label: "Out for Delivery",
    statusMarker: OrderStatus.OUT_FOR_DELIVERY,
    activeWhenStatusIs: [
      OrderStatus.SCHEDULED_DELIVERY,
      OrderStatus.OUT_FOR_DELIVERY,
    ],
  },
  {
    id: "delivered",
    label: "Delivered",
    statusMarker: OrderStatus.DELIVERED,
    activeWhenStatusIs: [OrderStatus.DELIVERED, OrderStatus.COMPLETED],
  },
];

interface OrderProgressBarProps {
  timeline: ITimeline[];
  estimatedDeliveryDate?: string; // e.g., "Sep 30, 2024" or a Date object
  // Pass the whole order if reschedule links need more context or actions
  // orderId?: string;
}

// Helper to determine if a step should get a checkmark
const stepGetsCheck = (
  stepConfig: MappedStep,
  currentGlobalStatus: OrderStatus | undefined,
  orderProgressionList: OrderStatus[]
): boolean => {
  if (!currentGlobalStatus) return false;

  const markerIndex = orderProgressionList.indexOf(stepConfig.statusMarker);
  const currentIndex = orderProgressionList.indexOf(currentGlobalStatus);

  if (markerIndex === -1 || currentIndex === -1) return false;

  // If current status is past this step's marker, it's definitely checked.
  if (currentIndex > markerIndex) return true;

  // If current status IS this step's marker.
  if (currentIndex === markerIndex) {
    // These statuses, when they are the marker AND the current status, mean the step is active but not "done" for checkmark.
    if (
      (stepConfig.statusMarker === OrderStatus.REPAIRING &&
        currentGlobalStatus === OrderStatus.REPAIRING) ||
      (stepConfig.statusMarker === OrderStatus.OUT_FOR_DELIVERY &&
        currentGlobalStatus === OrderStatus.OUT_FOR_DELIVERY)
    ) {
      return false;
    }
    return true; // Otherwise, if current matches marker, it's checked.
  }
  return false; // Current status is before this step's marker.
};

const OrderProgressBar = ({
  timeline,
  estimatedDeliveryDate,
}: OrderProgressBarProps) => {
  // 1. Get the last event for each status type from the props.timeline
  const lastEventByStatus = useMemo(() => {
    const map = new Map<OrderStatus, ITimeline>();
    if (timeline) {
      for (const event of timeline) {
        const createdAt = event.createdAt;
        map.set(event.status, { ...event, createdAt });
      }
    }
    return map;
  }, [timeline]);

  // 2. Determine the actual current (latest) status of the order
  const latestTimelineEvent = useMemo(() => {
    if (!timeline || timeline.length === 0) return null;
    // Sort by createdAt to find the latest
    const sortedTimeline = [...timeline].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });
    const latestEvent = sortedTimeline[sortedTimeline.length - 1];
    if (latestEvent) {
      const createdAt = latestEvent.createdAt;
      return { ...latestEvent, createdAt };
    }
    return null;
  }, [timeline]);

  const currentGlobalStatus = latestTimelineEvent?.status;

  // 3. Determine which visual step is the "current active" one to highlight its label
  let currentActiveDisplayStepIndex = -1;
  if (currentGlobalStatus) {
    currentActiveDisplayStepIndex = MAPPED_STEPS.findIndex((step) =>
      step.activeWhenStatusIs.includes(currentGlobalStatus)
    );
  }
  // If completed, the last step "Delivered" should be active.
  if (
    currentGlobalStatus === OrderStatus.COMPLETED &&
    MAPPED_STEPS[MAPPED_STEPS.length - 1].statusMarker === OrderStatus.DELIVERED
  ) {
    currentActiveDisplayStepIndex = MAPPED_STEPS.length - 1;
  }

  return (
    <div className="flex flex-col items-start w-full max-w-md mx-auto p-4">
      {estimatedDeliveryDate && (
        <p className="text-gray-600 text-sm mb-2">
          Estimated Date of Delivery:{" "}
          <strong>{formatDate(estimatedDeliveryDate)}</strong>
        </p>
      )}

      <div className="relative pl-4 w-full">
        {" "}
        {/* Ensure w-full for proper layout */}
        {MAPPED_STEPS.map((stepConfig, index) => {
          const eventForThisStepMarker = lastEventByStatus.get(
            stepConfig.statusMarker
          );
          const displayMessage =
            eventForThisStepMarker?.message || stepConfig.label;
          const displayDate = eventForThisStepMarker
            ? formatDate(eventForThisStepMarker.createdAt)
            : "";

          const showCheck = stepGetsCheck(
            stepConfig,
            currentGlobalStatus,
            ORDER_PROGRESSION
          );
          const isStepLabelActive = index === currentActiveDisplayStepIndex;

          return (
            <div
              key={stepConfig.id}
              className="relative mb-4 last:mb-0 flex items-start w-full" // items-start for better alignment if text wraps
            >
              {/* Vertical Line - ensure it spans correctly */}
              {index !== MAPPED_STEPS.length - 1 && (
                <div className="absolute left-[11px] top-6 w-[2px] h-full bg-gray-400"></div>
              )}
              {/* Conditional brighter line for completed parts */}
              {showCheck && index !== MAPPED_STEPS.length - 1 && (
                <div className="absolute left-[11px] top-6 w-[2px] h-full bg-gray-600"></div>
              )}

              {/* Step Indicator Circle */}
              <div
                className={`relative w-6 h-6 flex items-center justify-center rounded-full border-2 z-10 ${
                  // z-10 to be above line
                  showCheck
                    ? "bg-gray-600 text-white border-gray-600"
                    : "bg-gray-300 border-gray-600"
                }`}
              >
                {showCheck && <FaCheck size={12} />}
              </div>

              {/* Step Content with Flex Alignment */}
              <div className="flex justify-between items-center w-full pl-4">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      isStepLabelActive ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {stepConfig.label}
                  </p>
                  {eventForThisStepMarker && displayDate && (
                    <p className="text-xs text-gray-500">
                      {displayMessage} <br />{" "}
                      {/* Show message from timeline if available */}
                      {displayDate}
                    </p>
                  )}
                  {!eventForThisStepMarker && isStepLabelActive && (
                    <p className="text-xs text-gray-500 italic">Pending...</p>
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
