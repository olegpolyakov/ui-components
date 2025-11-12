import { UseMdxComponents } from '@mdx-js/mdx';

import { Heading } from '~/components/Heading';
import { classnames as cn } from '~/utils';

import highlight from './utils/highlight';

type MDXComponents = ReturnType<UseMdxComponents>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        h1: props => <Heading {...props} size="m" marginBottom />,
        h2: props => <Heading {...props} size="s" marginTop marginBottom />,
        h3: props => <Heading {...props} size="xs" marginTop marginBottom />,
        pre: props => (
            <pre className={cn('hljs', props.children.props.className)}>
                <code
                    dangerouslySetInnerHTML={{ __html: highlight(props.children.props.children, 'jsx') }}
                />
            </pre>
        )
    };
}
