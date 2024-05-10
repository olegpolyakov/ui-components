import { forwardRef } from 'react';

import type { Align, HTMLDivProps, Justify, PropsWithChildren, SizeFull } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Flex.scss';

export type FlexProps = PropsWithChildren<{
    as?: 'div';
    dir?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: Align;
    justify?: Justify;
    gap?: SizeFull;
    padding?: SizeFull;
    paddingX?: SizeFull;
    paddingY?: SizeFull;
    inline?: boolean;
    wrap?: boolean;
}, HTMLDivProps>;

const displayName = 'Flex';
const elementClassNames = getElementClassNames(displayName);

const Flex = forwardRef<HTMLDivElement, FlexProps>(({
    dir = 'row',
    align,
    justify,
    gap,
    padding,
    paddingX,
    paddingY,
    inline,
    wrap,

    as: Tag = 'div',
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[dir],
        align && cssClasses[`align-${align}`],
        justify && cssClasses[`justify-${justify}`],
        gap && cssClasses[`gap-${gap}`],
        padding && cssClasses[`padding-${padding}`],
        paddingX && cssClasses[`padding-x-${paddingX}`],
        paddingY && cssClasses[`padding-y-${paddingY}`],
        inline && cssClasses.inline,
        wrap && cssClasses.wrap
    );

    return (
        <Tag ref={ref} className={classNames} {...props} />
    );
});

Flex.displayName = displayName;

export default Flex;