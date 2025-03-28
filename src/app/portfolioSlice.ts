import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioItem, PortfolioState } from "../types";

const loadFromLocalStorage = (): PortfolioItem[] => {
  try {
    const data = localStorage.getItem("portfolio");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: PortfolioItem[]) => {
  try {
    localStorage.setItem("portfolio", JSON.stringify(items));
  } catch {}
};

const initialState: PortfolioState = {
  items: loadFromLocalStorage(),
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addToPortfolio: (state, action: PayloadAction<PortfolioItem>) => {
      const existing = state.items.find((item) => item.coin.id === action.payload.coin.id);
      if (existing) {
        existing.amount += action.payload.amount;
        existing.valueAtBuy += action.payload.valueAtBuy;
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.coin.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearPortfolio: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToPortfolio, removeFromPortfolio, clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
