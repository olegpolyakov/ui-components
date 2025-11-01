import type { Align, ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssGridClasses from './Grid.module.scss';
import cssClasses from './GridItem.module.scss';

type GridItemSpan = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type GridItemProps = {
    span?: GridItemSpan;
    desktop?: GridItemSpan;
    tablet?: GridItemSpan;
    phone?: GridItemSpan;
    order?: GridItemSpan;
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
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        span && cssClasses[`span-${span}`],
        desktop && cssClasses[`span-${desktop}-desktop`],
        tablet && cssClasses[`span-${tablet}-tablet`],
        phone && cssClasses[`span-${phone}-phone`],
        order && cssClasses[`order-${order}`],
        align && cssClasses[`align-${align}`]
    );

    return (
        <Component className={classNames} {...props}>
            {grid ?
                <div className={cssGridClasses.inner}>
                    {children}
                </div>
                :
                children
            }
        </Component>
    );
}