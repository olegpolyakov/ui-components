import type { Align, ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './FlexItem.module.scss';

export type FlexItemProps = {
    as?: 'div';
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

    alignX,
    alignY,
    alignCenter,
    grow,
    shrink,
    ...props
}: ComponentProps<FlexItemProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        alignX && cssClasses.alignX,
        alignY && cssClasses.alignY,
        alignCenter && cssClasses.alignCenter,
        grow && cssClasses.grow,
        shrink && cssClasses.shrink
    );

    return (
        <Component className={classNames} {...props} />
    );
}