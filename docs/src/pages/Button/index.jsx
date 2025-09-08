import { useState } from 'react';
import {
    Button,
    SegmentedButton,
    Switch,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'button';
const title = 'Button';
const description = 'Buttons communicate an action a user can take. They are typically placed throughout your UI, in places like dialogs, forms, cards, and toolbars.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-button',
    guide: 'https://material.io/components/buttons'
};

export default function ButtonPage() {
    const [label, setLabel] = useState('Button');
    const [hasLeadingIcon, setHasLeadingIcon] = useState(false);
    const [leadingIcon, setLeadingIcon] = useState('save');
    const [hasTrailingIcon, setHasTrailingIcon] = useState(false);
    const [trailingIcon, setTrailingIcon] = useState('close');
    const [type, setType] = useState('plain');

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo
                title="Demo"
                settings={<>
                    <TextField
                        value={label}
                        label="Label"
                        outlined
                        onChange={(_, value) => setLabel(value)}
                    />

                    <TextField
                        value={leadingIcon}
                        label="Leading icon"
                        trailingIcon={
                            <Switch
                                selected={hasLeadingIcon}
                                onChange={() => setHasLeadingIcon(v => !v)}
                            />
                        }
                        outlined
                        disabled={!hasLeadingIcon}
                        onChange={(_, value) => setLeadingIcon(value)}
                    />

                    <TextField
                        value={trailingIcon}
                        label="Trailing icon"
                        trailingIcon={
                            <Switch
                                selected={hasTrailingIcon}
                                onChange={() => setHasTrailingIcon(v => !v)}
                            />
                        }
                        outlined
                        disabled={!hasTrailingIcon}
                        onChange={(_, value) => setTrailingIcon(value)}
                    />

                    <FieldSet legend="Type">
                        <SegmentedButton
                            segments={[
                                { value: 'plain', label: 'Plain' },
                                { value: 'outlined', label: 'Outlined' },
                                { value: 'unelevated', label: 'Unelevated' },
                                { value: 'raised', label: 'Raised' }
                            ]}
                            value={type}
                            onChange={setType}
                        />
                    </FieldSet>
                </>}
            >
                <Button
                    leadingIcon={hasLeadingIcon ? leadingIcon : undefined}
                    trailingIcon={hasTrailingIcon ? trailingIcon : undefined}
                    outlined={type === 'outlined' || undefined}
                    unelevated={type === 'unelevated' || undefined}
                    raised={type === 'raised' || undefined}
                >
                    {label}
                </Button>
            </Demo>
        </Page>
    );
}