import type { Meta, StoryObj } from '@storybook/react';

import { AvatarGroup } from '../lib';

const meta: Meta<typeof AvatarGroup> = {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

export const Basic: Story = {
    args: {
        avatars: [
            { content: 'A' },
            { content: 'B' },
            { content: 'C' }
        ]
    }
};

export const Overlapping: Story = {
    args: {
        avatars: [
            { content: 'A' },
            { content: 'B' },
            { content: 'C' },
            { content: 'D' }
        ],
        overlapping: true
    }
};

export const MaxCount: Story = {
    args: {
        avatars: [
            { content: 'A' },
            { content: 'B' },
            { content: 'C' },
            { content: 'D' },
            { content: 'E' },
            { content: 'F' }
        ],
        maxCount: 2
    }
};