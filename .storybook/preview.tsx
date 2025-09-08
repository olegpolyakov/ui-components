import type { Preview } from '@storybook/react-vite';

import { Provider } from '../src';
import theme from './theme';

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <div className={context.globals.theme}>
        <Provider theme={theme.base}>
          <Story />
        </Provider>
      </div>
    ),
  ],
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
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
    }
  }
};

export default preview;
