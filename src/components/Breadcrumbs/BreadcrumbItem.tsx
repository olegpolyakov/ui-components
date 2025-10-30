import { ReactNode } from 'react';

import type { ComponentProps, ElementType, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './BreadcrumbItem.module.scss';

export type BreadcrumbItemProps = {
    content?: ReactNode;
    size?: Size;
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

const elementClassNames = getElementClassNames(
    BreadcrumbItem.displayName
);

export default function BreadcrumbItem<T extends ElementType = 'span'>({
    as,
    children,
    className,

    content = children,
    size = 'm',
    ...props
}: ComponentProps<BreadcrumbItemProps, T>) {
    const Component = as || 'span';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses[size]
    );

    return (
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}