import type { Meta, StoryObj } from "@storybook/react";
import AddButton from "./AddButton";

const meta: Meta<typeof AddButton> = {
  title: "UI/AddButton",
  component: AddButton,
  args: {
    onClick: () => alert("Добавить"),
  },
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Default: Story = {};
