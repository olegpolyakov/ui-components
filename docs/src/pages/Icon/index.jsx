import { useState } from 'react';
import {
    FormField,
    Icon,
    SegmentedButton,
    Switch,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

import './index.scss';

const id = 'icon';
const title = 'Icon';
const description = 'Material design system icons are simple, modern, friendly, and sometimes quirky. Each icon is created using our design guidelines to depict in simple and minimal forms the universal concepts used commonly throughout a UI.';
const links = {
    docs: 'https://developers.google.com/fonts/docs/material_icons',
    guide: 'https://material.io/design/iconography'
};

export default function IconPage() {
    const [name, setName] = useState('flag');
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [tone, setTone] = useState('');
    const [inactive, setInactive] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo
                title="Demo"
                settings={<>
                    <TextField
                        value={name}
                        label="Label"
                        outlined
                        onChange={(_, value) => setName(value)}
                    />

                    <FieldSet legend="Type">
                        <SegmentedButton
                            segments={[
                                { value: 'filled', label: 'Filled' },
                                { value: 'outlined', label: 'Outlined' },
                                { value: 'round', label: 'Round' },
                                { value: 'sharp', label: 'Sharp' },
                                { value: 'two-tone', label: 'Two Tone' }
                            ]}
                            value={type}
                            onChange={setType}
                        />
                    </FieldSet>

                    <FieldSet legend="Size">
                        <SegmentedButton
                            segments={[
                                { value: 'smaller', label: 'Smaller' },
                                { value: 'small', label: 'Small' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'large', label: 'Large' },
                                { value: 'larger', label: 'Larger' }
                            ]}
                            value={size}
                            onChange={setSize}
                        />
                    </FieldSet>

                    <FieldSet legend="Tone">
                        <SegmentedButton
                            segments={[
                                { value: '', label: 'None' },
                                { value: 'light', label: 'Light' },
                                { value: 'dark', label: 'Dark' }
                            ]}
                            value={tone}
                            onChange={setTone}
                        />
                    </FieldSet>

                    <FormField label="Inactive" alignEnd spaceBetween>
                        <Switch
                            selected={inactive}
                            onChange={() => setInactive(v => !v)}
                        />
                    </FormField>
                </>}
            >
                <Icon
                    name={name}
                    type={type}
                    size={size}
                    light={tone === 'light'}
                    dark={tone === 'dark'}
                    inactive={inactive}
                />
            </Demo>
        </Page>
    );
}