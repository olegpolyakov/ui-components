import { forwardRef } from 'react';

import { Props } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './ProgressBar.module.scss';

export type ProgressBarProps = Props<{
    as?: 'div';
    value?: number | string;
    bufferValue?: number | string;
    indeterminate?: boolean;
}>;

const displayName = 'ProgressBar';
const elementClassNames = getElementClassNames(displayName, ['list']);

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({
    value: _value,
    bufferValue: _bufferValue,
    indeterminate,

    as: Tag = 'div',
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        indeterminate && cssClasses.indeterminate
    );

    // const classNames = classnames(cssClasses.ROOT, {
    //     [cssClasses.INDETERMINATE]: indeterminate,
    //     [cssClasses.ANIMATION_READY]: indeterminate,
    //     [cssClasses.CLOSED]: closed
    // }, className);

    const value = Number(_value);
    const buffer = Number(_bufferValue);

    const primaryBarStyle = {
        transform: `scaleX(${indeterminate ? 1 : (value > 1 ? (value * 0.01) : value)})`
    };

    return (
        <Tag
            ref={ref}
            className={classNames}
            role="progressbar"
            // @ts-ignore
            style={{ '--ui-ProgressBar-percent': value }}
            {...props}
        />
    );
});

ProgressBar.displayName = displayName;

export default ProgressBar;