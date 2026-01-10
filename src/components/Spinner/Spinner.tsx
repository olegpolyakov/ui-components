import type { Color, ComponentProps, ElementType, SizeFull } from '../../types';
import { cn } from '../../utils';

import styles from './Spinner.module.scss';

export type SpinnerProps = {
    color?: 'inherit' | Color;
    size?: SizeFull;
};

Spinner.displayName = 'Spinner';

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
        styles.root,
        color && styles[color],
        styles[size]
    );

    return (
        <Root className={classNames} role="status" {...props} />
    );
}