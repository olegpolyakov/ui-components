import { cn } from '../../component';
import type { Align, ComponentProps, ElementType, Justify, Space } from '../../types';

import styles from './Flex.module.scss';

export type FlexProps = {
    dir?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
    column?: boolean;
    align?: Align;
    justify?: Justify;
    gap?: Space;
    inline?: boolean;
    wrap?: boolean;
};

Flex.displayName = 'Flex';

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
    const classNames = cn(className, {
        dir,
        column,
        [`align-${align}`]: align,
        [`justify-${justify}`]: justify,
        inline,
        wrap,
        gap
    }, styles);

    return (
        <Root className={classNames} {...props} />
    );
}