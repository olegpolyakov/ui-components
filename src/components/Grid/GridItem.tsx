import { forwardRef } from 'react';

import type { Align, HTMLDivProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssGridClasses from './Grid.module.scss';
import cssClasses from './GridItem.module.scss';

type GridItemSpan = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type GridItemProps = PropsWithChildren<{
    as?: 'div';
    span?: GridItemSpan;
    desktop?: GridItemSpan;
    tablet?: GridItemSpan;
    phone?: GridItemSpan;
    order?: GridItemSpan;
    align?: Align;
    grid?: boolean;
}, HTMLDivProps>;

const displayName = 'GridItem';
const elementClassNames = getElementClassNames(displayName);

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(({
    span,
    desktop,
    tablet,
    phone,
    order,
    align,
    grid = false,

    as: Tag = 'div',
    className,
    children,
    ...props
}, ref) => {
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
        <Tag ref={ref} className={classNames} {...props}>
            {grid ?
                <div className={cssGridClasses.inner}>
                    {children}
                </div>
                :
                children
            }
        </Tag>
    );
});

GridItem.displayName = displayName;

export default GridItem;