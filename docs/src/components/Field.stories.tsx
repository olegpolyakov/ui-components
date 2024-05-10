import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Field, Input } from '../lib';

const meta: Meta<typeof Field> = {
    title: 'Components/Field',
    component: Field,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Basic: Story = {
    render(args) {
        return (
            <Field label="Label" {...args}>
                <Input />
            </Field>
        );
    }
};