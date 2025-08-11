import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '../lib';

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: { type: 'text' }
        },
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'radio' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};

export const WithLabel: Story = {
    args: {
        label: 'Label'
    }
};