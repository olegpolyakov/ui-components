import { UniqueIdentifier } from '@dnd-kit/abstract';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import List, { ListProps } from './List';
import { ItemProps, SortableItem } from '../Item';
import { useCallback } from 'react';

export type SortableListProps = Omit<ListProps, 'items'> & {
    items: ItemProps & { id: UniqueIdentifier }[];
    onChange: (ids: UniqueIdentifier[]) => void;
};

export default function SortableList({
    items,
    onChange,
    ...props
}: SortableListProps) {
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
                const ids = items.map(item => item.id);
                const [removed] = ids.splice(initialIndex, 1);
                ids.splice(index, 0, removed);
                onChange?.(ids);
            }
        }
    }, [items, onChange]);

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <List {...props}>
                {items.map((item, index) => (
                    <SortableItem
                        key={item.id}
                        {...item}
                        index={index}
                        interactive
                    />
                ))}
            </List>
        </DragDropProvider>
    );
}