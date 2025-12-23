import type { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Shadow, Shape, Size, Variant } from '../../types';
import { classnames as cn, getComponentClassNames, getElementClassNames } from '../../utils';

import styles from './Card.module.scss';

export type CardProps = {
    content?: ReactNode;
    color?: Color;
    size?: Size;
    shape?: Omit<Shape, 'circular'>;
    shadow?: Shadow;
    hoverShadow?: Shadow;
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
    shape,
    shadow,
    hoverShadow,
    variant = 'plain',
    interactive,
    ...props
}: ComponentProps<CardProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        ...getComponentClassNames(styles, {
            color,
            size,
            shape: shape as Shape,
            shadow,
            hoverShadow,
            variant,
            interactive
        })
    );

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}