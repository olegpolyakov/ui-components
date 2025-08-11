import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup } from '../lib';

const meta: Meta<typeof ButtonGroup> = {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Basic: Story = {
    args: {
        buttons: [
            { content: 'Button 1' },
            { content: 'Button 2' },
            { content: 'Button 3' }
        ]
    }
};

export const Joined: Story = {
    args: {
        joined: true,
        buttons: [
            { content: 'Button 1' },
            { content: 'Button 2' },
            { content: 'Button 3' }
        ]
    }
};

export const Vertical: Story = {
    args: {
        vertical: true,
        buttons: [
            { content: 'Button 1' },
            { content: 'Button 2' },
            { content: 'Button 3' }
        ]
    }
};

export const JoinedVertical: Story = {
    args: {
        joined: true,
        vertical: true,
        buttons: [
            { content: 'Button 1' },
            { content: 'Button 2' },
            { content: 'Button 3' }
        ]
    }
};