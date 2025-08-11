import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, Menu, MenuItem } from '../lib';

const meta: Meta<typeof Menu> = {
    title: 'Components/Menu',
    component: Menu,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic: Story = {
    render(args) {
        return (
            <Menu
                trigger={<Button>Menu</Button>}
                {...args}
            >
                <MenuItem key="1" onClick={() => alert('CLICK ITEM 1')}>Item 1</MenuItem>
                <MenuItem key="2" onClick={() => alert('CLICK ITEM 2')}>Item 2</MenuItem>
                <MenuItem key="3" onClick={() => alert('CLICK ITEM 3')}>Item 3</MenuItem>
            </Menu>
        );
    }
};

export const SubMenu: Story = {
    render(args) {
        return (
            <Menu
                trigger={<Button>Menu</Button>}
                items={[
                    {
                        key: '1',
                        content: 'Item 1',
                        items: [
                            {
                                key: '1-1',
                                content: 'Item 1-1'
                            },
                            {
                                key: '1-2',
                                content: 'Item 1-2'
                            },
                            {
                                key: '1-3',
                                content: 'Item 1-3'
                            }
                        ]
                    },
                    {
                        key: '2',
                        content: 'Item 2',
                        items: [
                            {
                                key: '2-1',
                                content: 'Item 2-1',
                                onClick: () => alert('Item 2-1')
                            },
                            {
                                key: '2-2',
                                content: 'Item 2-2'
                            },
                            {
                                key: '2-3',
                                content: 'Item 2-3'
                            }
                        ]
                    }
                ]}
                {...args}
            />
        );
    }
};

export const SelectedItem: Story = {
    render(args) {
        return (
            <Menu
                trigger={<Button>Menu</Button>}
                {...args}
            >
                <MenuItem key="1" onClick={() => alert('CLICK ITEM 1')}>Item 1</MenuItem>
                <MenuItem key="2" selected onClick={() => alert('CLICK ITEM 2')}>Item 2</MenuItem>
                <MenuItem key="3" onClick={() => alert('CLICK ITEM 3')}>Item 3</MenuItem>
            </Menu>
        );
    }
};
