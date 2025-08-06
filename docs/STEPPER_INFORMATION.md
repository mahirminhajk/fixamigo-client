# Order Stepper System - Frontend Developer Guide

## Overview

The order stepper system tracks the progress of repair orders from creation to completion. Each order contains a `stepper` array that represents the current progress through predefined steps.

## Stepper Data Structure

### Basic Step Object

```typescript
interface IStepper {
  step: string; // Step name/type
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  substatus?: string; // Detailed status description
  completedAt?: Date; // When step was completed
  startedAt?: Date; // When step was started
  data?: { [key: string]: string }; // Additional step-specific data (minimal)
}
```

### Step Status Meanings

- **PENDING**: Step not yet started
- **IN_PROGRESS**: Step currently active
- **COMPLETED**: Step finished successfully
- **FAILED**: Step failed (usually due to cancellation/rejection)

## Step Types & Flow

### 1. Order Confirmation

**Step Name**: `"Order Confirmation"`
**Purpose**: Confirms the order has been placed

**Typical Flow**:

- **Status**: Always `COMPLETED` (auto-completed when order is created)
- **Substatus**: `"Order Placed"`
- **When it happens**: Immediately when user places order
- **Data**: Empty object `{}`

**Frontend Display**:

- Always show as completed
- Display order placement confirmation

---

### 2. Price Confirmation (Conditional)

**Step Name**: `"Price Confirmation"`
**Purpose**: Confirms pricing for spare parts with variable pricing

**Typical Flow**:

- **Initial Status**: `PENDING`
- **Initial Substatus**: `"Awaiting Price Confirmation"`
- **Final Status**: `COMPLETED`
- **Final Substatus**: `"Price Confirmed"`
- **When it happens**: Only for orders with range pricing spare parts
- **Data**: Empty object `{}`

**Frontend Display**:

- Only appears for orders with range pricing
- Show pending state until admin confirms prices
- Display price confirmation completion

---

### 3. Pickup

**Step Name**: `"Pickup"`
**Purpose**: Device collection from customer

**Typical Flow**:

1. **Initial**: `PENDING` → `"Scheduling Pickup"`
2. **Scheduled**: `IN_PROGRESS` → `"Pickup Scheduled"`
3. **Agent Assigned**: `IN_PROGRESS` → `"Agent En Route"`
4. **Completed**: `COMPLETED` → `"Device Picked Up"`

**When it happens**: After price confirmation (if needed) or immediately after order confirmation
**Data**: Empty object `{}`

**Frontend Display**:

- Show scheduling phase
- Display when agent is en route (get agent details from `order.agent`)
- Confirm when device is picked up

---

### 4. Repair

**Step Name**: `"Repair"`
**Purpose**: Device repair process

**Typical Flow**:

1. **Assessment**: `IN_PROGRESS` → `"Device Assessment"`
2. **Store Arrival**: `IN_PROGRESS` → `"Device Assessment Complete"`
3. **Repair Start**: `IN_PROGRESS` → `"Repairing Device"`
4. **Completed**: `COMPLETED` → `"Repair Completed"`

**When it happens**: Starts when pickup is completed
**Data**: Empty object `{}`

**Frontend Display**:

- Show assessment phase
- Display repair in progress
- Confirm repair completion

---

### 5. Delivery

**Step Name**: `"Delivery"`
**Purpose**: Device delivery back to customer

**Typical Flow**:

1. **Scheduling**: `IN_PROGRESS` → `"Scheduling Delivery"`
2. **Scheduled**: `IN_PROGRESS` → `"Delivery Scheduled"`
3. **Dispatched**: `IN_PROGRESS` → `"Out for Delivery"`
4. **Completed**: `COMPLETED` → `"Delivered"`

**When it happens**: Starts when repair is completed
**Data**: Empty object `{}`

**Frontend Display**:

- Show delivery scheduling
- Display scheduled delivery (get date from `order.schedules.deliveryDate`)
- Show out for delivery status
- Confirm delivery completion

---

### 6. Completion

**Step Name**: `"Completion"`
**Purpose**: Final order completion and cleanup

**Typical Flow**:

1. **Processing**: `IN_PROGRESS` → `"Processing Completion"`
2. **Completed**: `COMPLETED` → `"Order Completed"`

**When it happens**: After delivery is completed
**Data**: Empty object `{}`

**Frontend Display**:

- Show final processing
- Display order completion celebration/confirmation

## API Endpoints for Stepper Data

### Get Order with Stepper

```http
GET /api/provider/orders/:id
```

**Response Structure**:

```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "code": "O-ABC123",
    "status": "REPAIRING",
    "stepper": [
      {
        "step": "Order Confirmation",
        "status": "COMPLETED",
        "substatus": "Order Placed",
        "completedAt": "2025-08-06T10:00:00Z",
        "data": {}
      },
      {
        "step": "Pickup",
        "status": "COMPLETED",
        "substatus": "Device Picked Up",
        "startedAt": "2025-08-06T11:00:00Z",
        "completedAt": "2025-08-06T14:00:00Z",
        "data": {}
      },
      {
        "step": "Repair",
        "status": "IN_PROGRESS",
        "substatus": "Repairing Device",
        "startedAt": "2025-08-06T14:30:00Z",
        "data": {}
      }
    ],
    "agent": {
      "name": "John Doe",
      "phone": "+1234567890",
      "_id": "agent_id"
    },
    "schedules": {
      "pickupDate": "2025-08-06T12:00:00Z",
      "deliveryDate": "2025-08-08T15:00:00Z"
    }
  }
}
```

### Get Stepper Progress Summary

```http
GET /api/provider/orders/:id/stepper
```

**Response Structure**:

```json
{
  "success": true,
  "data": {
    "progress": {
      "total": 5,
      "completed": 2,
      "inProgress": 1,
      "pending": 2,
      "failed": 0,
      "percentage": 40
    },
    "currentStep": {
      "step": "Repair",
      "status": "IN_PROGRESS",
      "substatus": "Repairing Device"
    },
    "currentStepIndex": 2,
    "nextStep": {
      "step": "Delivery",
      "status": "PENDING",
      "substatus": "Awaiting Repair Completion"
    },
    "isLastStep": false,
    "stepper": [
      /* full stepper array */
    ]
  }
}
```

## Special Scenarios

### Orders with Range Pricing

- Include "Price Confirmation" step after "Order Confirmation"
- Step remains PENDING until admin confirms prices
- Use `order.sparePartsDetails[].price.range` to detect range pricing

### Cancelled Orders

- All non-completed steps marked as FAILED
- Substatus becomes "Cancelled"
- Data contains: `{ "reason": "Order cancelled" }`

### Rejected Orders

- All non-completed steps marked as FAILED
- Substatus becomes "Rejected"
- Data contains: `{ "reason": "Order rejected" }`

## External Data Sources

### Agent Information

- **Source**: `order.agent`
- **Available**: `name`, `phone`, `_id`
- **Use**: Display agent details during pickup phase

### Schedule Information

- **Source**: `order.schedules`
- **Available**: `pickupDate`, `deliveryDate`
- **Use**: Display scheduled dates in pickup/delivery steps

### Order Status

- **Source**: `order.status`
- **Available**: Current order status enum
- **Use**: Cross-reference with stepper progress

## Implementation Guidelines

### Progress Calculation

```typescript
// Calculate progress percentage
const totalSteps = stepper.length;
const completedSteps = stepper.filter(
  (step) => step.status === "COMPLETED"
).length;
const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
```

### Current Step Detection

```typescript
// Find current active step
const currentStep =
  stepper.find((step) => step.status === "IN_PROGRESS") ||
  stepper.find((step) => step.status === "PENDING") ||
  stepper.filter((step) => step.status === "COMPLETED").pop();
```

### Step Status Display

- **COMPLETED**: Show checkmark/success indicator
- **IN_PROGRESS**: Show loading/active indicator
- **PENDING**: Show waiting/inactive indicator
- **FAILED**: Show error/failed indicator

### Time Display

- Use `startedAt` for when step began
- Use `completedAt` for when step finished
- Calculate duration: `completedAt - startedAt`
- Format times according to user locale

## Error Handling

### Missing Steps

- Some orders may have incomplete stepper arrays
- Always check if step exists before displaying
- Gracefully handle missing steps

### Invalid Status

- Validate step status against allowed values
- Default to "PENDING" for unknown status
- Log warnings for invalid data

### Missing Timestamps

- Some older orders may lack `startedAt`/`completedAt`
- Use order `updatedAt` as fallback
- Display relative times when exact times unavailable

## Testing Scenarios

1. **New Order**: Only "Order Confirmation" step completed
2. **Range Pricing Order**: Includes "Price Confirmation" step
3. **In Progress Order**: Multiple steps with different statuses
4. **Completed Order**: All steps completed
5. **Cancelled Order**: Steps marked as failed
6. **Legacy Order**: Missing some stepper data

This documentation provides all the information needed to implement a robust stepper UI without requiring knowledge of the backend implementation details.
