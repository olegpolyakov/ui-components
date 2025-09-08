import { useState } from 'react';
import {
    Switch
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'switch';
const title = 'Switch';
const description = 'Switches toggle the state of a single item on or off.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-switch',
    guide: 'https://material.io/components/switches'
};

export default function SwitchPage() {
    const [isSelected, setSelected] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic switch">
                <Switch
                    selected={isSelected}
                    onChange={() => setSelected(v => !v)}
                />
            </Demo>

            <Demo title="Disabled switch">
                <Switch disabled />
            </Demo>
        </Page>
    );
}