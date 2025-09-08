import { type HTMLAttributes, forwardRef } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './TableCell.module.scss';

export type TableCellProps = {
    alignH?: 'left' | 'center' | 'right';
    alignV?: 'top' | 'middle' | 'bottom';
    header?: boolean;
} & HTMLAttributes<HTMLTableCellElement>;

const displayName = 'TableCell';
const elementClassNames = getElementClassNames(displayName);

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({
    alignH,
    alignV,
    header,

    children,
    className,
    ...props
}, ref) => {
    const Tag = header ? 'th' : 'td';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        alignH && cssClasses[alignH],
        alignV && cssClasses[alignV]
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {children}
        </Tag>
    );
});

TableCell.displayName = displayName;

export default TableCell;