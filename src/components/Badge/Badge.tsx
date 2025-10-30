import type { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Badge.module.scss';

export type BadgeProps = {
    as?: 'span';
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
};

Badge.displayName = 'Badge';

const elementClassNames = getElementClassNames(
    Badge.displayName,
    ['start', 'content', 'end']
);

export default function Badge<T extends ElementType = 'span'>({
    as,
    className,
    children,

    content = children,
    color = 'primary',
    shape = 'rounded',
    size = 'm',
    variant = 'filled',
    ...props
}: ComponentProps<BadgeProps, T>) {
    const Component = as || 'span';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[shape],
        cssClasses[size],
        cssClasses[variant],
        cssClasses[color ? `${variant}-${color}` : variant]
    );

    return (
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}