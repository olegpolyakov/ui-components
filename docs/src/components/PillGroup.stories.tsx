import type { Meta, StoryObj } from '@storybook/react';

import { PillGroup } from '../lib';

const meta: Meta<typeof PillGroup> = {
    title: 'Components/PillGroup',
    component: PillGroup,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof PillGroup>;

export const Basic: Story = {
    args: {
        pills: [
            { content: 'Pill 1' },
            { content: 'Pill 2' },
            { content: 'Pill 3' }
        ]
    }
};

export const MaxCount: Story = {
    args: {
        pills: [
            { content: 'Pill' },
            { content: 'Pill' },
            { content: 'Pill' },
            { content: 'Pill' },
            { content: 'Pill' }
        ],
        maxCount: 3
    }
};