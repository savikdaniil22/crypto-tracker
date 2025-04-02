import type { Meta, StoryObj } from "@storybook/react";
import { CoinHeader } from "./CoinHeader";

const meta: Meta<typeof CoinHeader> = {
  title: "CoinDetails/CoinHeader",
  component: CoinHeader,
  args: {
    name: "Ethereum",
    symbol: "ETH",
  },
};

export default meta;
type Story = StoryObj<typeof CoinHeader>;

export const Default: Story = {};
