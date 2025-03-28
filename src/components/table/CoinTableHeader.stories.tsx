import type { Meta, StoryObj } from "@storybook/react";
import CoinTableHeader from "./CoinTableHeader";
import { SortField, SortOrder } from "../../types";

const meta: Meta<typeof CoinTableHeader> = {
  title: "Table/CoinTableHeader",
  component: CoinTableHeader,
  args: {
    sortField: "priceUsd",
    sortOrder: "asc",
    onSortChange: (field: SortField) => alert(`Сортировка по: ${field}`),
  },
};

export default meta;
type Story = StoryObj<typeof CoinTableHeader>;

export const Default: Story = {};
