import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Alert, Button, Icon } from '../lib';

const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
    args: {
        content: 'Alert',
        onClose: undefined
    }
};

export const WithIcon: Story = {
    args: {
        content: 'Alert',
        icon: <Icon name="star" />,
        onClose: undefined
    }
};

export const Start: Story = {
    args: {
        content: 'Alert',
        start: '🌳',
        onClose: undefined
    }
};

export const End: Story = {
    args: {
        content: 'Alert',
        end: '🌳',
        onClose: undefined
    }
};

export const Action: Story = {
    args: {
        content: 'Alert',
        action: <Button content="Action" variant="text" />,
        onClose: undefined
    }
};

export const Closeable: Story = {
    args: {
        content: 'Alert'
    }
};