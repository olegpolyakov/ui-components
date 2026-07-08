import { useCallback, useRef, useState } from 'react';

import { isKeyboardEvent } from '@dnd-kit/dom/utilities';
import type { DragDropManager, DragEndEvent, DragMoveEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import { buildTree, flattenTree, getDescendants, getDragDepth, getProjection } from './helpers';
import type { Item, FlattenedItem } from './types';

export default function useSortableTree(
    items: Item[],
    indentation: number = 50,
    onChange: (items: Item[]) => void
) {
    const initialDepth = useRef(0);
    const sourceChildren = useRef<FlattenedItem[]>([]);
    
    const [flattenedItems, setFlattenedItems] = useState<FlattenedItem[]>(() =>
        flattenTree(items)
    );
    
    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { source } = event.operation;

        if (!source) return;

        const { depth } = flattenedItems.find(({ id }) => id === source.id)!;

        // Store the source item's initial depth for later use
        initialDepth.current = depth;

        setFlattenedItems(flattenedItems => {
            sourceChildren.current = [];

            // Get all descendants of the source item
            const descendants = getDescendants(flattenedItems, source.id);

            return flattenedItems.filter(item => {
                if (descendants.has(item.id)) {
                    sourceChildren.current = [...sourceChildren.current, item];
                    return false;
                }

                return true;
            });
        });

        initialDepth.current = depth;
    }, [flattenedItems]);

    const handleDragMove = useCallback((event: DragMoveEvent, manager: DragDropManager) => {
        if (event.defaultPrevented) {
            return;
        }

        const { source, target } = event.operation;

        if (source && target) {
            const keyboard = isKeyboardEvent(event.operation.activatorEvent);
            const currentDepth = source.data!.depth ?? 0;
            let keyboardDepth;

            if (keyboard) {
                const isHorizontal = event.by?.x !== 0 && event.by?.y === 0;

                if (isHorizontal) {
                    event.preventDefault();

                    keyboardDepth = currentDepth + Math.sign(event.by!.x);
                }
            }

            const offsetLeft = manager.dragOperation.transform.x;
            const dragDepth = getDragDepth(offsetLeft, indentation);

            const projectedDepth = keyboardDepth ?? initialDepth.current + dragDepth;

            const { depth, parentId } = getProjection(
                flattenedItems,
                source.id,
                projectedDepth
            );

            if (keyboard) {
                if (currentDepth !== depth) {
                    const offset = indentation * (depth - currentDepth);

                    manager.actions.move({
                        by: { x: offset, y: 0 },
                        propagate: false
                    });
                }
            }

            if (
                source.data!.depth !== depth ||
                source.data!.parentId !== parentId
            ) {
                setFlattenedItems(flattenedItems => {
                    return flattenedItems.map(item =>
                        item.id === source.id ? { ...item, depth, parentId } : item
                    );
                });
            }
        }
    }, [flattenedItems, indentation]);

    const handleDragOver = useCallback((event: DragOverEvent, manager: DragDropManager) => {
        const { source, target } = event.operation;

        event.preventDefault();

        if (source && target && source.id !== target.id) {
            setFlattenedItems(flattenedItems => {
                const offsetLeft = manager.dragOperation.transform.x;
                const dragDepth = getDragDepth(offsetLeft, indentation);
                const projectedDepth = initialDepth.current + dragDepth;

                const { depth, parentId } = getProjection(
                    flattenedItems,
                    target.id,
                    projectedDepth
                );

                const sortedItems = move(flattenedItems, event);
                const newItems = sortedItems.map(item =>
                    item.id === source.id ? { ...item, depth, parentId } : item
                );

                return newItems;
            });
        }
    }, [indentation]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        if (event.canceled) {
            return setFlattenedItems(flattenTree(items));
        }
        
        const updatedTree = buildTree([
            ...flattenedItems,
            ...sourceChildren.current
        ]);
        
        setFlattenedItems(flattenTree(updatedTree));
        
        onChange(updatedTree);
    }, [items, flattenedItems, onChange]);

    return {
        flattenedItems,
        setFlattenedItems,
        sourceChildren,
        handleDragStart,
        handleDragMove,
        handleDragOver,
        handleDragEnd
    };
}