import type { Meta, StoryObj } from '@storybook/react';

import { Combobox } from '../lib';

const meta: Meta<typeof Combobox> = {
    title: 'Components/Combobox',
    component: Combobox,
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Basic: Story = {
    args: {
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const WithLabel: Story = {
    args: {
        label: 'With a label',
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const WithSingleValue: Story = {
    name: 'With a single value',
    args: {
        label: 'Label',
        defaultValue: { value: '1', label: 'One' },
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const Multiple: Story = {
    args: {
        label: 'Label',
        multiple: true,
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const WithMultipleValues: Story = {
    name: 'With multiple values',
    args: {
        label: 'Label',
        defaultValue: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' }
        ],
        multiple: true,
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const StartSlot: Story = {
    args: {
        label: 'Label',
        start: '🌳',
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const EndSlot: Story = {
    args: {
        label: 'Label',
        end: '🌳',
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const LongMenu: Story = {
    args: {
        label: 'Label',
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' },
            { value: '4', label: 'Four' },
            { value: '5', label: 'Five' },
            { value: '6', label: 'Six' },
            { value: '7', label: 'Seven' },
            { value: '8', label: 'Eight' },
            { value: '9', label: 'Nine' },
            { value: '10', label: 'Ten' },
            { value: '11', label: 'Eleven' },
            { value: '12', label: 'Twelve' },
            { value: '13', label: 'Thirteen' },
            { value: '14', label: 'Fourteen' },
            { value: '15', label: 'Fifteen' },
            { value: '16', label: 'Sixteen' },
            { value: '17', label: 'Seventeen' },
            { value: '18', label: 'Eighteen' },
            { value: '19', label: 'Nineteen' },
            { value: '20', label: 'Twenty' },
            { value: '21', label: 'Twenty One' },
            { value: '22', label: 'Twenty Two' },
            { value: '23', label: 'Twenty Three' },
            { value: '24', label: 'Twenty Four' },
            { value: '25', label: 'Twenty Five' },
            { value: '26', label: 'Twenty Six' },
            { value: '27', label: 'Twenty Seven' },
            { value: '28', label: 'Twenty Eight' },
            { value: '29', label: 'Twenty Nine' },
            { value: '30', label: 'Thirty' },
            { value: '31', label: 'Thirty One' }
        ]
    }
};

export const Clearable: Story = {
    args: {
        clearable: true,
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};

export const Creatable: Story = {
    args: {
        creatable: true,
        options: [
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' }
        ]
    }
};