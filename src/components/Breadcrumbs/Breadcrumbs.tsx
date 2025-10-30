import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem';

import cssClasses from './Breadcrumbs.module.scss';

export type BreadcrumbsProps = {
    items?: PropsWithKey<BreadcrumbItemProps>[];
    size?: Size;
};

Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.Item = BreadcrumbItem;

const elementClassNames = getElementClassNames(
    Breadcrumbs.displayName
);

export default function Breadcrumbs<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items,
    size = 'm',
    ...props
}: ComponentProps<BreadcrumbsProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size]
    );

    return (
        <Component className={classNames} {...props}>
            {items?.map(({ key, ...props }) =>
                <BreadcrumbItem key={key} {...props} />
            )}
            {children}
        </Component>
    );
}