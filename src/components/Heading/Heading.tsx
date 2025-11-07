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
    marginTop?: boolean;
    marginBottom?: boolean;
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
    size = 'm',
    color,
    weight = 'semibold',
    align,
    block,
    bold,
    muted,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<HeadingProps, T>) {
    const Component = as || 'h1';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        color && cssClasses[color],
        weight && cssClasses[weight],
        align && cssClasses[`align-${align}`],
        block && cssClasses.block,
        bold && cssClasses.bold,
        muted && cssClasses.muted,
        marginTop && marginTop === true
            ? cssClasses.mt
            : cssClasses[`mt-${marginTop}`],
        marginBottom && marginBottom === true
            ? cssClasses.mb
            : cssClasses[`mb-${marginBottom}`]
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