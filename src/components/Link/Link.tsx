import { FunctionComponent, ReactNode } from 'react';

import type { Color, ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Link.module.scss';

export type LinkProps = {
    content?: ReactNode;
    color?: Color;
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