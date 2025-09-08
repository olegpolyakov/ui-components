import { useState } from 'react';
import {
    Card,
    Switch,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'card';
const pageTitle = 'Card';
const description = 'Cards contain content and actions about a single subject.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-card',
    guide: 'https://material.io/components/cards'
}; '';

export default function CardPage() {
    const [hasTitle, setHasTitle] = useState(true);
    const [title, setTitle] = useState('Title');
    const [hasSubtitle, setHasSubtitle] = useState(true);
    const [subtitle, setSubtitle] = useState('Subtitle');

    return (
        <Page
            id={id}
            title={pageTitle}
            description={description}
            links={links}
        >
            <Demo
                settings={<>
                    <TextField
                        value={title}
                        label="Title"
                        trailingIcon={
                            <Switch
                                selected={hasTitle}
                                onChange={() => setHasTitle(v => !v)}
                            />
                        }
                        outlined
                        disabled={!hasTitle}
                        onChange={(_, value) => setTitle(value)}
                    />

                    <TextField
                        value={subtitle}
                        label="Subtitle"
                        trailingIcon={
                            <Switch
                                selected={hasSubtitle}
                                onChange={() => setHasSubtitle(v => !v)}
                            />
                        }
                        outlined
                        disabled={!hasSubtitle}
                        onChange={(_, value) => setSubtitle(value)}
                    />
                </>}
            >
                <Card>
                    <Card.Header
                        overline="Overline"
                        title={hasTitle ? title : undefined}
                        subtitle={hasSubtitle ? subtitle : undefined}
                    />
                </Card>
            </Demo>
        </Page >
    );
}