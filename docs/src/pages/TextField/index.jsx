import { useState } from 'react';
import {
    TabBar, Tab,
    TextField
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'text-field';
const title = 'Text Field';
const description = 'Text fields let users enter and edit text.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield',
    guide: 'https://material.io/components/text-fields'
};

export default function TypographyPage() {
    const [type, setType] = useState('filled');

    const isFilled = type === 'filled' || undefined;
    const isOutlined = type === 'outlined' || undefined;

    return (
        <Page id={id} title={title} description={description} links={links}>
            <TabBar value={type} onChange={setType} minWidth>
                <Tab
                    value="filled"
                    label="Filled"
                />

                <Tab
                    value="outlined"
                    label="Outlined"
                />
            </TabBar>

            <Demo title="Basic text field">
                <TextField
                    defaultValue=""
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with a label">
                <TextField
                    defaultValue=""
                    label="Label"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Textarea">
                <TextField
                    defaultValue=""
                    label="Label"
                    textarea
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Autoresizable textarea">
                <TextField
                    defaultValue=""
                    label="Label"
                    textarea
                    autoResize
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Pre-filled text field">
                <TextField
                    defaultValue="Some text"
                    label="Label"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="With helper text">
                <TextField
                    defaultValue=""
                    helperText="Helper text"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="With persistent helper text">
                <TextField
                    defaultValue=""
                    persistentHelperText="Helper text"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with validation message">
                <TextField
                    defaultValue=""
                    label="Label"
                    required
                    validationMessage="Validation message"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with a character counter">
                <TextField
                    defaultValue=""
                    label="Label"
                    maxLength={10}
                    characterCounter
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with an internal character counter">
                <TextField
                    defaultValue=""
                    label="Label"
                    maxLength={120}
                    filled={isFilled}
                    outlined={isOutlined}
                    textarea
                    characterCounter="internal"
                />
            </Demo>

            <Demo title="Text field with a prefix">
                <TextField
                    defaultValue=""
                    label="Label"
                    prefix="@"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with a suffix">
                <TextField
                    defaultValue=""
                    label="Label"
                    suffix="$"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with a leading icon">
                <TextField
                    defaultValue=""
                    leadingIcon="star"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>

            <Demo title="Text field with a trailing icon">
                <TextField
                    defaultValue=""
                    trailingIcon="edit"
                    filled={isFilled}
                    outlined={isOutlined}
                />
            </Demo>
        </Page>
    );
}