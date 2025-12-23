import type { ComponentProps, ElementType, HTMLProps, PropsWithKey, Size, Slotted, Space } from '../../types';
import { classnames as cn, getElementClassNames, resolveChildren } from '../../utils';

import Link, { LinkProps } from '../Link';
import Slot from '../Slot';

import styles from './Breadcrumbs.module.scss';

export type BreadcrumbsProps = {
    items?: PropsWithKey<LinkProps>[];
    separator?: Slotted<HTMLProps>;
    size?: Size;
    gap?: Space;
};

Breadcrumbs.displayName = 'Breadcrumbs';

const elementClassNames = getElementClassNames(
    Breadcrumbs.displayName
);

export default function Breadcrumbs<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items = [],
    separator = '/',
    size = 'm',
    gap = 'xs',
    ...props
}: ComponentProps<BreadcrumbsProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        styles[`gap-${gap}`]
    );

    const resolvedItems = resolveChildren(children, items);

    return (
        <Root className={classNames} {...props}>
            {resolvedItems.map(({ key, ...props }, index) => <>
                <Link
                    key={key}
                    size={size}
                    {...props}
                />

                {index < resolvedItems.length - 1 &&
                    <Slot fallback="span" className={styles.separator}>
                        {separator}
                    </Slot>
                }
            </>)}
        </Root>
    );
}