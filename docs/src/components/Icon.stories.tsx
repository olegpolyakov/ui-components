import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../lib';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
    args: {
        children: <Icon name="star" />
    }
};