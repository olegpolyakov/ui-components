import React from 'react';
import type { Preview } from '@storybook/react';

import { Provider } from '../src';
import theme from './theme';

const preview: Preview = {
  decorators: [
    Story => (
      <Provider theme={theme.base}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme
    },
  }
};

export default preview;
