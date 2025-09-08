import {
    Typography
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'typography';
const title = 'Typography';
const description = 'Typography expresses hierarchy and brand presence.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography',
    guide: 'https://material.io/design/typography'
};

export default function TypographyPage() {
    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo>
                <Typography type="headline1" noMargin>Headline 1</Typography>

                <Typography type="headline2" noMargin>Headline 2</Typography>

                <Typography type="headline3" noMargin>Headline 3</Typography>

                <Typography type="headline4" noMargin>Headline 4</Typography>

                <Typography type="headline5" noMargin>Headline 5</Typography>

                <Typography type="headline6" noMargin>Headline 6</Typography>

                <Typography type="subtitle1" noMargin>Subtitle 1</Typography>

                <Typography type="subtitle2" noMargin>Subtitle 2</Typography>

                <Typography type="body1" noMargin>Body 1</Typography>

                <Typography type="body2" noMargin>Body 2</Typography>

                <Typography type="caption">Caption</Typography>

                <Typography type="button">Button</Typography>

                <Typography type="overline">Overline</Typography>
            </Demo>
        </Page>
    );
}