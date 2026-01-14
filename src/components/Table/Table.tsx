import type { ReactNode } from 'react';

import { cn } from '../../component';
import type { Size, ComponentProps } from '../../types';

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';

import styles from './Table.module.scss';

export type TableProps = {
    content?: ReactNode;
    size?: Size;
    interactive?: boolean;
};

Table.displayName = 'Table';

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;

export default function Table({
    className,
    children,

    content = children,
    size = 'm',
    interactive,
    ...props
}: ComponentProps<TableProps, 'table'>) {
    const classNames = cn(
        className,
        {
            size,
            interactive
        },
        styles
    );

    return (
        <table className={classNames} {...props}>
            {content}
        </table>
    );
}