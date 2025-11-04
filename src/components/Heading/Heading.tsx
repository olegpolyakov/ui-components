import { ReactNode } from 'react';

import type { Align, Color, ComponentProps, ElementType, SizeFull, Weight } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Heading.module.scss';

export type HeadingProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: SizeFull; 
    align?: Align;
    color?: Color;
    weight?: Weight;
    block?: boolean;
    muted?: boolean;
};

Heading.displayName = 'Heading';

const elementClassNames = getElementClassNames(
    Heading.displayName,
    ['start', 'content', 'end']
);

export default function Heading<T extends ElementType = 'h1'>({
    as,
    className,
    children,

    content = children,
    start,
    end,
    type = 'h1',
    color,
    weight = 'semibold',
    align,
    block,
    bold,
    muted,
    ...props
}: ComponentProps<HeadingProps, T>) {
    const Component = as || 'h1';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[type],
        color && cssClasses[color],
        weight && cssClasses[weight],
        align && cssClasses[`align-${align}`],
        block && cssClasses.block,
        bold && cssClasses.bold,
        muted && cssClasses.muted
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {content &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {content}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Component>
    );
}