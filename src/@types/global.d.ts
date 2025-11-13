/// <reference types="vite/client" />

declare module '*.scss';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.md';
declare module '*.mdx' {
  import { MDXProps } from 'mdx/types';
  const MDXContent: (props: MDXProps) => JSX.Element;
  export default MDXContent;
}
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}