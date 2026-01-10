import type { ReactNode } from 'react';

import type { ComponentProps } from '../../types';
import { cn } from '../../utils';

import styles from './TableRow.module.scss';

export type TableRowProps = {
    content?: ReactNode;
    interactive?: boolean;
};

TableRow.displayName = 'TableRow';

export default function TableRow({
    className,
    children,

    content = children,
    interactive,
    ...props
}: ComponentProps<TableRowProps, 'tr'>) {
    const classNames = cn(
        className,
        styles.root,
        interactive && styles.interactive
    );

    return (
        <tr className={classNames} {...props}>
            {content}
        </tr>
    );
}