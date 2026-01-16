import { ReactNode } from 'react';

import { cn } from '../../component';
import type { Align, ComponentProps, ElementType, SizeFull, TextColor, Weight } from '../../types';

import styles from './Text.module.scss';

export type TextProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: TextColor | 'inherit';
    size?: SizeFull;
    weight?: Weight;
    align?: Align;
    inline?: boolean;
    italic?: boolean;
    uppercase?: boolean;
    strikethrough?: boolean;
    ellipsis?: boolean;
    decorative?: boolean;
    marginTop?: boolean;
    marginBottom?: boolean;
};

Text.displayName = 'Text';

export default function Text<T extends ElementType = 'p'>({
    as,
    children,
    className,

    content = children,
    start,
    end,
    color,
    size,
    weight,
    align,
    inline,
    italic,
    uppercase,
    strikethrough,
    ellipsis,
    decorative,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<TextProps, T>) {
    const Component = as || 'p';
    const classNames = cn(
        className,
        {
            color,
            size,
            weight,
            [`align-${align}`]: align,
            inline,
            italic,
            uppercase,
            strikethrough,
            ellipsis,
            decorative,
            mt: marginTop,
            mb: marginBottom
        },
        styles
    );

    return (
        <Component className={classNames} {...props}>
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
        </Component>
    );
}