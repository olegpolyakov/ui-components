import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Flex, Label, Radio } from '../lib';

const meta: Meta<typeof Radio> = {
    title: 'Components/Radio',
    component: Radio,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: { type: 'text' }
        },
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'radio' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
    args: {

    }
};

export const WithLabel: Story = {
    args: {
        label: 'Label'
    }
};

export const Group: Story = {
    render(args) {
        return (
            <Flex dir="column" gap="small">
                <Label>Пол:</Label>

                <Radio
                    label="Мужской"
                    name="gender"
                    value="male"
                    {...args}
                />

                <Radio
                    label="Женский"
                    name="gender"
                    value="female"
                    {...args}
                />

                <Radio
                    label="Неизвестно"
                    name="gender"
                    value="unknown"
                    {...args}
                />
            </Flex>
        );
    }
};