import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../lib';

const meta: Meta<typeof Text> = {
    title: 'Components/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        start: {
            control: { type: 'text' }
        },
        end: {
            control: { type: 'text' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
    args: {
        content: 'Text'
    }
};

export const StartSlot: Story = {
    args: {
        start: '🌳',
        content: 'Text'
    }
};

export const EndSlot: Story = {
    args: {
        content: 'Text',
        end: '🌳'
    }
};

export const Overflow: Story = {
    render(args) {
        return (
            <div style={{ width: '100px' }}>
                <Text ellipsis {...args}>A very very very very very very long text</Text>
            </div>
        );
    }
};