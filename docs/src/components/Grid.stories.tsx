import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Grid, GridItem } from '../lib';

const meta: Meta<typeof Grid> = {
    title: 'Components/Grid',
    component: Grid,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Grid>;

const boxStyles = {
    width: '100%',
    height: '100px',
    backgroundColor: '#029CFD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
};

const Box = props => (
    <div style={boxStyles} {...props} />
);

export const Basic: Story = {
    render: args => {
        return (
            <Grid {...args}>
                <GridItem span="4">
                    <Box>Item 1</Box>
                </GridItem>

                <GridItem span="4">
                    <Box>Item 2</Box>
                </GridItem>

                <GridItem span="4" grid>
                    <GridItem span="4">
                        <Box>Item 3</Box>
                    </GridItem>
                    <GridItem span="4">
                        <Box>Item 3</Box>
                    </GridItem>
                    <GridItem span="4">
                        <Box>Item 3</Box>
                    </GridItem>
                </GridItem>
            </Grid>
        );
    }
};