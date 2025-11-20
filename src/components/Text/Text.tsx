import { ReactNode } from 'react';

import type { Align, Color, ComponentProps, ElementType, Emphasis, SizeFull, Weight } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Text.module.scss';

export type TextProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color | 'inherit';
    size?: SizeFull;
    align?: Align;
    emphasis?: Emphasis;
    weight?: Weight;
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

const elementClassNames = getElementClassNames(
    Text.displayName,
    ['start', 'content', 'end']
);

export default function Text<T extends ElementType = 'p'>({
    as,
    children,
    className,

    content = children,
    start,
    end,
    color,
    size,
    emphasis,
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
        elementClassNames.root,
        styles.root,
        color && styles[color],
        size && styles[size],
        emphasis && styles[`emphasis-${emphasis}`],
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