import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioItem, PortfolioState } from "../types/index";

const initialState: PortfolioState = {
  items: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addToPortfolio: (state, action: PayloadAction<PortfolioItem>) => {
      const existing = state.items.find((item) => item.coin.id === action.payload.coin.id);
      if (existing) {
        existing.amount += action.payload.amount;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addToPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
