import { useState } from 'react';
import {
    IconButton,
    TopAppBar
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

import './index.scss';

const id = 'top-app-bar';
const title = 'Top App Bar';
const description = 'The top app bar displays information and actions relating to the current screen.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar',
    guide: 'https://material.io/components/app-bars-top'
};

export default function TopAppBarPage() {
    const [isCollapsed, setCollapsed] = useState(false);

    const actionItems = [
        <IconButton key="add" icon="add" />,
        <IconButton key="edit" icon="edit" />,
        <IconButton key="delete" icon="delete" />
    ];

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo>
                <TopAppBar
                    title="Basic"
                    navigationIcon="menu"
                    actionItems={actionItems}
                />
            </Demo>

            <Demo>
                <TopAppBar
                    title="Dense"
                    navigationIcon="menu"
                    actionItems={actionItems}
                    dense
                />
            </Demo>

            <Demo>
                <TopAppBar
                    title="Prominent"
                    navigationIcon="menu"
                    actionItems={actionItems}
                    prominent
                />
            </Demo>

            <Demo>
                <TopAppBar
                    title="Short"
                    navigationIcon="menu"
                    short
                    collapsed={isCollapsed}
                    onNavigationIconClick={() => setCollapsed(v => !v)}
                />
            </Demo>
        </Page>
    );
}