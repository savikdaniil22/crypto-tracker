import type { Meta, StoryObj } from "@storybook/react";
import { CoinRow } from "./CoinRow";
import { MemoryRouter } from "react-router-dom";
import { ICoin } from "../../types";

const mockCoin: ICoin = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  rank: 1,
  priceUsd: "56000",
  marketCapUsd: "1000000000000",
  changePercent24Hr: "2.5",
  supply: "19000000",
  maxSupply: "21000000",
};

const meta: Meta<typeof CoinRow> = {
  title: "Table/CoinRow",
  component: CoinRow,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    coin: mockCoin,
    onAddClick: () => alert("Добавить монету"),
  },
};

export default meta;
type Story = StoryObj<typeof CoinRow>;

export const Default: Story = {};
