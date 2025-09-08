import { useState } from 'react';
import {
    Button,
    CircularProgress,
    SegmentedButton,
    FormField,
    Switch,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'circular-progress';
const title = 'Circular Progress';
const description = 'Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-circular-progress',
    guide: 'https://material.io/components/progress-indicators#circular-progress-indicators'
};

export default function CircularProgressPage() {
    const [value, setValue] = useState(42);
    const [size, setSize] = useState('medium');
    const [indeterminate, setIndeterminate] = useState(false);
    const [colorful, setColorful] = useState(false);
    const [closed, setClosed] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo
                settings={<>
                    <TextField
                        value={value}
                        label="Value"
                        outlined
                        onChange={(_, value) => setValue(value)}
                    />

                    <FieldSet legend="Size">
                        <SegmentedButton
                            segments={[
                                { value: 'small', label: 'Small' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'large', label: 'Large' }
                            ]}
                            value={size}
                            onChange={setSize}
                        />
                    </FieldSet>

                    <FormField label="Indeterminate" alignEnd spaceBetween>
                        <Switch
                            selected={indeterminate}
                            onChange={() => setIndeterminate(v => !v)}
                        />
                    </FormField>

                    <FormField label="Colorful" alignEnd spaceBetween>
                        <Switch
                            selected={colorful}
                            onChange={() => setColorful(v => !v)}
                        />
                    </FormField>

                    <FormField label="Closed" alignEnd spaceBetween>
                        <Switch
                            selected={closed}
                            onChange={() => setClosed(v => !v)}
                        />
                    </FormField>
                </>}
            >
                <CircularProgress
                    value={indeterminate ? undefined : value}
                    size={size}
                    indeterminate={indeterminate || undefined}
                    colorful={colorful || undefined}
                    closed={closed || undefined}
                />
            </Demo>
        </Page>
    );
}