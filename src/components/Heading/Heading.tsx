import { ReactNode } from 'react';

import { cn } from '../../component';
import type { Align, PaletteColor, ComponentProps, ElementType, Opacity, SizeFull, Space, TextColor, Weight } from '../../types';

import styles from './Heading.module.scss';

export type HeadingProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: PaletteColor | TextColor | 'inherit';
    size?: SizeFull; 
    align?: Align;
    weight?: Weight;
    opacity?: Opacity;
    gap?: Space;
    inline?: boolean;
    italic?: boolean;
    capitalize?: boolean;
    ellipsis?: boolean;
    uppercase?: boolean;
    marginTop?: boolean;
    marginBottom?: boolean;
};

Heading.displayName = 'Heading';

export default function Heading<T extends ElementType = 'h1'>({
    as,
    className,
    children,

    content = children,
    start,
    end,
    color,
    size = 'm',
    align,
    weight = 'semibold',
    opacity,
    gap = 'xs',
    inline,
    italic,
    capitalize,
    ellipsis,
    uppercase,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<HeadingProps, T>) {
    const Root = as || 'h1';
    const classNames = cn(className, {
        color,
        size,
        inline,
        [`align-${align}`]: align,
        ellipsis,
        mt: marginTop,
        mb: marginBottom,
        gap,
        opacity,
        weight,
        italic,
        capitalize,
        uppercase
    }, styles);

    return (
        <Root
            className={classNames}
            {...props}
        >
            {start &&
                <span className={styles.start}>
                    {start}
                </span>
            }

            {content &&
                <span className={styles.content}>
                    {content}
                </span>
            }

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </Root>
    );
}