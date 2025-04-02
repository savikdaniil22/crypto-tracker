import type { Meta, StoryObj } from "@storybook/react";
import { CoinStatsGrid } from "./CoinStatsGrid";
import { ICoin } from "../../types";

const meta: Meta<typeof CoinStatsGrid> = {
  title: "CoinDetails/CoinStatsGrid",
  component: CoinStatsGrid,
  args: {
    coin: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      priceUsd: "56000",
      marketCapUsd: "1000000000000",
      changePercent24Hr: "2.5",
      supply: "19000000",
      maxSupply: "21000000",
    } satisfies ICoin,
  },
};

export default meta;
type Story = StoryObj<typeof CoinStatsGrid>;

export const Default: Story = {};
