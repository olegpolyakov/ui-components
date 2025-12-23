import type { Align, ComponentProps, ElementType, HTMLDivProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import GridItem from './GridItem';

import styles from './Grid.module.scss';

export type GridProps = PropsWithChildren<{
    align?: Align;
    fixedColumnWidth?: boolean;
}, HTMLDivProps>;


Grid.displayName = 'Grid';
Grid.Item = GridItem;

const elementClassNames = getElementClassNames(Grid.displayName, ['inner']);

export default function Grid<T extends ElementType = 'div'>({
    as,
    className,
    children,

    align,
    fixedColumnWidth = false,
    ...props
}: ComponentProps<GridProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        align && styles[`align-${align}`],
        fixedColumnWidth && styles.fixedColumnWidth
    );

    return (
        <Component className={classNames} {...props}>
            <div className={cn(elementClassNames.inner, styles.inner)}>
                {children}
            </div>
        </Component>
    );
}