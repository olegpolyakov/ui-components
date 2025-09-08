import { ReactNode, forwardRef } from 'react';

import type { Align, Color, HTMLParagraphProps, PropsWithChildren, Weight } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Text.module.scss';

export type TextProps = PropsWithChildren<{
    as?: 'p' | 'span';
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    type?: 'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'body3';
    color?: Color;
    align?: Align;
    weight?: Weight;
    italic?: boolean;
    uppercase?: boolean;
    inline?: boolean;
    paragraph?: boolean;
    ellipsis?: boolean;
    muted?: boolean;
}, HTMLParagraphProps>;

const displayName = 'Text';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'end']);

const Text = forwardRef<HTMLParagraphElement, TextProps>(({
    content,
    start,
    end,
    type = 'p2',
    color = '',
    align,
    weight,
    italic,
    uppercase,
    inline,
    paragraph,
    ellipsis,
    muted,

    as: Tag = 'p',
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[type],
        color && cssClasses[color],
        weight && cssClasses[weight],
        align && cssClasses[`align-${align}`],
        italic && cssClasses.italic,
        uppercase && cssClasses.uppercase,
        inline && cssClasses.inline,
        paragraph && cssClasses.paragraph,
        ellipsis && cssClasses.ellipsis,
        muted && cssClasses.muted
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
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

Text.displayName = displayName;

export default Text;