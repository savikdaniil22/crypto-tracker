import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICoin } from "../types";

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coincap.io/v2/" }),
  endpoints: (builder) => ({
    getCoins: builder.query<ICoin[], { limit: number; offset: number; sort?: string; search?: string }>({
      query: ({ limit, offset, sort, search }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
        });

        if (sort) params.append("sort", sort);
        if (search) params.append("search", search);

        return `assets?${params.toString()}`;
      },
      transformResponse: (response: { data: ICoin[] }) => response.data,
    }),

    getCoinById: builder.query<ICoin, string>({
      query: (id) => `assets/${id}`,
      transformResponse: (response: { data: ICoin }) => response.data,
    }),

    getCoinHistory: builder.query<any, { id: string; interval: string }>({
      query: ({ id, interval }) => `assets/${id}/history?interval=${interval}`,
      transformResponse: (response: { data: any[] }) => response.data,
    }),
  }),
});

export const { useGetCoinsQuery, useGetCoinByIdQuery, useGetCoinHistoryQuery } = coinsApi;
