import React from 'react';
import type { Preview } from '@storybook/react';

import { Provider } from '../src';

const preview: Preview = {
  decorators: [
    Story => (
      <Provider>
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
    }
  }
};

export default preview;
