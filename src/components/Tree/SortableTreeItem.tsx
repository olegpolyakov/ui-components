import { useSortable } from '@dnd-kit/react/sortable';

import Icon from '../Icon';
import Item, { type ItemProps } from '../Item';

import styles from './SortableTreeItem.module.scss';

const config = {
    alignment: {
        x: 'start',
        y: 'center'
    },
    transition: {
        idle: true
    }
} as const;

export type SortableTreeItem = ItemProps & {
    id: string;
    depth: number;
    index: number;
    parentId: string | null;
};

export default function SortableTreeItem({
    id,
    index,
    depth,
    parentId,
    ...props
}: SortableTreeItem) {
    const { ref, handleRef, isDragSource } = useSortable({
        ...config,
        id,
        index,
        data: {
            depth,
            parentId
        }
    });

    return (
        <Item
            ref={ref}
            className={styles.root}
            start={
                <Icon
                    ref={handleRef}
                    className={styles.handle}
                    name="drag_indicator"
                    size="s"
                />
            }
            content={id}
            data-depth={depth}
            aria-hidden={isDragSource}
            {...props}
        />
    );
}