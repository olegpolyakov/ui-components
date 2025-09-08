import {
    IconButton,
    Tooltip, RichTooltip
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'tooltip';
const title = 'Tooltip';
const description = 'Tooltips display informative text when users hover over, focus on, or tap an element.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-tooltip',
    guide: 'https://material.io/components/tooltips'
};

export default function TooltipPage() {
    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic tooltip">
                <Tooltip label="Star">
                    <IconButton icon="star" />
                </Tooltip>
            </Demo>

            <Demo title="Multiline tooltip">
                <Tooltip label="This is a star icon button, you should click on it">
                    <IconButton icon="star" />
                </Tooltip>
            </Demo>

            <Demo title="Rich tooltip">
                <RichTooltip
                    title="Title"
                    content="Default rich tooltips are shown when users hover over or focus on their anchor element. They remain shown when users focus/hover over the contents of the rich tooltip, but becomes hidden if the users focus/hover outside of the anchor element or the tooltip contents. If the user clicks within the contents of the tooltip, the tooltip will also be hidden."
                >
                    <IconButton icon="star" />
                </RichTooltip>
            </Demo>
        </Page>
    );
}