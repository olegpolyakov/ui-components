import type { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Shadow, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Card.module.scss';

export type CardProps = {
    content?: ReactNode;
    color?: Color;
    size?: Size;
    shadow?: Shadow;
    variant?: Variant;
    interactive?: boolean;
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
    ...props
}: ComponentProps<CardProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        color && styles[color],
        size && styles[size],
        shadow && styles[`shadow-${shadow}`],
        styles[variant],
        styles[color ? `${variant}-${color}` : variant],
        interactive && styles.interactive
    );

    return (
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}