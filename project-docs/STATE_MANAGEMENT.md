# State Management

This document explains how state is managed in the Fixamigo client application. The project uses [Zustand](https://github.com/pmndrs/zustand), a small, fast, and scalable state management solution for React.

## Zustand Stores

The application uses two main Zustand stores to manage the global state:

- **`useCartStore`**: Manages the state of the shopping cart.
- **`useUserStore`**: Manages the user's authentication state.

Both stores use the `persist` middleware to save the state to the browser's local storage. This ensures that the state is preserved even after the user closes the browser or refreshes the page.

### `useCartStore`

**File:** `stores/cartStore.ts`

This store manages the items in the user's shopping cart. It provides the following state and actions:

#### State

- `cart`: An object containing an array of cart items.
  - `items`: An array of `CartItem` objects, where each item has a `device` and an array of `spareParts`.

#### Actions

- `addToCart(device: ICartDevice, sparePart: ISparePart)`: Adds a device and a spare part to the cart.
- `removeFromCart(deviceId: string, sparePartId: string)`: Removes a spare part from a device in the cart.
- `isInCart(deviceId: string, sparePartId: string)`: Checks if a specific spare part for a device is in the cart.
- `isCartEmpty()`: Checks if the cart is empty.
- `getTotalPrice(deviceId?: string)`: Calculates the total price of the items in the cart. If a `deviceId` is provided, it calculates the total price for that specific device.
- `hasRangeItems(deviceId?: string)`: Checks if there are any items with a price range in the cart.
- `clearCart()`: Clears all the items from the cart.

### `useUserStore`

**File:** `stores/userStore.ts`

This store manages the user's authentication state. It provides the following state and actions:

#### State

- `user`: An object containing the user's information (`_id`, `name`, `phoneNo`).

#### Actions

- `setUser(user: User)`: Sets the user's information in the state.
- `clearUser()`: Clears the user's information from the state.
- `isLogged()`: Checks if the user is logged in.

## Usage

To use a store in a component, you can import the store and use it as a hook:

```typescript
import { useCartStore } from '@/stores/cartStore';

function MyComponent() {
  const { cart, addToCart } = useCartStore();

  // ...
}
```

## Hydration

The `useHydratedStore` hook in `hooks/useHydratedStore.ts` is used to handle Zustand hydration issues with Next.js server-side rendering. This hook ensures that the client-side state is correctly synced with the server-side state after hydration.
