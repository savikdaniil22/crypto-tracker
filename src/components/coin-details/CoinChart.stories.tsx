import type { Meta, StoryObj } from "@storybook/react";
import { CoinChart } from "./CoinChart";

const meta: Meta<typeof CoinChart> = {
  title: "CoinDetails/CoinChart",
  component: CoinChart,
};

export default meta;
type Story = StoryObj<typeof CoinChart>;

export const Default: Story = {
  args: {
    history: [
      { time: 1711608000000, priceUsd: "56000" },
      { time: 1711611600000, priceUsd: "56200" },
      { time: 1711615200000, priceUsd: "55900" },
    ],
    interval: "d1",
    onIntervalChange: () => alert("Интервал изменён"),
  },
};
