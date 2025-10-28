import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API and cache keys
const BASE = "https://fakestoreapi.com";
const LIST_KEY = "nua_products_v1";
const CATS_KEY = "nua_categories_v1";
const DETAILS_KEY = "nua_product_details_v1";

//  Fetch all products (with caching)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const cached = localStorage.getItem(LIST_KEY);
      if (cached) return JSON.parse(cached);
      const res = await axios.get(`${BASE}/products`);
      localStorage.setItem(LIST_KEY, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  }
);

//  Fetch all categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    try {
      const cached = localStorage.getItem(CATS_KEY);
      if (cached) return JSON.parse(cached);
      const res = await axios.get(`${BASE}/products/categories`);
      localStorage.setItem(CATS_KEY, JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error("Error fetching categories:", err);
      throw err;
    }
  }
);

//  Fetch product by ID (with local cache)
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    try {
      const cachedAll = JSON.parse(localStorage.getItem(DETAILS_KEY) || "{}");
      if (cachedAll[id]) return cachedAll[id];
      const res = await axios.get(`${BASE}/products/${id}`);
      cachedAll[id] = res.data;
      localStorage.setItem(DETAILS_KEY, JSON.stringify(cachedAll));
      return res.data;
    } catch (err) {
      console.error(`Error fetching product with ID ${id}:`, err);
      throw err;
    }
  }
);

//  Initial state for products
const initialState = {
  list: [],
  categories: [],
  details: {},
  status: "idle",
  error: null,
  page: 1,
  perPage: 8,
  lastFetched: null,
};

//  Slice setup
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    clearProductsCache(state) {
      state.list = [];
      localStorage.removeItem(LIST_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.list = a.payload;
        s.lastFetched = Date.now();
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(fetchCategories.fulfilled, (s, a) => {
        s.categories = a.payload;
      })
      .addCase(fetchProductById.fulfilled, (s, a) => {
        s.details[a.payload.id] = a.payload;
      });
  },
});

export const { setPage, clearProductsCache } = productsSlice.actions;
export default productsSlice.reducer;
