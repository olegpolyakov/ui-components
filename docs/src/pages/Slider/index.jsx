import { useState } from 'react';
import {
    Slider
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'slider';
const title = 'Slider';
const description = 'Sliders allow users to make selections from a range of values.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider',
    guide: 'https://material.io/components/sliders'
};

export default function SliderPage() {
    const [value1, setValue1] = useState(50);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(50);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Continuous slider">
                <Slider
                    value={value1}
                    onChange={setValue1}
                />
            </Demo>

            <Demo title="Discrete slider">
                <Slider
                    value={value2}
                    step="10"
                    discrete
                    onChange={setValue2}
                />
            </Demo>

            <Demo title="Discrete slider with tick marks">
                <Slider
                    value={value3}
                    step="10"
                    discrete
                    tickMarks
                    onChange={setValue3}
                />
            </Demo>

            <Demo title="Disabled slider">
                <Slider
                    value={42}
                    disabled
                />
            </Demo>
        </Page>
    );
}