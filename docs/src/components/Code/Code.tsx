import type { ReactElement } from 'react';

import { jsxToHtml } from '@/utils/code';
import highlight from '@/utils/highlight';

import styles from './Code.module.scss';

export default function Code({
    lang,
    children
}: {
    lang: string;
    children: ReactElement
}) {
    const html = jsxToHtml(children);

    return (
        <div className={styles.root}>
            <pre className={`hljs language-${lang}`}>
                <code
                    dangerouslySetInnerHTML={{ __html: highlight(html, 'jsx') }}
                />
            </pre>
        </div>
    );
}