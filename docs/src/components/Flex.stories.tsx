import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from '../lib';

const meta: Meta<typeof Flex> = {
    title: 'Components/Flex',
    component: Flex,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Flex>;

const boxStyles = {
    width: '100px',
    height: '100px',
    backgroundColor: '#029CFD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
};

const Box = (props) => (
    <div style={boxStyles} {...props} />
);

export const Basic: Story = {
    render: (args) => {
        return (
            <Flex {...args}>
                <Box>Item 1</Box>
                <Box>Item 2</Box>
                <Box>Item 3</Box>
            </Flex>
        );
    }
};