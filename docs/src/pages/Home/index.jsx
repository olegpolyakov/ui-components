import { Text } from 'mdc-react';
import Page from '@/components/Page';
import markdown from '@/utils/markdown';

import pckg from '../../../../package.json';
import readme from '../../../../README.md';

import './index.scss';

const html = markdown(readme);

export default function HomePage() {
    return (
        <Page id="home">
            <Text type="overline">{pckg.version}</Text>

            <article
                className="markdown"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </Page>
    );
}