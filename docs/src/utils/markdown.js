import marked from 'marked';

import highlight from './highlight';

marked.setOptions({
    highlight,
    langPrefix: 'hljs language-'
});

export default marked;