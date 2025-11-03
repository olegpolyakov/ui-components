import type { Color, ComponentProps, ElementType, SizeExtended } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Spinner.module.scss';

export type SpinnerProps = {
    as?: 'div';
    color?: Color;
    size?: SizeExtended;
};

Spinner.displayName = 'Spinner';

const elementClassNames = getElementClassNames(Spinner.displayName);

export default function Spinner<T extends ElementType = 'div'>({
    as,
    className,

    color,
    size = 'm',
    ...props
}: ComponentProps<SpinnerProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        color && styles[color],
        styles[size]
    );

    return (
        <Root className={classNames} role="status" {...props} />
    );
}