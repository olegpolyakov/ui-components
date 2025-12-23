import { ReactNode } from 'react';

import type { Align, ComponentProps, ElementType, Opacity, SizeFull, Space, TextColor, Weight } from '../../types';
import { bcn, classnames as cn } from '../../utils';

import baseStyles from '../../styles/classes.module.scss';
import styles from './Heading.module.scss';

console.log({ baseStyles });

export type HeadingProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: TextColor;
    size?: SizeFull; 
    weight?: Weight;
    opacity?: Opacity;
    align?: Align;
    gap?: Space;
    inline?: boolean;
    italic?: boolean;
    capitalize?: boolean;
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
    weight = 'semibold',
    opacity,
    align,
    gap = 'xs',
    inline,
    italic,
    capitalize,
    uppercase,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<HeadingProps, T>) {
    const Root = as || 'h1';
    const classNames = cn(
        className,
        styles.root,
        styles[size],
        color && styles[color],
        color && bcn(`${color}-foreground-color`),
        gap && bcn(`gap-${gap}`),
        opacity && bcn(`opacity-${opacity}`),
        weight && bcn(`weight-${weight}`),
        align && styles[`align-${align}`],
        inline && styles.inline,
        italic && bcn('italic'),
        capitalize && bcn('capitalize'),
        uppercase && bcn('uppercase'),
        marginTop && (marginTop === true
            ? bcn('mt')
            : bcn(`mt-${marginTop}`)),
        marginBottom && (marginBottom === true
            ? bcn('mb')
            : bcn(`mb-${marginBottom}`))
    );

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