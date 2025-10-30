import {Marked} from 'marked';
import { markedHighlight } from "marked-highlight";

import highlight from './highlight';

const marked = new Marked(
  markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight
  })
);

export default marked;