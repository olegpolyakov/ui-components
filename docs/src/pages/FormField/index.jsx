import {
    Checkbox,
    FormField
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

import './index.scss';

const id = 'form-field';
const title = 'Form Field';
const description = 'Form Field aligns a form field (for example, a checkbox) with its label and makes it RTL-aware.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-form-field'
};

export default function FormFieldPage() {
    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic form field">
                <FormField label="Label">
                    <Checkbox />
                </FormField>
            </Demo>

            <Demo title="Form field that goes before the element">
                <FormField label="Label" alignEnd>
                    <Checkbox />
                </FormField>
            </Demo>

            <Demo title="No wrap form field">
                <FormField label="Label" nowrap>
                    <Checkbox />
                </FormField>
            </Demo>

            <Demo title="Form field with space between">
                <FormField label="Label" spaceBetween>
                    <Checkbox />
                </FormField>
            </Demo>

            <Demo title="Block form field">
                <FormField label="Label" block>
                    <Checkbox />
                </FormField>
            </Demo>
        </Page>
    );
}