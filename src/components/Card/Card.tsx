import { forwardRef } from 'react';

import type { Color, HTMLDivProps, PropsWithChildren, Shadow, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Card.module.scss';

export type CardProps = PropsWithChildren<{
    color?: Color;
    size?: Size;
    shadow?: Shadow;
    variant?: Variant;
    interactive?: boolean;
    raised?: boolean;

    as?: 'div';
}, HTMLDivProps>;

const displayName = 'Card';
const elementClassNames = getElementClassNames(displayName);

const Card = forwardRef<HTMLDivElement, CardProps>(({
    color,
    size,
    shadow,
    variant = 'plain',
    interactive,
    raised,

    as: Tag = 'div',
    className,
    ...props
}, ref) => {
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
        <Tag ref={ref} className={classNames} {...props} />
    );
});

Card.displayName = displayName;

export default Card;