import path from 'path';
import sass from 'sass';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../docs/src/**/*.mdx',
    '../docs/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: sass,
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(__dirname, '../src/'),
        },
      },
    };

    const scssLoaderRule = newConfig!.module!.rules!.find(
      // @ts-ignore
      (rule) => rule?.test?.toString() === '/\\.s[ac]ss$/'
    );

    if (scssLoaderRule) {
      // @ts-ignore
      scssLoaderRule.use = scssLoaderRule.use.map((item) => {
        if (item?.loader?.match(/[\/\\]css-loader/g)) {
          return {
            ...item,
            options: {
              ...item.options,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          };
        }
        return item;
      });
    }

    return newConfig;
  },
};

export default config;
