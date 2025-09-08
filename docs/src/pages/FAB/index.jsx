import { useState } from 'react';
import { Button, FAB } from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'fab';
const title = 'FAB';
const description = 'A floating action button (FAB) represents the primary action of a screen.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-fab',
    guide: 'https://material.io/components/buttons-floating-action-button'
};

export default function FABPage() {
    const [isExited, setExited] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic FAB">
                <FAB
                    icon="star"
                />
            </Demo>

            <Demo title="Mini FAB">
                <FAB
                    icon="star"
                    mini
                />
            </Demo>

            <Demo title="Extended FAB">
                <FAB
                    icon="star"
                    label="Star"
                />
            </Demo>

            <Demo title="Extended FAB with a trailing icon">
                <FAB
                    label="Star"
                    trailingIcon="star"
                />
            </Demo>

            <Demo
                title="Animated FAB"
                setup={
                    <Button
                        label="Toggle"
                        onClick={() => setExited(v => !v)}
                    />
                }
            >
                <FAB
                    icon="star"
                    exited={isExited}
                />
            </Demo>
        </Page>
    );
}