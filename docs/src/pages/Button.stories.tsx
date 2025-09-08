import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Icon } from '../lib';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button
    // tags: ['autodocs'],
    // argTypes: {
    //     content: {
    //         control: { type: 'text' }
    //     },
    //     icon: {
    //         control: { type: 'text' }
    //     },
    //     start: {
    //         control: { type: 'text' }
    //     },
    //     end: {
    //         control: { type: 'text' }
    //     }
    // }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
    args: {
        content: 'Button'
    }
};

export const WithIcon: Story = {
    args: {
        icon: <Icon name="star" />,
        content: 'Button'
    }
};

export const WithStartSlot: Story = {
    args: {
        start: '🥷',
        content: 'Button'
    }
};

export const WithEndSlot: Story = {
    args: {
        end: '🥷',
        content: 'Button'
    }
};

export const IconButton: Story = {
    args: {
        icon: <Icon name="star" />
    }
};

export const Fluid: Story = {
    args: {
        content: 'Button',
        fluid: true
    }
};