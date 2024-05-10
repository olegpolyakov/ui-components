import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../lib';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: { type: 'text' }
        },
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'radio' }
        }
    },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const WithLabel: Story = {
    args: {
        label: 'Label'
    }
};