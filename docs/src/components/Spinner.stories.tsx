import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '../lib';

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {

};