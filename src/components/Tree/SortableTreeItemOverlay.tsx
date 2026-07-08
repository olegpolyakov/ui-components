import type { UniqueIdentifier } from '@dnd-kit/abstract';

import Badge from '../Badge';
import Icon from '../Icon';
import Item from '../Item';

import styles from './TreeItem.module.scss';

export type SortableTreeItemOverlayProps = {
  id: UniqueIdentifier;
  count: number;
}

export default function SortableTreeItemOverlay({
    id,
    count
}: SortableTreeItemOverlayProps) {
    return (
        <Item
            className={styles.root}
            start={
                <Icon name="drag_indicator" size="s" />
            }
            content={id}
            end={count > 0 &&
                <Badge content={count} />
            }
            active
            data-overlay
        />
    );
}