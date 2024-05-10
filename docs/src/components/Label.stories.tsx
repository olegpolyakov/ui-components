import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../lib';

const meta: Meta<typeof Label> = {
    title: 'Components/Label',
    component: Label,
    argTypes: {
        start: {
            type: 'string'
        },
        end: {
            type: 'string'
        }
    },
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
    args: {
        content: 'Label'
    }
};