import { ReactNode } from 'react';

import type { Align, Color, ComponentProps, ElementType, SizeFull, Weight } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Text.module.scss';

export type TextProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color | 'inherit';
    size?: SizeFull;
    align?: Align;
    weight?: Weight;
    inline?: boolean;
    italic?: boolean;
    uppercase?: boolean;
    strikethrough?: boolean;
    ellipsis?: boolean;
    muted?: boolean;
    disabled?: boolean;
    interactive?: boolean;
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
    weight,
    align,
    inline,
    italic,
    uppercase,
    strikethrough,
    ellipsis,
    disabled,
    marginTop,
    marginBottom,
    ...props
}: ComponentProps<TextProps, T>) {
    const Component = as || 'p';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        size && cssClasses[size],
        weight && cssClasses[weight],
        align && cssClasses[`align-${align}`],
        inline && cssClasses.inline,
        italic && cssClasses.italic,
        uppercase && cssClasses.uppercase,
        strikethrough && cssClasses.strikethrough,
        ellipsis && cssClasses.ellipsis,
        disabled && cssClasses.disabled,
        marginTop && marginTop === true
            ? cssClasses.mt
            : cssClasses[`mt-${marginTop}`],
        marginBottom && marginBottom === true
            ? cssClasses.mb
            : cssClasses[`mb-${marginBottom}`],
        as === 'a' && cssClasses.link
    );

    return (
        <Component className={classNames} {...props}>
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