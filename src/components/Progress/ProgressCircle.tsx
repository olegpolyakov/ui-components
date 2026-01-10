import { ComponentProps, Size } from '../../types';
import { cn } from '../../utils';

import { sizeProps } from './constants';
import styles from './ProgressCircle.module.scss';

export type ProgressCircleProps = {
    value?: number | string;
    size?: Size;
};

ProgressCircle.displayName = 'ProgressCircle';

export default function ProgressCircle({
    as,
    className,

    value: _value = 0,
    size = 'm',
    ...props
}: ComponentProps<ProgressCircleProps, 'div'>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        styles.root,
        styles[size]
    );

    const value = Number(_value);
    const { viewBox, radius, strokeDasharray, strokeWidth } = sizeProps[size];
    const progress = value > 1 ? (value / 100) : Number(value);
    const cx = viewBox / 2;
    const cy = viewBox / 2;
    const strokeDashoffset = (2 * Math.PI * radius) * (1 - progress);

    return (
        <Root
            className={classNames}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={progress}
            {...props}
        >
            <div className={styles.container}>
                <svg
                    viewBox={`0 0 ${viewBox} ${viewBox}`}
                    fill="transparent"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className={styles.track}
                        cx={cx}
                        cy={cy}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />

                    <circle
                        className={styles.circle}
                        cx={cx}
                        cy={cy}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
            </div>
        </Root>
    );
}