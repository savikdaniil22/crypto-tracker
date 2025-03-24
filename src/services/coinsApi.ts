import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoin } from "../types";

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coincap.io/v2/" }),
  endpoints: (builder) => ({
    getCoins: builder.query<ICoin[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => `assets?limit=${limit}&offset=${offset}`,
      transformResponse: (response: { data: ICoin[] }) => response.data,
    }),
  }),
});

export const { useGetCoinsQuery } = coinsApi;
