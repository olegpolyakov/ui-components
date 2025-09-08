import { useState } from 'react';
import {
    Button,
    LinearProgress
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'linear-progress';
const title = 'Linear Progress';
const description = 'Progress indicators display the length of a process or express an unspecified wait time.';
const links = {
    docs: '',
    guide: ''
};

export default function LinearProgressPage() {
    const [isClosed, setClosed] = useState(true);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic linear progress">
                <LinearProgress value="42" />
            </Demo>

            <Demo title="Linear progress with a buffer">
                <LinearProgress value="42" buffer="84" />
            </Demo>

            <Demo title="Indeterminate linear progress">
                <LinearProgress indeterminate />
            </Demo>

            <Demo
                title="Closed linear progress"
                setup={
                    <Button onClick={() => setClosed(v => !v)}>Toggle</Button>
                }
            >
                <LinearProgress closed={isClosed} value="42" />
            </Demo>
        </Page>
    );
}