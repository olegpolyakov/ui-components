import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../lib';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
    args: {
        content: 'Badge'
    }
};

export const Counter: Story = {
    args: {
        content: '1'
    }
};

export const Status: Story = {};