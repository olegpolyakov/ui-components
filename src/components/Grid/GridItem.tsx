import type { Align, ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import gridStyles from './Grid.module.scss';
import styles from './GridItem.module.scss';

type Span = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type GridItemProps = {
    span?: Span;
    desktop?: Span;
    tablet?: Span;
    phone?: Span;
    order?: Span;
    align?: Align;
    grid?: boolean;
};

GridItem.displayName = 'GridItem';

const elementClassNames = getElementClassNames(GridItem.displayName);

export default function GridItem<T extends ElementType = 'div'>({
    as,
    className,
    children,

    span,
    desktop,
    tablet,
    phone,
    order,
    align,
    grid,
    ...props
}: ComponentProps<GridItemProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        span && styles[`span-${span}`],
        desktop && styles[`span-${desktop}-desktop`],
        tablet && styles[`span-${tablet}-tablet`],
        phone && styles[`span-${phone}-phone`],
        order && styles[`order-${order}`],
        align && styles[`align-${align}`]
    );

    return (
        <Root className={classNames} {...props}>
            {grid ?
                <div className={gridStyles.inner}>
                    {children}
                </div>
                :
                children
            }
        </Root>
    );
}