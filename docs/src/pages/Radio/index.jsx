import { useCallback, useState } from 'react';
import {
    FormField,
    Radio
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'radio';
const title = 'Radio';
const description = 'Radio buttons allow users to select one option from a set.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio',
    guide: 'https://material.io/components/radio-buttons'
};

export default function RadioPage() {
    const [value1, setValue1] = useState('yes');
    const [value2, setValue2] = useState('yes');

    const handleChange1 = useCallback((event, value) => {
        setValue1(value);
    }, []);

    const handleChange2 = useCallback((event, value) => {
        setValue2(value);
    }, []);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic radio">
                <FormField label="Yes">
                    <Radio
                        name="answer1"
                        value="yes"
                        checked={value1 === 'yes'}
                        onChange={handleChange1}
                    />
                </FormField>

                <FormField label="No">
                    <Radio
                        name="answer1"
                        value="no"
                        checked={value1 === 'no'}
                        onChange={handleChange1}
                    />
                </FormField>

                <FormField label="Maybe">
                    <Radio
                        name="answer1"
                        value="maybe"
                        checked={value1 === 'maybe'}
                        onChange={handleChange1}
                    />
                </FormField>
            </Demo>

            <Demo title="Disabled radio">
                <FormField label="Yes">
                    <Radio
                        name="answer2"
                        value="yes"
                        checked={value2 === 'yes'}
                        onChange={handleChange2}
                    />
                </FormField>

                <FormField label="No">
                    <Radio
                        name="answer2"
                        value="no"
                        checked={value2 === 'no'}
                        onChange={handleChange2}
                    />
                </FormField>

                <FormField label="Maybe">
                    <Radio
                        name="answer2"
                        value="maybe"
                        checked={value2 === 'maybe'}
                        disabled
                        onChange={handleChange2}
                    />
                </FormField>
            </Demo>
        </Page>
    );
}