import { UniqueIdentifier } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';

import Item, { ItemProps } from './Item';

export type SortableItemProps = ItemProps & {
    id: UniqueIdentifier;
    index: number;
};

export default function SortableItem({
    id,
    index,
    ...props
}: SortableItemProps) {
    const { ref } = useSortable({ id, index });
    
    return (
        <Item
            ref={ref}
            {...props}
        />
    );
}