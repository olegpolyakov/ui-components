import { KeyboardEvent, useState, useCallback } from 'react';

import type { ComponentProps } from '../../types';
import { cn } from '../../utils';

import styles from './SliderThumb.module.scss';

export type SliderThumbProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    discrete?: boolean;
    disabled?: boolean;
    withValueLabel?: boolean;
    onStartInteraction?: () => void;
    onEndInteraction?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

SliderThumb.displayName = 'SliderThumb';

export default function SliderThumb({
    value = 0,
    min = 0,
    max = 100,
    discrete,
    disabled,
    withValueLabel,
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

    const classNames = cn(
        styles.root,
        focused && styles.focused,
        discrete && styles.discrete,
        disabled && styles.disabled
    );

    const style = {
        left: `calc(${Math.trunc((value - min) / (max - min) * 100)}% - ${styles.size})`
    };

    return (
        <div
            className={classNames}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled || undefined}
            style={style}
            data-value={Math.round(value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={onStartInteraction}
            onMouseUp={onEndInteraction}
            onTouchStart={onStartInteraction}
            onTouchEnd={onEndInteraction}
            {...props}
        >
            <div className={styles.knob} />

            {withValueLabel &&
                <span className={styles.label}>
                    {Math.round(value)}
                </span>
            }
        </div>
    );
}