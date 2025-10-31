# Wallet & Loyalty System - Client Implementation Plan

**Project:** fixamigo-client (Customer-facing Next.js App)  
**Date:** October 30, 2025  
**Status:** 🚧 PLANNING

---

## 📊 Tech Stack Analysis

### Framework & Libraries
- **Next.js 15.4.6** - App Router (React Server Components + Client Components)
- **React 19.1.1** - Latest React with Server Components
- **TypeScript 5** - Type safety
- **Zustand 5.0.3** - State management (with persist middleware)
- **Axios 1.8.3** - HTTP client with interceptors
- **Tailwind CSS 4** - Styling
- **Radix UI** - Headless UI components
- **React Hook Form 7.54.2** - Form management
- **Lucide React** - Icons

### Project Structure
```
app/
  (order)/          # Order & user-related pages (checkout, my-services)
  (root)/           # Public pages
  (blog)/           # Content pages
  (city)/           # SEO city pages
  (campaign)/       # Campaign landing pages (EXISTING!)
components/
  checkoutComps/    # Checkout-specific components
  ui/               # Base shadcn components
lib/
  api.ts            # API functions
  axiosInstance.ts  # Axios configuration
stores/
  userStore.ts      # User auth state (Zustand + persist)
  cartStore.ts      # Shopping cart state
types/
  order.ts          # Order types
  address.ts        # Address types
```

### Key Patterns
- **Server Components** for SEO and data fetching (SSR/ISR)
- **Client Components** for interactivity (`"use client"`)
- **Zustand** for global state (persisted to localStorage)
- **Axios interceptors** for 401 handling → opens auth sheet
- **Custom events** for cross-component communication
- **Route groups** `(order)`, `(root)` for layout organization

---

## 🎯 Implementation Scope

### Phase 1: Core Wallet Features (User-facing)
1. **Wallet Balance Display**
   - Show coins in user profile/header
   - Wallet page with balance, transaction history
   - "My Coins" section in my-services

2. **Wallet at Checkout**
   - Display available coins
   - Coin selection slider/input
   - Real-time total calculation with wallet discount
   - Apply/remove wallet coins

3. **Transaction History**
   - List all wallet transactions
   - Filter by type (earned, spent, expired, refunded)
   - Show transaction details (order, coupon, campaign)

### Phase 2: Coupon System
1. **Coupon Application at Checkout**
   - Coupon code input field
   - Validate coupon button
   - Display coupon discount
   - Show applied coupons list
   - Remove coupon functionality

2. **Available Coupons Display**
   - "Browse Coupons" page or modal
   - Show active coupons with terms
   - One-click apply at checkout

### Phase 3: Campaign Integration
1. **QR Code Landing Page** (already has `(campaign)` folder!)
   - Scan QR → Redeem campaign
   - Show campaign details
   - Award coins on redemption
   - Fraud detection (client-side tracking)

2. **Referral System**
   - Generate referral link
   - Share referral code
   - Track referral rewards
   - Referral leaderboard (optional)

### Phase 4: Order Integration
1. **Order Details Enhancement**
   - Show applied coupons in order summary
   - Display wallet coins used
   - Show loyalty coins earned after completion
   - Price breakdown (original, coupons, wallet, final)

2. **Order Tracking**
   - Show loyalty rewards in order status
   - Notify when coins are credited

---

## 🛠️ Implementation Tasks

### Task 1: Update Types
**Files to modify:**
- `types/order.ts` - Add `coupons[]`, `walletUsed`, `price.breakdown`
- Create `types/wallet.ts` - Wallet transaction types
- Create `types/coupon.ts` - Coupon types
- Create `types/campaign.ts` - Campaign types

### Task 2: API Layer
**Files to create:**
- `lib/walletApi.ts` - Wallet API functions
  - `getWalletBalance()`
  - `getWalletTransactions()`
  
- `lib/couponApi.ts` - Coupon API functions
  - `validateCoupon(code, orderValue, orderData)`
  - `applyCoupon(code, orderId, orderValue)`
  - `removeCoupon(code, orderId)`
  - `getActiveCoupons()`

- `lib/campaignApi.ts` - Campaign API functions
  - `validateCampaign(code)`
  - `redeemCampaign(code)`
  - `getCampaignByCode(code)`
  - `generateReferralLink(campaignId)`

### Task 3: Zustand Store
**Files to create:**
- `stores/walletStore.ts` - Wallet state management
  - `balance: { available, held, lifetime }`
  - `transactions: []`
  - `fetchBalance()`
  - `refreshTransactions()`

### Task 4: Checkout Enhancement
**Files to modify:**
- `app/(order)/repair/checkout/page.tsx` - Main checkout page
  - Add coupon section
  - Add wallet section
  - Integrate checkout calculation API

**Files to create:**
- `components/checkoutComps/checkoutCouponCard.tsx`
  - Coupon input field
  - Validate button
  - Applied coupons list
  - Remove coupon action

- `components/checkoutComps/checkoutWalletCard.tsx`
  - Display available coins
  - Coin selection slider
  - Real-time discount preview

**Files to modify:**
- `components/checkoutComps/checkoutOrderSummary.tsx`
  - Add coupon discount line
  - Add wallet discount line
  - Show final total with discounts

### Task 5: Wallet Page
**Files to create:**
- `app/(order)/wallet/page.tsx` - Wallet dashboard
  - Balance overview
  - Recent transactions
  - Earn more coins CTA

- `components/wallet/WalletBalance.tsx`
  - Display available/held/lifetime coins
  - Visual coin representation

- `components/wallet/TransactionList.tsx`
  - Transaction history with filters
  - Transaction details

### Task 6: Campaign Pages
**Files to create/modify:**
- `app/(campaign)/[code]/page.tsx` - QR/Referral landing page
  - Campaign details
  - Redeem button
  - Success/error states
  - Fraud prevention (IP, device fingerprint)

- `components/campaign/CampaignCard.tsx`
  - Campaign info display
  - Terms & conditions
  - Redeem button

### Task 7: My Services Enhancement
**Files to modify:**
- `app/(order)/my-services/page.tsx`
  - Add "My Wallet" section
  - Link to wallet page

- `app/(order)/my-services/summary/page.tsx` (Order details)
  - Show applied coupons
  - Show wallet usage
  - Show coins earned
  - Enhanced price breakdown

### Task 8: UI Components
**Files to create:**
- `components/ui/coin-badge.tsx` - Coin display component
- `components/ui/coupon-tag.tsx` - Coupon display tag
- `components/wallet/` - Wallet-specific components
- `components/coupon/` - Coupon-specific components

---

## 📋 Detailed Implementation Steps

### Step 1: Type Definitions (30 min)
```typescript
// types/wallet.ts
export interface IWalletBalance {
  available: number;
  held: number;
  lifetime: number;
}

export interface IWalletTransaction {
  _id: string;
  userId: string;
  type: 'CREDIT' | 'DEBIT' | 'HOLD' | 'RELEASE' | 'EXPIRE';
  amount: number;
  balance: number;
  reason: string;
  metadata?: {
    orderId?: string;
    couponId?: string;
    campaignId?: string;
  };
  createdAt: Date;
}

// types/coupon.ts
export interface ICoupon {
  _id: string;
  code: string;
  type: 'PERCENT' | 'FIXED';
  value: number;
  description?: string;
  minOrderValue?: number;
  maxDiscount?: number;
  startDate?: Date;
  expiry?: Date;
  isActive: boolean;
}

export interface ICouponValidation {
  isValid: boolean;
  discount?: number;
  message?: string;
  errors?: string[];
}

// types/campaign.ts
export interface ICampaign {
  _id: string;
  name: string;
  type: 'QR' | 'REFERRAL';
  refCode: string;
  rewardCoins: number;
  referrerRewardCoins?: number;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
}

// Update types/order.ts
export interface IOrder {
  // ... existing fields
  coupons?: Array<{
    code: string;
    couponId: string;
    type: string;
    value: number;
    discount: number;
  }>;
  walletUsed?: {
    amount: number;
    holdId?: string;
    transactionId?: string;
  };
  price: {
    original: number;
    total: number;
    final: number;
    delivery: number;
    breakdown?: {
      subtotal?: number;
      tax?: number;
      couponsTotal?: number;
      walletDeduction?: number;
    };
  };
}
```

### Step 2: API Functions (1 hour)
```typescript
// lib/walletApi.ts
export const getWalletBalance = async () => {
  const response = await api.get('/wallet/balance');
  return response.data.data;
};

export const getWalletTransactions = async (params?: { 
  limit?: number; 
  offset?: number;
  type?: string;
}) => {
  const response = await api.get('/wallet/transactions', { params });
  return response.data.data;
};

// lib/couponApi.ts
export const validateCoupon = async (code: string, orderValue: number, orderData?: any) => {
  const response = await api.post('/order/validate-coupon', { 
    code, 
    orderValue, 
    orderData 
  });
  return response.data.data;
};

export const applyCoupon = async (code: string, orderId: string, orderValue: number, orderData?: any) => {
  const response = await api.post('/order/apply-coupon', { 
    code, 
    orderId, 
    orderValue, 
    orderData 
  });
  return response.data.data;
};

export const removeCoupon = async (code: string, orderId: string) => {
  const response = await api.post('/order/remove-coupon', { code, orderId });
  return response.data.data;
};

export const calculateCheckoutTotal = async (params: {
  orderValue: number;
  walletCoins?: number;
  couponCodes?: string[];
  orderData?: any;
}) => {
  const response = await api.post('/order/checkout/calculate', params);
  return response.data.data;
};

// lib/campaignApi.ts
export const getCampaignByCode = async (code: string) => {
  const response = await api.get(`/campaigns/${code}`);
  return response.data.data;
};

export const validateCampaign = async (code: string, referrerId?: string) => {
  const response = await api.post('/campaigns/validate', { code, referrerId });
  return response.data.data;
};

export const redeemCampaign = async (code: string, referrerId?: string, metadata?: any) => {
  const response = await api.post('/campaigns/redeem', { 
    code, 
    referrerId,
    metadata 
  });
  return response.data.data;
};

export const generateReferralLink = async (campaignId: string) => {
  const response = await api.post(`/campaigns/${campaignId}/referral-link`);
  return response.data.data;
};
```

### Step 3: Wallet Store (30 min)
```typescript
// stores/walletStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IWalletBalance, IWalletTransaction } from "@/types/wallet";

interface WalletState {
  balance: IWalletBalance | null;
  transactions: IWalletTransaction[];
  isLoading: boolean;
  setBalance: (balance: IWalletBalance) => void;
  setTransactions: (transactions: IWalletTransaction[]) => void;
  setLoading: (loading: boolean) => void;
  clearWallet: () => void;
}

const INITIAL_STATE = {
  balance: null,
  transactions: [],
  isLoading: false,
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setBalance: (balance) => set({ balance }),
      setTransactions: (transactions) => set({ transactions }),
      setLoading: (isLoading) => set({ isLoading }),
      clearWallet: () => set(INITIAL_STATE),
    }),
    {
      name: "wallet-storage",
    }
  )
);
```

### Step 4: Checkout Integration (2-3 hours)
**Modify `app/(order)/repair/checkout/page.tsx`:**
- Add state for coupons and wallet
- Add coupon validation/application logic
- Add wallet selection logic
- Integrate real-time total calculation API
- Update order summary component

**Create `components/checkoutComps/checkoutCouponCard.tsx`:**
- Coupon input + validate button
- Applied coupons display
- Remove coupon functionality
- Error/success states

**Create `components/checkoutComps/checkoutWalletCard.tsx`:**
- Display available coins
- Slider for coin selection
- Real-time discount calculation
- Max coins validation

### Step 5: Wallet Dashboard (2 hours)
**Create `app/(order)/wallet/page.tsx`:**
- Client component with wallet data fetching
- Balance overview cards
- Transaction list
- Earn more coins section

### Step 6: Campaign Landing (1-2 hours)
**Create `app/(campaign)/[code]/page.tsx`:**
- Server component for SEO
- Fetch campaign details
- Client component for redemption
- Success/error handling

### Step 7: Order Details Enhancement (1 hour)
**Modify `app/(order)/my-services/summary/page.tsx`:**
- Display applied coupons
- Show wallet usage
- Enhanced price breakdown
- Loyalty coins earned badge

---

## 🎨 UI/UX Considerations

### Design Patterns
1. **Coin Display**
   - Use coin icon (🪙) or custom SVG
   - Format: "1,234 coins" or "₹1,234 in coins"
   - Color: Gold/yellow theme

2. **Coupon Tags**
   - Badge style with discount amount
   - Remove icon (×)
   - Success state (green border)

3. **Wallet Card**
   - Available vs held coins distinction
   - Progress bar for coin usage
   - "Max" button for slider

4. **Transaction List**
   - Credit (green +)
   - Debit (red -)
   - Expiry (gray)
   - Date + reason + amount

### Responsive Design
- Mobile-first approach
- Sticky coupon/wallet cards on mobile
- Bottom sheet for coupon selection
- Swipe gestures for transaction list

---

## 🧪 Testing Checklist

### Coupon Testing
- [ ] Apply valid coupon → discount shown
- [ ] Apply invalid coupon → error message
- [ ] Apply expired coupon → error
- [ ] Remove coupon → total recalculated
- [ ] Multiple coupons stacking (if allowed)
- [ ] Min order value validation

### Wallet Testing
- [ ] Display correct balance
- [ ] Select coins → total updated
- [ ] Max coins = min(balance, order total)
- [ ] Wallet + coupon combination
- [ ] Insufficient balance handling
- [ ] Transaction history pagination

### Campaign Testing
- [ ] QR code scan → redeem campaign
- [ ] Duplicate redemption prevention
- [ ] Referral link generation
- [ ] Referrer reward attribution
- [ ] Fraud detection (same IP/device)

### Order Integration
- [ ] Checkout → coupons/wallet applied
- [ ] Order completion → coins credited
- [ ] Order cancellation → wallet refunded
- [ ] Order details show breakdown

---

## 📦 Deliverables

### Code Files
1. **Types** (4 files)
   - `types/wallet.ts`
   - `types/coupon.ts`
   - `types/campaign.ts`
   - Updated `types/order.ts`

2. **API Layer** (3 files)
   - `lib/walletApi.ts`
   - `lib/couponApi.ts`
   - `lib/campaignApi.ts`

3. **Stores** (1 file)
   - `stores/walletStore.ts`

4. **Pages** (3 new/modified)
   - `app/(order)/wallet/page.tsx` (new)
   - `app/(campaign)/[code]/page.tsx` (new/modify)
   - Modified checkout page

5. **Components** (~10 files)
   - Checkout: coupon card, wallet card
   - Wallet: balance, transactions
   - Campaign: landing, redemption
   - UI: coin badge, coupon tag

### Documentation
- Component usage guide
- API integration guide
- Testing documentation

---

## ⏱️ Estimated Timeline

| Phase | Tasks | Time |
|-------|-------|------|
| 1. Types & API | Type defs + API functions | 2 hours |
| 2. Wallet Store | Zustand store setup | 30 min |
| 3. Checkout UI | Coupon + Wallet cards | 3 hours |
| 4. Wallet Page | Dashboard + transactions | 2 hours |
| 5. Campaign | Landing page + redemption | 2 hours |
| 6. Order Details | Enhancement + breakdown | 1 hour |
| 7. Testing | E2E testing | 2 hours |
| **Total** | | **~12-14 hours** |

---

## 🚀 Implementation Priority

### High Priority (MVP)
1. ✅ Types and API layer
2. ✅ Checkout coupon application
3. ✅ Checkout wallet usage
4. ✅ Order total calculation
5. ✅ Wallet balance display

### Medium Priority
1. ⏸️ Wallet dashboard page
2. ⏸️ Transaction history
3. ⏸️ Order details enhancement
4. ⏸️ Campaign QR landing

### Low Priority (Nice to Have)
1. ⏸️ Coupon browse page
2. ⏸️ Referral leaderboard
3. ⏸️ Wallet insights/analytics
4. ⏸️ Push notifications for coins

---

## 📝 Notes

### Server Components vs Client Components
- **Server Components**: Campaign landing (SEO), wallet page (initial data)
- **Client Components**: Checkout (interactivity), coupon input, wallet slider

### State Management Strategy
- **Zustand**: Wallet balance (persisted)
- **React State**: Checkout temporary state (coupons, wallet selection)
- **Server State**: Order data (fetched on mount)

### API Patterns
- Use existing `api` instance from `lib/axiosInstance.ts`
- Follow existing patterns in `lib/api.ts`
- Handle 401 → auth sheet (already configured in interceptor)

### Styling
- Use Tailwind utility classes
- Follow existing component patterns in `components/checkoutComps/`
- Radix UI for modals, popovers, accordions

---

## ✅ Ready to Implement!

This plan provides a complete roadmap for implementing the wallet and loyalty system in the customer-facing Next.js app. The implementation will integrate seamlessly with the existing checkout flow and maintain consistency with the current design patterns.

**Next Step:** Start with Phase 1 - Types & API Layer
