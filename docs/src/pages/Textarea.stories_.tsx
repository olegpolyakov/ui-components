import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '../lib';

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: { type: 'text' }
        },
        start: {
            control: { type: 'text' }
        },
        end: {
            control: { type: 'text' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {

};

export const WithLabel: Story = {
    args: {
        label: 'Label'
    }
};

export const StartSlot: Story = {
    args: {
        start: '🌳'
    }
};

export const EndSlot: Story = {
    args: {
        end: '🌳'
    }
};