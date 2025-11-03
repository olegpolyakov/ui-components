import type { ReactNode } from 'react';

import type { Size, ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';

import styles from './Table.module.scss';

export type TableProps = {
    content?: ReactNode;
    size?: Size;
    interactive?: boolean;
    striped?: 'even' | 'odd';
};

Table.displayName = 'Table';

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;

const elementClassNames = getElementClassNames(Table.displayName);

export default function Table({
    className,
    children,

    content = children,
    size = 'm',
    interactive,
    striped,
    ...props
}: ComponentProps<TableProps, 'table'>) {
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        interactive && styles.interactive,
        striped && styles[`striped-${striped}`]
    );

    return (
        <table className={classNames} {...props}>
            {content}
        </table>
    );
}