import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react';

import type { Align, HTMLDivProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import GridItem from './GridItem';

import cssClasses from './Grid.scss';

export type GridProps = PropsWithChildren<{
    as?: 'div';
    align?: Align;
    fixedColumnWidth?: boolean;
}, HTMLDivProps>;

type GridFC = ForwardRefExoticComponent<GridProps & RefAttributes<HTMLDivElement>> & {
    Item?: typeof GridItem;
};

const displayName = 'Grid';
const elementClassNames = getElementClassNames(displayName, ['inner']);

const Grid: GridFC = forwardRef<HTMLDivElement, GridProps>(({
    align,
    fixedColumnWidth = false,

    as: Tag = 'div',
    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        align && cssClasses[`align-${align}`],
        fixedColumnWidth && cssClasses.fixedColumnWidth
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            <div className={cn(elementClassNames.inner, cssClasses.inner)}>
                {children}
            </div>
        </Tag>
    );
});

Grid.displayName = displayName;

Grid.Item = GridItem;

export default Grid;