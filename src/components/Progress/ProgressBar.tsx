import type { ComponentProps, ElementType } from '../../types';
import { cn } from '../../utils';

import styles from './ProgressBar.module.scss';

export type ProgressBarProps = {
    value?: number | string;
    bufferValue?: number | string;
    indeterminate?: boolean;
};

ProgressBar.displayName = 'ProgressBar';

export default function ProgressBar<T extends ElementType = 'div'>({
    as,
    className,

    value: _value,
    bufferValue: _bufferValue,
    indeterminate,
    ...props
}: ComponentProps<ProgressBarProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        styles.root,
        indeterminate && styles.indeterminate
    );

    const value = Number(_value);
    const buffer = Number(_bufferValue);

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