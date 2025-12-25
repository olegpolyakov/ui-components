import type { ReactNode } from 'react';

import { ccn } from '../../component';
import type { Color, ComponentProps, ElementType, Shape, Size, Variant } from '../../types';
import { cn } from '../../utils';

import styles from './Badge.module.scss';

export type BadgeProps = {
    content?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
    interactive?: boolean;
};

Badge.displayName = 'Badge';

export default function Badge<T extends ElementType = 'span'>({
    as,
    className,
    children,

    content = children,
    color = 'brand',
    shape = 'circular',
    size = 'm',
    variant = 'filled',
    interactive = false,
    ...props
}: ComponentProps<BadgeProps, T>) {
    const Root = as || 'span';
    const classNames = cn(
        className,
        ccn({
            color,
            size,
            shape,
            variant,
            interactive
        }, styles)
    );

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}