import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, Icon } from '../lib';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        color: {
            defaultValue: undefined
        }
    }
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Text: Story = {
    args: {
        content: 'F'
    }
};

export const WithIcon: Story = {
    args: {
        icon: <Icon name="star" />
    }
};

export const Image: Story = {
    args: {
        src: 'https://randomuser.me/api/portraits/women/0.jpg'
    }
};

export const ImageNotLoaded: Story = {
    name: 'Image (not loaded)',
    args: {
        content: 'F',
        src: 'https://foo.bar'
    }
};