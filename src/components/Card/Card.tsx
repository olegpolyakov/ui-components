import type { ReactNode } from 'react';
import type { Color, ComponentProps, ElementType, Shadow, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Card.module.scss';

export type CardProps = {
    content?: ReactNode;
    color?: Color;
    size?: Size;
    shadow?: Shadow;
    variant?: Variant;
    interactive?: boolean;
    raised?: boolean;
};

Card.displayName = 'Card';

const elementClassNames = getElementClassNames(Card.displayName);

export default function Card<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    color,
    size,
    shadow,
    variant = 'plain',
    interactive,
    raised,
    ...props
}: ComponentProps<CardProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        size && cssClasses[size],
        shadow && cssClasses[`shadow-${shadow}`],
        cssClasses[variant],
        interactive && cssClasses.interactive,
        raised && cssClasses.raised
    );

    return (
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}