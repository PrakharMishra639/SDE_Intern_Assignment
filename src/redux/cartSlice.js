import { createSlice } from "@reduxjs/toolkit";

const KEY = "nua_cart_v1";

//  Load saved cart from localStorage
const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
};

//  Helper to recalc total
const calc = (items) => {
  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  return { items, total };
};

//  Initial cart state
const initialState = load();

//  Slice setup
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item or increase qty
    addToCart(state, action) {
      const item = action.payload;
      const exist = state.items.find((i) => i.id === item.id);
      if (exist) {
        exist.qty = Math.min(10, exist.qty + item.qty);
      } else {
        state.items.push({ ...item, qty: item.qty });
      }
      const newState = calc(state.items);
      state.items = newState.items;
      state.total = newState.total;
      localStorage.setItem(KEY, JSON.stringify(state));
    },

    // Update item quantity
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const it = state.items.find((i) => i.id === id);
      if (it) it.qty = Math.min(10, Math.max(1, qty));
      const newState = calc(state.items);
      state.items = newState.items;
      state.total = newState.total;
      localStorage.setItem(KEY, JSON.stringify(state));
    },

    // Remove item
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      const newState = calc(state.items);
      state.items = newState.items;
      state.total = newState.total;
      localStorage.setItem(KEY, JSON.stringify(state));
    },

    // Clear full cart
    clearCart(state) {
      state.items = [];
      state.total = 0;
      localStorage.removeItem(KEY);
    },
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } =
  slice.actions;
export default slice.reducer;
