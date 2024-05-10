import { type ForwardRefExoticComponent, type HTMLAttributes, forwardRef } from 'react';

import { Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';

import cssClasses from './Table.scss';

export type TableProps = {
    size?: Size;
    interactive?: boolean;
    striped?: 'even' | 'odd';
} & HTMLAttributes<HTMLTableElement>;

const displayName = 'Table';
const elementClassNames = getElementClassNames(displayName);

const Table = forwardRef<HTMLTableElement, TableProps>(({
    size = 'medium',
    interactive,
    striped,

    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        interactive && cssClasses.interactive,
        striped && cssClasses[`striped-${striped}`]
    );

    return (
        <table ref={ref} className={classNames} {...props}>
            {children}
        </table>
    );
}) as ForwardRefExoticComponent<TableProps> & {
    Body: typeof TableBody;
    Cell: typeof TableCell;
    Head: typeof TableHead;
    Row: typeof TableRow;
};

Table.displayName = displayName;

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;

export default Table;