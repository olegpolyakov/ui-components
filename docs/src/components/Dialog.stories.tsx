import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Dialog } from '../lib';

const meta: Meta<typeof Dialog> = {
    title: 'Components/Dialog',
    component: Dialog,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
    args: {
        title: 'Title',
        content: 'Content'
    }
};

export const LongContent: Story = {
    args: {
        title: 'Title',
        content: <>
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
        </>
    }
};