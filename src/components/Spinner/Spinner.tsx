import { forwardRef } from 'react';

import type { Color, Props, SizeExtended } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Spinner.module.scss';

export type SpinnerProps = Props<{
    as?: 'div';
    color?: Color;
    size?: SizeExtended;
}>;

const displayName = 'Spinner';
const elementClassNames = getElementClassNames(displayName);

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
    color,
    size = 'medium',

    as: Tag = 'div',
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        cssClasses[size]
    );

    return (
        <Tag
            ref={ref}
            className={classNames}
            role="status"
            {...props}
        />
    );
});

Spinner.displayName = displayName;

export default Spinner;