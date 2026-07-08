import { useMemo } from 'react';

import { cn } from '../../component';
import type { ComponentProps, ElementType, Shape, Size, Variant } from '../../types';

import Item from '../Item';

import { flattenTree } from './helpers';
import type { Item as IItem } from './types';

import styles from './Tree.module.scss';

export type TreeProps = {
    items: IItem[];
    gap?: Size;
    size?: Size;
    shape?: Exclude<Shape, 'circular'>;
    variant?: Exclude<Variant, 'filled' | 'outlined-filled' | 'text'>;
    interactive?: boolean;
}

Tree.displayName = 'Tree';

export default function Tree<T extends ElementType = 'ul'>({
    as,
    className,

    items = [],
    gap,
    size,
    shape,
    variant,
    interactive,
    ...props
}: ComponentProps<TreeProps, T>) {
    const flattenedItems = useMemo(() => flattenTree(items), [items]);

    const Component = as || 'ul';
    const classNames = cn(className,
        {
            gap,
            size,
            interactive: false
        },
        styles);

    return (
        <Component className={classNames} {...props}>
            {flattenedItems.map(({
                id,
                index: itemIndex,
                depth,
                parentId,
                children,
                ...rest
            }, index) => (
                <Item
                    key={id || index}
                    size={size}
                    shape={shape}
                    variant={variant}
                    interactive={interactive}
                    data-index={itemIndex}
                    data-depth={depth}
                    {...rest}
                />
            ))}
        </Component>
    );
}