import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '../lib';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Basic: Story = {
    render(props) {
        return (
            <Table {...props}>
                <Table.Head>
                    <Table.Row>
                        <Table.Cell header>Header 1</Table.Cell>
                        <Table.Cell header>Header 2</Table.Cell>
                        <Table.Cell header>Header 3</Table.Cell>
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Cell 1.1</Table.Cell>
                        <Table.Cell>Cell 1.2</Table.Cell>
                        <Table.Cell>Cell 1.3</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Cell 2.1</Table.Cell>
                        <Table.Cell>Cell 2.2</Table.Cell>
                        <Table.Cell>Cell 2.3</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>Cell 3.1</Table.Cell>
                        <Table.Cell>Cell 3.2</Table.Cell>
                        <Table.Cell>Cell 3.3</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
};