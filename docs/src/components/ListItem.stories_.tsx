import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from '../lib';

const meta: Meta<typeof ListItem> = {
    title: 'Components/ListItem',
    component: ListItem,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Basic: Story = {
    args: {
        content: 'Item 1'
    }
};

export const Interactive: Story = {
    args: {
        content: 'Item 1',
        interactive: true
    }
};

export const Selected: Story = {
    args: {
        content: 'Item 1',
        interactive: true,
        selected: true
    }
};

export const Disabled: Story = {
    args: {
        content: 'Item 1',
        disabled: true,
        interactive: true
    }
};