import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  args: {
    page: 1,
    perPage: 10,
    totalPages: 5,
    onNext: () => alert("Следующая страница"),
    onPrev: () => alert("Предыдущая страница"),
    onSetPage: (page: number) => alert(`Страница: ${page}`),
    onSetPerPage: (perPage: number) => alert(`Элементов на странице: ${perPage}`),
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
