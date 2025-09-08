import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, Pill } from '../lib';

const meta: Meta<typeof Pill> = {
    title: 'Components/Pill',
    component: Pill,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Basic: Story = {
    args: {
        content: 'Pill'
    }
};

export const WithIcon: Story = {
    args: {
        icon: <Icon name="star" />,
        content: 'Pill'
    }
};

export const StartSlot: Story = {
    args: {
        start: '🌳',
        content: 'Pill'
    }
};

export const EndSlot: Story = {
    args: {
        content: 'Pill',
        end: '🌳'
    }
};