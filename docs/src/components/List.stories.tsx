import type { Meta, StoryObj } from '@storybook/react';

import { List } from '../lib';

const meta: Meta<typeof List> = {
    title: 'Components/List',
    component: List,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof List>;

export const Basic: Story = {
    args: {
        items: [
            { key: '1', content: 'Item 1' },
            { key: '2', content: 'Item 2' },
            { key: '3', content: 'Item 3' }
        ]
    }
};

export const Interactive: Story = {
    args: {
        interactive: true,
        items: [
            { key: '1', content: 'Item 1' },
            { key: '2', content: 'Item 2' },
            { key: '3', content: 'Item 3' }
        ]
    }
};

export const Selected: Story = {
    args: {
        interactive: true,
        items: [
            { key: '1', content: 'Item 1' },
            { key: '2', content: 'Item 2', selected: true },
            { key: '3', content: 'Item 3' }
        ]
    }
};

export const Disabled: Story = {
    args: {
        interactive: true,
        items: [
            { key: '1', content: 'Item 1' },
            { key: '2', content: 'Item 2', selected: true, disabled: true },
            { key: '3', content: 'Item 3', disabled: true }
        ]
    }
};