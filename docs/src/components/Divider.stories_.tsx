import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from '../lib';

const meta: Meta<typeof Divider> = {
    title: 'Components/Divider',
    component: Divider,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal'
    }
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical'
    }
};