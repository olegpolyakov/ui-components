import { forwardRef } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';
import { Orientation } from '../../types';

import cssClasses from './Divider.module.scss';

export type DividerProps = {
    as?: 'hr' | 'div' | 'span';
    orientation?: Orientation;
    className?: string;
};

const displayName = 'Divider';
const elementClassNames = getElementClassNames(displayName);

const Divider = forwardRef<HTMLHRElement, DividerProps>(({
    orientation = 'horizontal',
    
    as: Tag = 'hr',
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[orientation]
    );

    return (
        <Tag ref={ref} className={classNames} {...props} />
    );
});

Divider.displayName = displayName;

export default Divider;