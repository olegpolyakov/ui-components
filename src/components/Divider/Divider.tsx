import { classnames as cn, getElementClassNames } from '../../utils';
import { Orientation, type ComponentProps, type ElementType } from '../../types';

import styles from './Divider.module.scss';

export type DividerProps = {
    orientation?: Orientation;
};

Divider.displayName = 'Divider';

const elementClassNames = getElementClassNames(Divider.displayName);

export default function Divider<T extends ElementType = 'hr'>({
    as,
    className,

    orientation = 'horizontal',
    ...props
}: ComponentProps<DividerProps, T>) {
    const Root = as || 'hr';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[orientation]
    );

    return (
        <Root className={classNames} {...props} />
    );
}