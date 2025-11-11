import { Heading } from '~/components/Heading';

import { classnames as cn } from '~/utils';

import highlight from './utils/highlight';

export function useMDXComponents(components) {
    return {
        h1: props => <Heading {...props} size="m" marginBottom />,
        h2: props => <Heading {...props} size="s" marginTop marginBottom />,
        h3: props => <Heading {...props} size="xs" marginTop marginBottom />,
        pre: props => (
            <pre className={cn('hljs', props.children.props.className)}>
                <code
                    dangerouslySetInnerHTML={{ __html: highlight(props.children.props.children, 'jsx') }}
                />
            </pre>
        ),
        ...components
    };
}
