import type { ReactNode } from 'react';

import { cn } from '../../component';
import type { PaletteColor, ComponentProps, ElementType, Size, Variant } from '../../types';

import styles from './Badge.module.scss';

export type BadgeProps = {
    content?: ReactNode;
    color?: PaletteColor;
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
    size = 'm',
    variant = 'filled',
    interactive = false,
    ...props
}: ComponentProps<BadgeProps, T>) {
    const Root = as || 'span';
    const classNames = cn(className, {
        color,
        size,
        variant,
        interactive
    }, styles);

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}