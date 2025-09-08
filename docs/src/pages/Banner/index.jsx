import { useState } from 'react';
import {
    Banner,
    Button,
    FormField,
    Switch,
    TextField,
    TopAppBar
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

import './index.scss';

const id = 'banner';
const title = 'Banner';
const description = 'A banner displays a prominent message and related optional actions.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-banner',
    guide: 'https://material.io/components/banners'
};

export default function BadgePage() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('Lorem ipsum');
    const [hasIcon, setHasIcon] = useState(false);
    const [icon, setIcon] = useState('');
    const [hasAction, setHasAction] = useState(false);
    const [action, setAction] = useState('');
    const [hasSecondaryAction, setHasSecondaryAction] = useState(false);
    const [secondaryAction, setSecondaryAction] = useState('');
    const [centered, setCentered] = useState(false);
    const [fixed, setFixed] = useState(false);
    const [mobileStacked, setMobileStacked] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo
                title="Demo"
                setup={
                    <TopAppBar
                        title="Title"
                        actionItems={
                            <Button
                                label="Toggle"
                                onClick={() => setOpen(v => !v)}
                            />
                        }
                        raised
                    />
                }
                settings={<>
                    <TextField
                        value={text}
                        label="Text"
                        onChange={(_, value) => setText(value)}
                        outlined
                    />

                    <TextField
                        value={icon}
                        label="Icon"
                        trailingIcon={
                            <Switch
                                selected={hasIcon}
                                onChange={() => setHasIcon(v => !v)}
                            />
                        }
                        outlined
                        disabled={!hasIcon}
                        onChange={(_, value) => setIcon(value)}
                    />

                    <TextField
                        value={action}
                        label="Action"
                        trailingIcon={
                            <Switch
                                selected={hasAction}
                                onChange={() => setHasAction(v => !v)}
                            />
                        }
                        disabled={!hasAction}
                        outlined
                        onChange={(_, value) => setAction(value)}
                    />

                    <TextField
                        value={secondaryAction}
                        label="Secondary action"
                        trailingIcon={
                            <Switch
                                selected={hasSecondaryAction}
                                onChange={() => setHasSecondaryAction(v => !v)}
                            />
                        }
                        disabled={!hasSecondaryAction}
                        outlined
                        onChange={(_, value) => setSecondaryAction(value)}
                    />

                    <FormField label="Centered" alignEnd spaceBetween>
                        <Switch
                            selected={centered}
                            onChange={() => setCentered(v => !v)}
                        />
                    </FormField>

                    <FormField label="Fixed" alignEnd spaceBetween>
                        <Switch
                            selected={fixed}
                            onChange={() => setFixed(v => !v)}
                        />
                    </FormField>

                    <FormField label="Mobile stacked" alignEnd spaceBetween>
                        <Switch
                            selected={mobileStacked}
                            onChange={() => setMobileStacked(v => !v)}
                        />
                    </FormField>
                </>}
            >
                <Banner
                    text={text}
                    icon={hasIcon ? icon : undefined}
                    action={hasAction ?
                        <Button>{action}</Button>
                        :
                        undefined
                    }
                    secondaryAction={hasSecondaryAction ?
                        <Button>{secondaryAction}</Button>
                        :
                        undefined
                    }
                    open={open || undefined}
                    centered={centered || undefined}
                    fixed={fixed || undefined}
                    mobileStacked={mobileStacked || undefined}
                />
            </Demo>
        </Page>
    );
}