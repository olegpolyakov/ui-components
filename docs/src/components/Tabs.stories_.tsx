import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '../lib';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
    args: {
        items: [
            { key: '1', content: 'Foo', value: 'foo' },
            { key: '2', content: 'Bar', value: 'bar' },
            { key: '3', content: 'Faz', value: 'baz' }
        ]
    }
};

export const WithIcon: Story = {
    args: {
        items: [
            { key: '1', content: 'Settings', icon: 'settings', value: 'foo' },
            { key: '2', content: 'Favorite', icon: 'favorite', value: 'bar' },
            { key: '3', content: 'Bookmarks', icon: 'bookmark', value: 'baz' }
        ]
    }
};

export const Panels: Story = {
    render(args) {
        return (
            <Tabs
                defaultValue="foo"
                items={[
                    { key: '1', content: 'Foo', value: 'foo' },
                    { key: '2', content: 'Bar', value: 'bar' },
                    { key: '3', content: 'Baz', value: 'baz' }
                ]}
            >
                <Tabs.Panel value="foo">
                    Foo
                </Tabs.Panel>
                <Tabs.Panel value="bar">
                    Bar
                </Tabs.Panel>
                <Tabs.Panel value="baz">
                    Baz
                </Tabs.Panel>
            </Tabs>
        );
    }
};