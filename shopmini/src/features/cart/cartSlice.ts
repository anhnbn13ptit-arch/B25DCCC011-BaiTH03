import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import type { RootState } from '../../app/store';

interface CartState { items: CartItem[] }
const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const found = state.items.find((i) => i.product.id === action.payload.id);
      if (found) found.quantity += 1;
      else state.items.push({ product: action.payload, quantity: 1 });
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const found = state.items.find((i) => i.product.id === action.payload.id);
      if (!found) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((i) => i.product.id !== action.payload.id);
      } else {
        found.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartCount = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

export default cartSlice.reducer;