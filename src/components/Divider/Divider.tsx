import { cn } from '../../component';
import type { Orientation, PaletteColor, ComponentProps, ElementType } from '../../types';

import styles from './Divider.module.scss';

export type DividerProps = {
    color?: PaletteColor;
    orientation?: Orientation;
};

Divider.displayName = 'Divider';

export default function Divider<T extends ElementType = 'hr'>({
    as,
    className,

    color,
    orientation = 'horizontal',
    ...props
}: ComponentProps<DividerProps, T>) {
    const Root = as || 'hr';
    const classNames = cn(
        className,
        {
            color,
            [orientation]: orientation
        },
        styles
    );

    return (
        <Root className={classNames} {...props} />
    );
}