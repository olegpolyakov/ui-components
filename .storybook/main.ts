import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',

  stories: [
    '../docs/src/**/*.mdx',
    '../docs/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-themes',
  ]
};

export default config;
