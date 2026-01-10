import { cn } from '../../component';
import type { Align, ComponentProps, ElementType } from '../../types';

import styles from './FlexItem.module.scss';

export type FlexItemProps = {
    alignX?: Align;
    alignY?: Align;
    alignCenter?: boolean;
    grow?: boolean;
    shrink?: boolean;
};

FlexItem.displayName = 'FlexItem';

export default function FlexItem<T extends ElementType = 'div'>({
    as,
    className,

    grow,
    shrink,
    alignX,
    alignY,
    alignCenter,
    ...props
}: ComponentProps<FlexItemProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        {
            grow,
            shrink,
            alignX,
            alignY,
            alignCenter
        },
        styles
    );

    return (
        <Root className={classNames} {...props} />
    );
}