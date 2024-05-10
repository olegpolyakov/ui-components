import { type HTMLAttributes, forwardRef } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './TableBody.scss';

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

const displayName = 'TableBody';
const elementClassNames = getElementClassNames(displayName);

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({
    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <tbody ref={ref} className={classNames} {...props}>
            {children}
        </tbody>
    );
});

TableBody.displayName = displayName;

export default TableBody;