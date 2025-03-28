import React from "react";
import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default preview;
