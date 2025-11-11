import { FunctionComponent } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import { TextProps } from '../Text';

import cssClasses from './Link.module.scss';

export type LinkProps = TextProps & {
    disabled?: boolean;
};

Link.displayName = 'Link';

const elementClassNames = getElementClassNames(Link.displayName);

export default function Link<T extends ElementType | FunctionComponent = 'a'>({
    as,
    className,
    children,

    content = children,
    color,
    disabled,
    ...props
}: ComponentProps<LinkProps, T>) {
    const Component = as || 'a';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        disabled && cssClasses.disabled
    );

    return (
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}