import { forwardRef } from 'react';

import type { Align, HTMLDivProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './FlexItem.scss';

export type FlexItemProps = PropsWithChildren<{
    as?: 'div';
    alignX?: Align;
    alignY?: Align;
    alignCenter?: boolean;
    grow?: boolean;
    shrink?: boolean;
}, HTMLDivProps>;

const displayName = 'FlexItem';
const elementClassNames = getElementClassNames(displayName);

const FlexItem = forwardRef<HTMLDivElement, FlexItemProps>(({
    alignX,
    alignY,
    alignCenter,
    grow,
    shrink,

    as: Tag = 'div',
    className,
    ...props
}, ref) => {
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
        <Tag ref={ref} className={classNames} {...props} />
    );
});

FlexItem.displayName = displayName;

export default FlexItem;