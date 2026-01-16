import React from 'react';

import { cn, resolveChildren } from '../../component';
import type { ComponentProps, ElementType, HTMLProps, PropsWithKey, Size, Space } from '../../types';

import Link, { LinkProps } from '../Link';
import Slot, { Slotted } from '../Slot';

import styles from './Breadcrumbs.module.scss';

export type BreadcrumbsProps = {
    items?: PropsWithKey<LinkProps>[];
    separator?: Slotted<HTMLProps>;
    size?: Size;
    gap?: Space;
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default function Breadcrumbs<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items = [],
    separator = '/',
    size = 'm',
    gap,
    ...props
}: ComponentProps<BreadcrumbsProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        size,
        gap
    }, styles);

    const resolvedItems = resolveChildren(children, items);

    return (
        <Root className={classNames} {...props}>
            {resolvedItems.map(({ key, ...props }, index) => (
                <React.Fragment key={key}>
                    <Link
                        size={size}
                        {...props}
                    />

                    {index < resolvedItems.length - 1 &&
                        <Slot fallback="span" className={styles.separator}>
                            {separator}
                        </Slot>
                    }
                </React.Fragment>
            ))}
        </Root>
    );
}