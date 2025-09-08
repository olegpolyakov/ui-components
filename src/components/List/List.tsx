import { ForwardRefExoticComponent, forwardRef } from 'react';

import type { HTMLListProps, PropsWithChildren, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import ListItem, { type ListItemProps } from './ListItem';

import cssClasses from './List.module.scss';

export type ListProps = PropsWithChildren<{
    as?: 'ol' | 'ul';
    items?: PropsWithKey<ListItemProps>[];
    size?: Size;
    gap?: Size;
    interactive?: boolean;
}, HTMLListProps>;

const displayName = 'List';
const elementClassNames = getElementClassNames(displayName);

const List: ForwardRefExoticComponent<ListProps> & {
    Item?: typeof ListItem;
} = forwardRef<HTMLOListElement, ListProps>(({
    items,
    size = 'medium',
    gap,
    interactive,

    as: Tag = 'ul',
    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        gap && cssClasses[`gap-${gap}`]
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {items?.map(item =>
                <ListItem
                    key={item.key}
                    interactive={interactive}
                    {...item}
                />
            )}

            {children}
        </Tag>
    );
});

List.displayName = displayName;
List.Item = ListItem;

export default List;