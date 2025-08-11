import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../lib';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
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

type Story = StoryObj<typeof Input>;

export const Basic: Story = {

};

export const WithLabel: Story = {
    name: 'With a label',
    args: {
        label: 'Label',
        defaultValue: ''
    }
};

export const WithLabelAndValue: Story = {
    name: 'With a label and value',
    args: {
        label: 'Label',
        defaultValue: 'Value'
    }
};

export const StartSlot: Story = {
    name: 'Start slot',
    args: {
        start: '🌳'
    }
};

export const EndSlot: Story = {
    name: 'End slot',
    args: {
        end: '🌳'
    }
};