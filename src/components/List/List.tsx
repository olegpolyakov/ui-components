import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import ListItem, { type ListItemProps } from './ListItem';

import cssClasses from './List.module.scss';

export type ListProps = {
    items?: PropsWithKey<ListItemProps>[];
    size?: Size;
    gap?: Size;
    interactive?: boolean;
};

List.displayName = 'List';
List.Item = ListItem;

const elementClassNames = getElementClassNames(
    List.displayName
);

export default function List<T extends ElementType = 'ul'>({
    as,
    className,
    children,

    items,
    size = 'm',
    gap,
    interactive,
    ...props
}: ComponentProps<ListProps, T>) {
    const Component = as || 'ul';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        gap && cssClasses[`gap-${gap}`]
    );

    return (
        <Component className={classNames} {...props}>
            {items?.map(item =>
                <ListItem
                    key={item.key}
                    interactive={interactive}
                    {...item}
                />
            )}

            {children}
        </Component>
    );
}