import type { Meta, StoryObj } from '@storybook/react-vite';

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
        content: ''
    }
};

export const Counter: Story = {
    args: {
        content: '1'
    }
};