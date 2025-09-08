import { useState } from 'react';
import {
    IconButton,
    Symbol
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'icon-button';
const title = 'Icon Button';
const description = 'Icon buttons allow users to take actions, and make choices, with a single tap.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button',
    guide: 'https://material.io/components/buttons'
};

export default function IconButtonPage() {
    const [isOn, setOn] = useState(true);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic icon button">
                <IconButton
                    icon="flag"
                />
            </Demo>

            <Demo title="Toggling icon button">
                <IconButton
                    icon={isOn ? 'favorite' : 'favorite_outlined'}
                    onClick={() => setOn(v => !v)}
                />
            </Demo>

            <Demo title="With a symbol">
                <IconButton
                    icon={<Symbol>flag</Symbol>}
                />
            </Demo>
        </Page>
    );
}