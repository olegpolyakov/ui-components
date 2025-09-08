import { type HTMLAttributes, forwardRef } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './TableRow.module.scss';

export type TableRowProps = {
    interactive?: boolean;
} & HTMLAttributes<HTMLTableRowElement>;

const displayName = 'TableRow';
const elementClassNames = getElementClassNames(displayName);

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({
    interactive,

    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        interactive && cssClasses.interactive
    );

    return (
        <tr ref={ref} className={classNames} {...props}>
            {children}
        </tr>
    );
});

TableRow.displayName = displayName;

export default TableRow;