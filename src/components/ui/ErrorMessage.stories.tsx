import type { Meta, StoryObj } from "@storybook/react";
import ErrorMessage from "./ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
  title: "UI/ErrorMessage",
  component: ErrorMessage,
  args: {
    message: "Произошла ошибка при загрузке данных.",
    onRetry: () => alert("Попробовать снова"),
    onBack: () => alert("Назад"),
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {};
