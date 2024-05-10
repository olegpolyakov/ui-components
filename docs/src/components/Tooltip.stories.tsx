// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Text, Tooltip} from '../lib';

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
    args: {
        content: 'Tooltip content',
        placement: 'auto',
        position: 'absolute'
    },
    render(args) {
        return (
            <Tooltip {...args}>
                <Text as="span" inline>Hover over me</Text>
            </Tooltip>
        );
    }
};
