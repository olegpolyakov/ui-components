import { cn } from '../../component';
import type { ComponentProps, ElementType, Shape, Size } from '../../types';

import styles from './ProgressBar.module.scss';

export type ProgressBarProps = {
    value?: number | string;
    indeterminate?: boolean;
    size?: Size;
    shape?: Extract<Shape, 'circular' | 'rectangular'>;
};

ProgressBar.displayName = 'ProgressBar';

export default function ProgressBar<T extends ElementType = 'div'>({
    as,
    className,

    value: _value,
    indeterminate,
    size,
    shape,
    ...props
}: ComponentProps<ProgressBarProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        { indeterminate, size, shape },
        styles
    );

    const value = Number(_value);
    const barStyle = {
        transform: `scaleX(${indeterminate ? 1 : (value > 1 ? (value * 0.01) : value)})`
    };

    return (
        <Root
            className={classNames}
            role="progressbar"
            {...props}
        >
            <div className={styles.bar} style={barStyle} />
        </Root>
    );
}