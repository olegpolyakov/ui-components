import { ReactNode } from 'react';

import type { Color, Variant, Shape, ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './ListItem.module.scss';

export type ListItemProps = {
    start?: ReactNode;
    content?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    variant?: Variant;
    disabled?: boolean;
    interactive?: boolean;
    active?: boolean;
};

ListItem.displayName = 'ListItem';

const elementClassNames = getElementClassNames(
    ListItem.displayName,
    ['start', 'content', 'end']
);

export default function ListItem<T extends ElementType = 'li'>({
    as,
    children,
    className,

    content = children,
    start,
    end,
    color,
    shape,
    variant = 'plain',
    disabled,
    active,
    interactive,
    ...props
}: ComponentProps<ListItemProps, T>) {
    const Component = as || 'li';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        shape && cssClasses[shape],
        cssClasses[variant],
        disabled && cssClasses.disabled,
        active && cssClasses.active,
        interactive && cssClasses.interactive
    );

    return (
        <Component className={classNames} data-active={active} {...props}>
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