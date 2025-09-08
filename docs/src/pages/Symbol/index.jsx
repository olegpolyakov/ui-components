import { useState } from 'react';
import {
    FormField,
    Symbol,
    SegmentedButton,
    Slider,
    Switch,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

import './index.scss';

const id = 'symbol';
const title = 'Symbol';
const description = 'Material Symbols are our newest icons, consolidating over 2,500 glyphs in a single font file with a wide range of design variants. Symbols are available in three styles and four adjustable variable font axes (fill, weight, grade, and optical size).';
const links = {
    docs: 'https://developers.google.com/fonts/docs/material_symbols',
    guide: 'https://material.io/design/iconography'
};

export default function SymbolPage() {
    const [name, setName] = useState('flag');
    const [size, setSize] = useState('');
    const [type, setType] = useState('outlined');
    const [tone, setTone] = useState('');
    const [weight, setWeight] = useState(300);
    const [grade, setGrade] = useState(0);
    const [filled, setFilled] = useState(false);
    const [inactive, setInactive] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo
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
                                { value: 'outlined', label: 'Outlined' },
                                { value: 'rounded', label: 'Rounded' },
                                { value: 'sharp', label: 'Sharp' }
                            ]}
                            value={type}
                            onChange={setType}
                        />
                    </FieldSet>

                    <FormField label="Filled" alignEnd spaceBetween>
                        <Switch
                            selected={filled}
                            onChange={() => setFilled(v => !v)}
                        />
                    </FormField>

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

                    <FormField label="Weight" block>
                        <Slider
                            value={weight}
                            min="100"
                            max="700"
                            step="100"
                            discrete
                            tickMarks
                            onChange={setWeight}
                        />
                    </FormField>

                    <FieldSet legend="Grade">
                        <SegmentedButton
                            segments={[
                                { value: -25, label: 'Low' },
                                { value: 0, label: 'Normal' },
                                { value: 200, label: 'High' }
                            ]}
                            value={grade}
                            onChange={setGrade}
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
                <Symbol
                    name={name}
                    type={type}
                    size={size}
                    weight={weight}
                    grade={grade}
                    filled={filled}
                    light={tone === 'light'}
                    dark={tone === 'dark'}
                    inactive={inactive}
                />
            </Demo>
        </Page>
    );
}