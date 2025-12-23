import type { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Shape, Size, Variant } from '../../types';
import { classnames as cn, getComponentClassNames, getElementClassNames } from '../../utils';

import styles from './Badge.module.scss';

export type BadgeProps = {
    content?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
};

Badge.displayName = 'Badge';

const elementClassNames = getElementClassNames(Badge.displayName);

export default function Badge<T extends ElementType = 'span'>({
    as,
    className,
    children,

    content = children,
    color = 'brand',
    shape = 'rounded',
    size = 'm',
    variant = 'filled',
    ...props
}: ComponentProps<BadgeProps, T>) {
    const Root = as || 'span';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        ...getComponentClassNames(styles, {
            color,
            size,
            shape,
            variant
        })
    );

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}