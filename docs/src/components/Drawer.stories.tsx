import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Drawer, Flex } from '../lib';

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: { type: 'text' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Inline: Story = {
    render(args) {
        return (
            <Flex>
                <Drawer
                    title="Title"
                    content="Content"
                    type="inline"
                    {...args}
                />
                <div style={{ flex: 1 }}>Page Content</div>
            </Flex>
        );
    }
};

export const Overlay: Story = {
    render(args) {
        return (
            <Flex>
                <Drawer
                    title="Title"
                    content="Content"
                    type="overlay"
                    {...args}
                />
                <div style={{ flex: 1 }}>Page Content</div>
            </Flex>
        );
    }
};

export const Modal: Story = {
    render(args) {
        return (
            <Flex>
                <Drawer
                    title="Title"
                    content="Content"
                    type="modal"
                    {...args}
                />
                <div style={{ flex: 1 }}>Page Content</div>
            </Flex>
        );
    }
};

export const LongContent: Story = {
    render(args) {
        return (
            <Flex>
                <Drawer
                    title="Title"
                    content="Content"
                    type="modal"
                    {...args}
                >
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam aperiam esse! Provident veritatis voluptatem odit? Quo debitis atque, neque id facere dolor perferendis consectetur et rem earum voluptates vitae!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ducimus eius aspernatur? Vero eaque voluptates, vel dignissimos, laudantium quasi saepe mollitia ad veritatis asperiores, quis nulla dolorum! Aliquid, laudantium deserunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis aliquid quidem nisi, consequatur optio nemo velit laudantium ipsum, eius vel laboriosam nesciunt saepe tempora error eum modi ut odit?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam aperiam esse! Provident veritatis voluptatem odit? Quo debitis atque, neque id facere dolor perferendis consectetur et rem earum voluptates vitae!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ducimus eius aspernatur? Vero eaque voluptates, vel dignissimos, laudantium quasi saepe mollitia ad veritatis asperiores, quis nulla dolorum! Aliquid, laudantium deserunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis aliquid quidem nisi, consequatur optio nemo velit laudantium ipsum, eius vel laboriosam nesciunt saepe tempora error eum modi ut odit?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam aperiam esse! Provident veritatis voluptatem odit? Quo debitis atque, neque id facere dolor perferendis consectetur et rem earum voluptates vitae!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ducimus eius aspernatur? Vero eaque voluptates, vel dignissimos, laudantium quasi saepe mollitia ad veritatis asperiores, quis nulla dolorum! Aliquid, laudantium deserunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis aliquid quidem nisi, consequatur optio nemo velit laudantium ipsum, eius vel laboriosam nesciunt saepe tempora error eum modi ut odit?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam aperiam esse! Provident veritatis voluptatem odit? Quo debitis atque, neque id facere dolor perferendis consectetur et rem earum voluptates vitae!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ducimus eius aspernatur? Vero eaque voluptates, vel dignissimos, laudantium quasi saepe mollitia ad veritatis asperiores, quis nulla dolorum! Aliquid, laudantium deserunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis aliquid quidem nisi, consequatur optio nemo velit laudantium ipsum, eius vel laboriosam nesciunt saepe tempora error eum modi ut odit?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam aperiam esse! Provident veritatis voluptatem odit? Quo debitis atque, neque id facere dolor perferendis consectetur et rem earum voluptates vitae!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ducimus eius aspernatur? Vero eaque voluptates, vel dignissimos, laudantium quasi saepe mollitia ad veritatis asperiores, quis nulla dolorum! Aliquid, laudantium deserunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis aliquid quidem nisi, consequatur optio nemo velit laudantium ipsum, eius vel laboriosam nesciunt saepe tempora error eum modi ut odit?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veniam aperiam esse! Provident veritatis voluptatem odit? Quo debitis atque, neque id facere dolor perferendis consectetur et rem earum voluptates vitae!</p>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque ducimus eius aspernatur? Vero eaque voluptates, vel dignissimos, laudantium quasi saepe mollitia ad veritatis asperiores, quis nulla dolorum! Aliquid, laudantium deserunt?</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis aliquid quidem nisi, consequatur optio nemo velit laudantium ipsum, eius vel laboriosam nesciunt saepe tempora error eum modi ut odit?</p>
                </Drawer>

                <div style={{ flex: 1 }}>Page Content</div>
            </Flex>
        );
    }
};