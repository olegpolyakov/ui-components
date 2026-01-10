import { cn } from '../../component';
import type { Align, ComponentProps, ElementType } from '../../types';

import GridItem from './GridItem';

import styles from './Grid.module.scss';

export type GridProps = {
    align?: Align;
};

Grid.displayName = 'Grid';
Grid.Item = GridItem;

export default function Grid<T extends ElementType = 'div'>({
    as,
    className,
    children,

    align,
    ...props
}: ComponentProps<GridProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        { [`align-${align}`]: align },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            <div className={styles.inner}>
                {children}
            </div>
        </Component>
    );
}