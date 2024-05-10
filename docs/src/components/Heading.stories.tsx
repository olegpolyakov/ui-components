import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../lib';

const meta: Meta<typeof Heading> = {
    title: 'Components/Heading',
    component: Heading,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Basic: Story = {
    args: {
        content: 'Heading'
    }
};

export const StartSlot: Story = {
    args: {
        start: '🌳',
        content: 'Heading'
    }
};

export const EndSlot: Story = {
    args: {
        content: 'Heading',
        end: '🌳'
    }
};