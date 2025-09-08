import {
    Elevation,
    RippleSurface
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

export default function RadioPage() {
    return (
        <Page title="Ripple">
            <Demo title="Basic ripple">
                <Elevation z="5">
                    <RippleSurface style={{ height: '100px' }} />
                </Elevation>
            </Demo>
        </Page>
    );
}