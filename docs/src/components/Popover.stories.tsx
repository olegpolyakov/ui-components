import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, Popover } from '../lib';

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
    render(args) {
        return (
            <Popover
                trigger={<Button>Popover</Button>}
                content="Popover content"
                {...args}
            />
        );
    }
};