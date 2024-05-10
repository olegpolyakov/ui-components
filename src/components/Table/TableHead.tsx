import { type HTMLAttributes, forwardRef } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './TableHead.scss';

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;

const displayName = 'TableHead';
const elementClassNames = getElementClassNames(displayName);

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(({
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
        <thead ref={ref} className={classNames} {...props}>
            {children}
        </thead>
    );
});

TableHead.displayName = displayName;

export default TableHead;