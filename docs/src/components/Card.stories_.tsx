import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../lib';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'radio' }
        }
    },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
    args: {
        children: 'Card'
    }
};