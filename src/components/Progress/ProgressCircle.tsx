import { forwardRef } from 'react';

import { Props, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import { sizeProps } from './constants';
import cssClasses from './ProgressCircle.module.scss';

export type ProgressCircleProps = Props<{
    value?: number | string;
    size?: Size;
}>;

const displayName = 'ProgressCircle';
const elementClassNames = getElementClassNames(displayName, ['container', 'circleGraphic', 'track', 'circle']);

const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(({
    value: _value = 0,
    size = 'medium',

    className,
    ...props
}, ref) => {
    const value = Number(_value);
    const { viewBox, radius, strokeDasharray, strokeWidth } = sizeProps[size];
    const progress = value > 1 ? (value / 100) : Number(value);
    const cx = viewBox / 2, cy = viewBox / 2;
    const strokeDashoffset = (2 * Math.PI * radius) * (1 - progress);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size]
    );

    return (
        <div
            ref={ref}
            className={classNames}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={progress}
            {...props}
        >
            <div className={cssClasses.container}>
                <svg
                    className={cssClasses.circleGraphic}
                    viewBox={`0 0 ${viewBox} ${viewBox}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className={cssClasses.track}
                        cx={cx}
                        cy={cy}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />

                    <circle
                        className={cssClasses.circle}
                        cx={cx}
                        cy={cy}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
            </div>
        </div>
    );
});

ProgressCircle.displayName = displayName;

export default ProgressCircle;