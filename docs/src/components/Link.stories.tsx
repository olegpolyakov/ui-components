import type { Meta, StoryObj } from '@storybook/react';

import { Link } from '../lib';

const meta: Meta<typeof Link> = {
    title: 'Components/Link',
    component: Link,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Basic: Story = {
    args: {
        content: 'Link'
    }
};