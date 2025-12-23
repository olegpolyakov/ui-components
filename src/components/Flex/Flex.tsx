import type { Align, ComponentProps, ElementType, Justify, SizeFull } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Flex.module.scss';

export type FlexProps = {
    dir?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    column?: boolean;
    align?: Align;
    justify?: Justify;
    gap?: SizeFull;
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
    inline,
    wrap,
    ...props
}: ComponentProps<FlexProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[dir],
        column && styles.column,
        align && styles[`align-${align}`],
        justify && styles[`justify-${justify}`],
        gap && styles[`gap-${gap}`],
        inline && styles.inline,
        wrap && styles.wrap
    );

    return (
        <Root className={classNames} {...props} />
    );
}