import { DragDropProvider, DragOverlay } from '@dnd-kit/react';

import { cn } from '../../component';
import type { ComponentProps, ElementType } from '../../types';

import Button from '../Button';

import SortableTreeItem from './SortableTreeItem';
import SortableTreeItemOverlay from './SortableTreeItemOverlay';
import { buildTree, flattenTree } from './helpers';
import type { Item } from './types';
import useSortableTree from './useSortableTree';

import styles from './Tree.module.scss';

export type SortableTreeProps = {
  items: Item[];
  indentation?: number;
  onChange: (items: Item[]) => void;
}

SortableTree.displayName = 'SortableTree';

export default function SortableTree<T extends ElementType = 'ul'>({
    as,
    className,

    items = [],
    indentation = 50,
    canRemove,
    onChange,
    ...props
}: ComponentProps<SortableTreeProps, T>) {
    const {
        flattenedItems,
        setFlattenedItems,
        sourceChildren,
        handleDragStart,
        handleDragMove,
        handleDragOver,
        handleDragEnd
    } = useSortableTree(items, indentation, onChange);

    const removeItem = (item: Item) => {
        const newItems = flattenedItems.filter(({ id }) => id !== item.id);
        const tree = buildTree(newItems);

        setFlattenedItems(flattenTree(tree));
        onChange?.(tree);
    };

    const Component = as || 'ul';
    const classNames = cn(
        className,
        { interactive: false },
        styles
    );

    return (
        <DragDropProvider
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Component className={classNames} {...props}>
                {flattenedItems.map((item, index) => (
                    <SortableTreeItem
                        key={item.id}
                        {...item}
                        index={index}
                        end={canRemove &&
                            <Button
                                icon="remove"
                                onClick={() => removeItem(item)}
                            />
                        }
                    />
                ))}
            </Component>
            
            <DragOverlay style={{ width: 'min-content' }}>
                {source => (
                    <SortableTreeItemOverlay
                        id={source.id}
                        count={sourceChildren.current.length}
                    />
                )}
            </DragOverlay>
        </DragDropProvider>
    );
}