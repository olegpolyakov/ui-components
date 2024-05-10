import { forwardRef, type ReactNode } from 'react';

import type { Color, HTMLSpanProps, PropsWithChildren, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Badge.scss';

export type BadgeProps = PropsWithChildren<{
    as?: 'span';
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
}, HTMLSpanProps>;

const displayName = 'Badge';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'end']);

const Badge = forwardRef<HTMLElement, BadgeProps>(({
    start,
    content,
    end,
    color = '',
    shape = 'circular',
    size = 'medium',
    variant = 'plain',

    as: Tag = 'span',
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[color],
        cssClasses[shape],
        cssClasses[size],
        cssClasses[variant]
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {children &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {children}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Tag>
    );
});

Badge.displayName = displayName;

export default Badge;