import { ReactNode, forwardRef } from 'react';

import type { PropsWithChildren, Size } from '../../types';
import { classnames as cn } from '../../utils';

export type BreadcrumbItemProps = PropsWithChildren<{
    content?: ReactNode;
    size?: Size;
}>;

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(({
    content,
    size,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className, 'ui-BreadcrumbItem'
    );

    return (
        <span
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </span>
    );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;