import { ReactNode } from 'react';

import type { Align, Color, ComponentProps, ElementType, SizeFull, Tone, Weight } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Heading.module.scss';

export type HeadingProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    size?: SizeFull; 
    tone?: Tone;
    weight?: Weight;
    align?: Align;
    block?: boolean;
    bold?: boolean;
    capitalize?: boolean;
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
    color,
    size = 'm',
    tone,
    weight = 'semibold',
    align,
    block,
    bold,
    capitalize,
    muted,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<HeadingProps, T>) {
    const Component = as || 'h1';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        color && styles[color],
        tone && styles[`tone-${tone}`],
        weight && styles[weight],
        align && styles[`align-${align}`],
        block && styles.block,
        bold && styles.bold,
        capitalize && styles.capitalize,
        muted && styles.muted,
        marginTop && marginTop === true
            ? styles.mt
            : styles[`mt-${marginTop}`],
        marginBottom && marginBottom === true
            ? styles.mb
            : styles[`mb-${marginBottom}`]
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, styles.start)}>
                    {start}
                </span>
            }

            {content &&
                <span className={cn(elementClassNames.content, styles.content)}>
                    {content}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, styles.end)}>
                    {end}
                </span>
            }
        </Component>
    );
}