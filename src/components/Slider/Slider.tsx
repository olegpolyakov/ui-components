import { KeyboardEvent, MouseEvent, TouchEvent, forwardRef, useRef, useState, useCallback } from 'react';

import { useUpdated } from '../../hooks';
import { MouseInteractionEvent, Props } from '../../types';
import { classnames as cn, getElementClassNames, getEventKey, getPageX } from '../../utils';

import Track from './SliderTrack';
import Thumb from './SliderThumb';
import { getValueForEventKey } from './helpers';

import cssClasses from './Slider.module.scss';

export type SliderProps = Props<{
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    discrete?: boolean;
    disabled?: boolean;
    marks?: boolean;
}>;

const displayName = 'Slider';
const elementClassNames = getElementClassNames(displayName);

const Slider = forwardRef<HTMLDivElement, SliderProps>(({
    name,
    value = 0,
    min = 0,
    max = 100,
    step,
    discrete,
    disabled,
    marks,
    onChange = Function.prototype,

    className,
    ...props
}, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(false);

    useUpdated(() => {
        if (disabled) return;

        if (active) {
            document.body.addEventListener('mousemove', handleMove);
            document.body.addEventListener('touchmove', handleMove);
            document.body.addEventListener('mouseup', handleUp);
            document.body.addEventListener('touchend', handleUp);
        } else {
            document.body.removeEventListener('mousemove', handleMove);
            document.body.removeEventListener('touchmove', handleMove);
            document.body.removeEventListener('mouseup', handleUp);
            document.body.removeEventListener('touchend', handleUp);
        }

        return () => {
            document.body.removeEventListener('mousemove', handleMove);
            document.body.removeEventListener('touchmove', handleMove);
            document.body.removeEventListener('mouseup', handleUp);
            document.body.removeEventListener('touchend', handleUp);
        };
    }, [active]);

    const updateValue = useCallback((newValue: number) => {
        if (newValue < min) {
            newValue = Number(min);
        } else if (newValue > max) {
            newValue = Number(max);
        }

        if (step) {
            newValue = Math.round(newValue / step) * step;
        }

        onChange(newValue);
    }, [min, max, step, onChange]);

    const handleMove = useCallback((
        event: MouseInteractionEvent
    ) => {
        const trackClientRect = trackRef.current?.getBoundingClientRect();

        if (!trackClientRect) return;

        const pageX = getPageX(event);
        const offsetX = pageX - trackClientRect.left;
        const percent = offsetX / trackClientRect.width;
        const value = Number(min) + percent * (max - min);

        updateValue(value);
    }, [min, max, updateValue]);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        const value = Number(inputRef.current?.value);
        const eventKey = getEventKey(event);
        const newValue = getValueForEventKey(eventKey, value, min, max, step);

        if (isNaN(newValue)) return;

        updateValue(newValue);
    }, [min, max, step, updateValue]);

    const handleRootInteraction = useCallback((
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
    ) => {
        handleMove(event);
    }, [handleMove]);

    const handleUp = useCallback(() => {
        setActive(false);
    }, []);

    const handleThumbStartInteraction = useCallback(() => {
        setActive(true);
    }, []);

    const handleThumbEndInteraction = useCallback(() => {
        setActive(false);
    }, []);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <div
            ref={ref}
            className={classNames}
            onMouseDown={handleRootInteraction}
            onTouchStart={handleRootInteraction}
            {...props}
        >
            <input
                ref={inputRef}
                className={cssClasses.input}
                type="range"
                value={Math.round(value)}
                {...props}
            />

            <Track
                ref={trackRef}
                value={value}
                min={min}
                max={max}
                step={step}
                discrete={discrete}
                marks={marks}
            />

            <Thumb
                value={value}
                min={min}
                max={max}
                discrete={discrete}
                onStartInteraction={handleThumbStartInteraction}
                onEndInteraction={handleThumbEndInteraction}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
});

Slider.displayName = displayName;

export default Slider;