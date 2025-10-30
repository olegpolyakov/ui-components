import type { ReactElement } from 'react';

import { jsxToHtml } from '@/utils/code';
import highlight from '@/utils/highlight';

export default function Code({
    lang,
    children
}: {
    lang: string;
    children: ReactElement
}) {
    const html = jsxToHtml(children);

    return (
        <div className="code">
            <pre className={`hljs language-${lang}`}>
                <code
                    dangerouslySetInnerHTML={{ __html: highlight(html, 'jsx') }}
                />
            </pre>
        </div>
    );
}