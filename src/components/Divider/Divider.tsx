import { classnames as cn, getElementClassNames } from '../../utils';
import { Orientation, type ComponentProps, type ElementType } from '../../types';

import cssClasses from './Divider.module.scss';

export type DividerProps = {
    orientation?: Orientation;
    className?: string;
};

Divider.displayName = 'Divider';

const elementClassNames = getElementClassNames(Divider.displayName);

export default function Divider<T extends ElementType = 'hr'>({
    as,
    className,

    orientation = 'horizontal',
    ...props
}: ComponentProps<DividerProps, T>) {
    const Component = as || 'hr';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[orientation]
    );

    return (
        <Component className={classNames} {...props} />
    );
}