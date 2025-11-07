import { Heading } from '~/components/Heading';

export function useMDXComponents(components) {
    return {
        h1: props => <Heading {...props} size="m" marginBottom />,
        h2: props => <Heading {...props} size="s" marginBottom />,
        h3: props => <Heading {...props} size="xs" marginBottom />,
        ...components
    };
}
