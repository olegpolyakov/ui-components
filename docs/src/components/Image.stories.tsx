import type { Meta, StoryObj } from '@storybook/react';

import { Image } from '../lib';

const meta: Meta<typeof Image> = {
    title: 'Components/Image',
    component: Image,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Basic: Story = {
    args: {
        src: 'https://famiry.ru/landing-assets/photo-2-0c276a9a.png'
    }
};