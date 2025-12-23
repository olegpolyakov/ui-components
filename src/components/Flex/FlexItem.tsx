import type { Align, ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './FlexItem.module.scss';

export type FlexItemProps = {
    alignX?: Align;
    alignY?: Align;
    alignCenter?: boolean;
    grow?: boolean;
    shrink?: boolean;
};

FlexItem.displayName = 'FlexItem';

const elementClassNames = getElementClassNames(FlexItem.displayName);

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
        elementClassNames.root,
        grow && styles.grow,
        shrink && styles.shrink,
        alignX && styles.alignX,
        alignY && styles.alignY,
        alignCenter && styles.alignCenter
    );

    return (
        <Root className={classNames} {...props} />
    );
}