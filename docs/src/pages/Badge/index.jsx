import { useState } from 'react';
import {
    Avatar,
    Badge,
    Button,
    FormField,
    Icon,
    IconButton,
    SegmentedButton,
    Switch,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'badge';
const title = 'Badge';
const description = 'Badge generates a small badge to the top-right of its child(ren).';

const content = {
    avatar: <Avatar text="MD" size="medium" />,
    button: <Button outlined>Button</Button>,
    icon: <Icon>star</Icon>,
    iconButton: <IconButton icon="star" />,
    text: 'Text'
};

export default function BadgePage() {
    const [value, setValue] = useState(0);
    const [type, setType] = useState('avatar');
    const [inset, setInset] = useState(false);
    const [transparent, setTransparent] = useState(false);

    return (
        <Page id={id} title={title} description={description}>
            <Demo
                settings={[
                    <TextField
                        key="value"
                        value={value}
                        label="Value"
                        outlined
                        onChange={(_, value) => setValue(value)}
                    />,

                    <FieldSet key="content" legend="Content">
                        <SegmentedButton
                            segments={[
                                { value: 'avatar', label: 'Avatar' },
                                { value: 'button', label: 'Button' },
                                { value: 'icon', label: 'Icon' },
                                { value: 'iconButton', label: 'Icon Button' },
                                { value: 'text', label: 'Text' }
                            ]}
                            value={type}
                            onChange={setType}
                        />
                    </FieldSet>,

                    <FormField key="inset" label="Inset" alignEnd spaceBetween>
                        <Switch
                            selected={inset}
                            onChange={() => setInset(v => !v)}
                        />
                    </FormField>,

                    <FormField key="transparent" label="Transparent" alignEnd spaceBetween>
                        <Switch
                            selected={transparent}
                            onChange={() => setTransparent(v => !v)}
                        />
                    </FormField>
                ]}
            >
                <Badge
                    value={value}
                    inset={inset || undefined}
                    transparent={transparent || undefined}
                >
                    {content[type]}
                </Badge>
            </Demo>
        </Page>
    );
}