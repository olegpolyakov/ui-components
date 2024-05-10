import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '../lib';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
    args: {
        items: [
            { key: '1', header: 'Item 1', content: 'Content 1' },
            { key: '2', header: 'Item 2', content: 'Content 2' },
            { key: '3', header: 'Item 3', content: 'Content 3' }
        ]
    }
};