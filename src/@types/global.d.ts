declare module '*.scss';
declare module '*.md';
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

// declare module '*.scss' {
//     const content: Record<string, string>;
//     export default content;
// }

declare global {
    type Merge<A, B> = Omit<A, keyof B> & B;
}