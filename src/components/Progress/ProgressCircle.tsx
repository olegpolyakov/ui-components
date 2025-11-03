import { ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import { sizeProps } from './constants';
import cssClasses from './ProgressCircle.module.scss';

export type ProgressCircleProps = {
    value?: number | string;
    size?: Size;
};

ProgressCircle.displayName = 'ProgressCircle';

const elementClassNames = getElementClassNames(
    ProgressCircle.displayName,
    ['container', 'circleGraphic', 'track', 'circle']
);

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
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size]
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
            <div className={cssClasses.container}>
                <svg
                    viewBox={`0 0 ${viewBox} ${viewBox}`}
                    fill="transparent"
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
        </Root>
    );
}