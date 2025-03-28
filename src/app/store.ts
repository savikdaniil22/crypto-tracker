import { configureStore } from "@reduxjs/toolkit";
import { coinsApi } from "../services/coinsApi";
import portfolioReducer from "./portfolioSlice";

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
