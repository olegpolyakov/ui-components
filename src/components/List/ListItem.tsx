import { ReactNode, forwardRef } from 'react';

import type { HTMLListItemProps, PropsWithChildren, Color, Variant, Shape } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './ListItem.scss';

export type ListItemProps = PropsWithChildren<{
    as?: 'li';
    start?: ReactNode;
    content?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    variant?: Variant;
    interactive?: boolean;
    selected?: boolean;
    disabled?: boolean;
}, HTMLListItemProps>;

const displayName = 'ListItem';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'end']);

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({
    start,
    content,
    end,
    color,
    shape,
    variant = 'plain',
    interactive,
    selected,
    disabled,

    as: Tag = 'li',
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        shape && cssClasses[shape],
        cssClasses[variant],
        interactive && cssClasses.interactive,
        selected && cssClasses.selected,
        disabled && cssClasses.disabled
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

ListItem.displayName = displayName;

export default ListItem;