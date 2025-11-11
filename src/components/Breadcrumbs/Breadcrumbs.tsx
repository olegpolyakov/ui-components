import type { ReactNode } from 'react';
import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Link, { LinkProps } from '../Link';

import styles from './Breadcrumbs.module.scss';

export type BreadcrumbsProps = {
    items?: PropsWithKey<LinkProps>[];
    separator?: ReactNode;
    size?: Size;
};

Breadcrumbs.displayName = 'Breadcrumbs';

const elementClassNames = getElementClassNames(
    Breadcrumbs.displayName
);

export default function Breadcrumbs<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items,
    separator = '/',
    size = 'm',
    ...props
}: ComponentProps<BreadcrumbsProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size]
    );

    return (
        <Component className={classNames} {...props}>
            {items?.map(({ key, ...props }, index) => <>
                <Link
                    key={key}
                    size={size}
                    {...props}
                />

                {index < items.length - 1 &&
                    <span className={styles.separator}>{separator}</span>
                }
            </>)}

            {children}
        </Component>
    );
}