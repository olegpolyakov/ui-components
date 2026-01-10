import { ReactNode } from 'react';

import type { Align, Color, ComponentProps, ElementType, SizeFull, Weight } from '../../types';
import { cn } from '../../utils';

import styles from './Text.module.scss';

export type TextProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: 'primary' | 'secondary' | 'tertiary' | Color | 'inherit';
    size?: SizeFull;
    weight?: Weight;
    align?: Align;
    inline?: boolean;
    italic?: boolean;
    uppercase?: boolean;
    strikethrough?: boolean;
    ellipsis?: boolean;
    disabled?: boolean;
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
    tone,
    size,
    weight,
    align,
    inline,
    italic,
    uppercase,
    strikethrough,
    ellipsis,
    decorative,
    disabled,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<TextProps, T>) {
    const Component = as || 'p';
    const classNames = cn(
        className,
        styles.root,
        (color || tone) && styles[`${color}${tone && tone !== 'neutral' ? `-${tone}` : ''}`],
        !color && tone && styles[tone],
        size && styles[size],
        weight && styles[`weight-${weight}`],
        align && styles[`align-${align}`],
        inline && styles.inline,
        italic && styles.italic,
        uppercase && styles.uppercase,
        strikethrough && styles.strikethrough,
        ellipsis && styles.ellipsis,
        disabled && styles.disabled,
        decorative && styles.decorative,
        marginTop && marginTop === true
            ? styles.mt
            : styles[`mt-${marginTop}`],
        marginBottom && marginBottom === true
            ? styles.mb
            : styles[`mb-${marginBottom}`],
        as === 'a' && styles.link
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