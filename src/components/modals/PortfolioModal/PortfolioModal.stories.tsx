import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import PortfolioModal from "./PortfolioModal";

const meta: Meta<typeof PortfolioModal> = {
  title: "Modals/PortfolioModal",
  component: PortfolioModal,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
  args: {
    isOpen: true,
    onClose: () => alert("Закрыто"),
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioModal>;

export const Default: Story = {};
