import type { ReactNode } from 'react';

import { cn } from '../../component';
import type { Color, ComponentProps, ElementType, Shadow, Shape, SizeExtended, Variant } from '../../types';

import styles from './Card.module.scss';

export type CardProps = {
    content?: ReactNode;
    color?: Color;
    size?: SizeExtended;
    shape?: Exclude<Shape, 'circular'>;
    shadow?: Shadow;
    shadowHover?: Shadow;
    variant?: Variant;
    interactive?: boolean;
};

Card.displayName = 'Card';

export default function Card<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    color,
    size,
    shape,
    variant = 'tinted',
    shadow,
    shadowHover,
    interactive = false,
    ...props
}: ComponentProps<CardProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        color,
        size,
        shape,
        variant,
        shadow,
        shadowHover,
        interactive
    }, styles);

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}