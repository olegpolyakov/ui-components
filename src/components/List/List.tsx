import { cn, renderChildren } from '../../component';
import type { ComponentProps, ElementType, PropsWithKey, Shape, Size, Variant } from '../../types';

import Item, { type ItemProps } from '../Item';

import styles from './List.module.scss';

export type ListProps = {
    items?: PropsWithKey<ItemProps>[];
    gap?: Size;
    size?: Size;
    shape?: Exclude<Shape, 'circular'>;
    variant?: Exclude<Variant, 'filled' | 'outlined-filled' | 'text'>;
    interactive?: boolean;
};

List.displayName = 'List';

export default function List<T extends ElementType = 'ul'>({
    as,
    className,
    children,

    items = [],
    gap,
    size,
    shape,
    interactive,
    variant,
    ...props
}: ComponentProps<ListProps, T>) {
    const Component = as || 'ul';
    const classNames = cn(
        className,
        { gap, interactive: false },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            {renderChildren(children, items, Item, {
                size,
                shape,
                variant,
                interactive
            })}
        </Component>
    );
}