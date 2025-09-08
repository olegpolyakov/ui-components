import { KeyboardEvent, forwardRef, useState, useCallback } from 'react';

import { classnames as cn } from '../../utils';

import cssClasses from './Slider.module.scss';

export type SliderThumbProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    discrete?: boolean;
    disabled?: boolean;
    onStartInteraction?: () => void;
    onEndInteraction?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

const THUMB_WIDTH = 48;

const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(({
    value = 0,
    min = 0,
    max = 100,
    discrete,
    disabled,
    onStartInteraction,
    onEndInteraction,

    ...props
}, ref) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback(() => {
        setFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setFocused(false);
    }, []);

    const classNames = cn(cssClasses.THUMB, {
        [cssClasses.THUMB_FOCUSED]: focused,
        [cssClasses.THUMB_WITH_INDICATOR]: discrete && focused
    });

    const style = {
        left: `calc(${(value - min) / (max - min) * 100}% - ${THUMB_WIDTH * 0.5}px)`
    };

    return (
        <div
            ref={ref}
            className={classNames}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled || undefined}
            style={style}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={onStartInteraction}
            onMouseUp={onEndInteraction}
            onTouchStart={onStartInteraction}
            onTouchEnd={onEndInteraction}
            {...props}
        >
            {discrete &&
                <div className={cssClasses.VALUE_INDICATOR_CONTAINER}>
                    <div className={cssClasses.VALUE_INDICATOR}>
                        <span className={cssClasses.VALUE_INDICATOR_TEXT}>{value}</span>
                    </div>
                </div>
            }

            <div className={cssClasses.THUMB_KNOB} />
        </div>
    );
});

SliderThumb.displayName = 'SliderThumb';

export default SliderThumb;