import type { Meta, StoryObj } from "@storybook/react";
import AddCoinModal from "./AddCoinModal";
import { ICoin } from "../../../types";

const meta: Meta<typeof AddCoinModal> = {
  title: "Modals/AddCoinModal",
  component: AddCoinModal,
  args: {
    isOpen: true,
    onClose: () => alert("Закрыто"),
    coin: {
      id: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      priceUsd: "56000",
      rank: 1,
      marketCapUsd: "1000000000000",
      changePercent24Hr: "2.5",
      supply: "19000000",
      maxSupply: "21000000",
    } satisfies ICoin,
  },
};

export default meta;
type Story = StoryObj<typeof AddCoinModal>;

export const Default: Story = {};
