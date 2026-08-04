import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  sku?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  shippingFee: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getGrandTotal: () => number;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  items: [],
  total: 0,
  shippingFee: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const calculateShipping = (subtotal: number): number => {
  // Free shipping for orders over $500, otherwise $49.99
  return subtotal > 500 ? 0 : 49.99;
};

/**
 * Cart Store - Zustand
 * Persisted to localStorage
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);

          let updatedItems: CartItem[];
          if (existingItem) {
            updatedItems = state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updatedItems = [...state.items, { ...newItem, quantity: 1 }];
          }

          const subtotal = calculateTotal(updatedItems);
          const shippingFee = calculateShipping(subtotal);

          return {
            items: updatedItems,
            total: subtotal + shippingFee,
            shippingFee,
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          const subtotal = calculateTotal(updatedItems);
          const shippingFee = calculateShipping(subtotal);

          return {
            items: updatedItems,
            total: subtotal + shippingFee,
            shippingFee,
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            get().removeItem(id);
            return state;
          }

          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );

          const subtotal = calculateTotal(updatedItems);
          const shippingFee = calculateShipping(subtotal);

          return {
            items: updatedItems,
            total: subtotal + shippingFee,
            shippingFee,
          };
        }),

      clearCart: () =>
        set(initialState),

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getSubtotal: () => {
        return calculateTotal(get().items);
      },

      getGrandTotal: () => {
        const subtotal = calculateTotal(get().items);
        const shippingFee = calculateShipping(subtotal);
        return subtotal + shippingFee;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
