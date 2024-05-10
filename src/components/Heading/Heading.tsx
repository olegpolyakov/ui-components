import { forwardRef, ReactNode } from 'react';

import type { Align, Color, HTMLHeadingProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Heading.scss';

export type HeadingProps = PropsWithChildren<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; 
    align?: Align;
    color?: Color;
    block?: boolean;
    bold?: boolean;
    muted?: boolean;
}, HTMLHeadingProps>;

const displayName = 'Heading';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'end']);

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({
    content,
    start,
    end,
    type = 'h2',
    color,
    align,
    block,
    bold,
    muted,

    as: Tag = 'h2',
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[type],
        color && cssClasses[color],
        align && cssClasses[`align-${align}`],
        block && cssClasses.block,
        bold && cssClasses.bold,
        muted && cssClasses.muted
    );

    return (
        <Tag
            ref={ref}
            className={classNames}
            {...props}
        >
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

Heading.displayName = displayName;

export default Heading;