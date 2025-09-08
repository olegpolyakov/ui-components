import { ForwardRefExoticComponent, forwardRef } from 'react';

import type { PropsWithChildren, PropsWithKey, Size } from '../../types';
import { classnames as cn } from '../../utils';

import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem';

import cssClasses from './Breadcrumbs.module.scss';

export type BreadcrumbProps = PropsWithChildren<{
    items?: PropsWithKey<BreadcrumbItemProps>[];
    size?: Size;
}>;

const displayName = 'Breadcrumbs';

const Breadcrumbs: ForwardRefExoticComponent<BreadcrumbProps> & {
    Item?: typeof BreadcrumbItem;
} = forwardRef<HTMLDivElement, BreadcrumbProps>(({
    items,
    size = 'medium',

    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        'ui-Breadcrumb',
        cssClasses[size]
    );

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            {items?.map(item =>
                <BreadcrumbItem key={item.key} {...item} />
            )}
            {children}
        </div>
    );
});

Breadcrumbs.displayName = displayName;
Breadcrumbs.Item = BreadcrumbItem;

export default Breadcrumbs;