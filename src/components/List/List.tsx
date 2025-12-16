import { Children, cloneElement, isValidElement } from 'react';
import type { ComponentProps, ElementType, PropsOf, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Item, { type ItemProps } from '../Item';

import styles from './List.module.scss';

export type ListProps = {
    items?: PropsWithKey<ItemProps>[];
    size?: Size;
    gap?: Size;
    interactive?: boolean;
};

List.displayName = 'List';

const elementClassNames = getElementClassNames(
    List.displayName,
    ['item']
);

export default function List<T extends ElementType = 'ul'>({
    as,
    className,
    children,

    items,
    size,
    gap,
    interactive,
    ...props
}: ComponentProps<ListProps, T>) {
    const Component = as || 'ul';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        size && styles[size],
        gap && styles[`gap-${gap}`]
    );

    const itemAs = as === 'ol' || as === 'ul' ? 'li' : undefined;

    return (
        <Component className={classNames} {...props}>
            {items?.map(item =>
                <Item
                    key={item.key}
                    as={itemAs}
                    size={size}
                    interactive={interactive}
                    {...item}
                />
            )}

            {Children.map(children, child =>
                isValidElement<PropsOf<typeof Item>>(child) &&
                cloneElement(child, {
                    as: child.props.as || itemAs,
                    size: child.props.size || size,
                    interactive: child.props.interactive || interactive
                })
            )}
        </Component>
    );
}