import { jsxToHtml } from '@/utils/code';
import highlight from '@/utils/highlight';

import './index.scss';

export default function Code({ lang, children }) {
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