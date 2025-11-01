import type { Align, ComponentProps, ElementType, Justify, SizeFull } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Flex.module.scss';

export type FlexProps = {
    as?: 'div';
    dir?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    column?: boolean;
    align?: Align;
    justify?: Justify;
    gap?: SizeFull;
    padding?: SizeFull;
    paddingX?: SizeFull;
    paddingY?: SizeFull;
    inline?: boolean;
    wrap?: boolean;
};

Flex.displayName = 'Flex';

const elementClassNames = getElementClassNames(Flex.displayName);

export default function Flex<T extends ElementType = 'div'>({
    as,
    className,

    dir = 'row',
    column,
    align,
    justify,
    gap,
    padding,
    paddingX,
    paddingY,
    inline,
    wrap,
    ...props
}: ComponentProps<FlexProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[dir],
        column && cssClasses.column,
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
        <Component className={classNames} {...props} />
    );
}