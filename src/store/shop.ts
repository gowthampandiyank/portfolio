import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

export type CartItem = { id: string; title: string; price: number; image: string; size: string; color: string; quantity: number; sku: string };

type ShopState = {
  cart: CartItem[];
  cartOpen: boolean;
  user: User | null;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQty: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useShop = create<ShopState>()(persist((set) => ({
  cart: [], cartOpen: false, user: null,
  addToCart: (item) => set((s) => {
    const key = `${item.id}-${item.size}-${item.color}`;
    const found = s.cart.find((x) => `${x.id}-${x.size}-${x.color}` === key);
    return { cart: found ? s.cart.map((x) => `${x.id}-${x.size}-${x.color}` === key ? { ...x, quantity: x.quantity + 1 } : x) : [...s.cart, { ...item, quantity: 1 }], cartOpen: true };
  }),
  updateQty: (id, quantity) => set((s) => ({ cart: quantity <= 0 ? s.cart.filter((x) => x.id !== id) : s.cart.map((x) => x.id === id ? { ...x, quantity } : x) })),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((x) => x.id !== id) })),
  clearCart: () => set({ cart: [] }),
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setUser: (user) => set({ user }),
}), { name: 'inkforge-shop' }));
