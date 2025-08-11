import type { Meta, StoryObj } from '@storybook/react';

import { Persona } from '../lib';

const meta: Meta<typeof Persona> = {
    title: 'Components/Persona',
    component: Persona,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Persona>;

export const Basic: Story = {
    args: {
        name: 'Persona'
    }
};

export const Relation: Story = {
    args: {
        name: 'Persona',
        relation: 'Папа'
    }
};