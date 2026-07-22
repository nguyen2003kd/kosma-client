import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
          
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),
      
      removeItem: (id) => 
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),
      
      updateQuantity: (id, quantity) => 
        set((state) => {
          if (quantity <= 0) {
            return get().removeItem(id), state;
          }
          
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),
      
      clearCart: () => 
        set(initialState),
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
