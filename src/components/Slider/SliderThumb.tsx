import { KeyboardEvent, useState, useCallback } from 'react';

import type { ComponentProps } from '../../types';
import { classnames as cn } from '../../utils';

import styles from './SliderThumb.module.scss';

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

const THUMB_WIDTH = 32;

SliderThumb.displayName = 'SliderThumb';

export default function SliderThumb({
    value = 0,
    min = 0,
    max = 100,
    discrete,
    disabled,
    onStartInteraction,
    onEndInteraction,
    ...props
}: ComponentProps<SliderThumbProps, 'div'>) {
    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback(() => {
        setFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setFocused(false);
    }, []);

    const classNames = cn(styles.root, {
        [styles.THUMB_FOCUSED]: focused,
        [styles.THUMB_WITH_INDICATOR]: discrete && focused
    });

    const style = {
        left: `calc(${(value - min) / (max - min) * 100}% - ${THUMB_WIDTH * 0.5}px)`
    };

    return (
        <div
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
            <div className={styles.knob} data-value={Math.round(value)} />
        </div>
    );
}