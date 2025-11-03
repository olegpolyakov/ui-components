import {
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    useRef,
    useState,
    useCallback
} from 'react';

import { useUpdated } from '../../hooks/lifecycle';
import type { MouseInteractionEvent,  ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames, getEventKey, getPageX } from '../../utils';

import Track from './SliderTrack';
import Thumb from './SliderThumb';
import { getValueForEventKey } from './helpers';

import cssClasses from './Slider.module.scss';

export type SliderProps = {
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    discrete?: boolean;
    disabled?: boolean;
    marks?: boolean;
};

Slider.displayName = 'Slider';

const elementClassNames = getElementClassNames(Slider.displayName);

export default function Slider<T extends ElementType = 'div'>({
    as,
    className,

    value = 0,
    min = 0,
    max = 100,
    step,
    discrete,
    disabled,
    marks,
    onChange,
    ...props
}: ComponentProps<SliderProps, T>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(false);

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

    const handleUp = useCallback(() => {
        setActive(false);
    }, []);

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
    }, [active, handleKeyDown, handleUp]);

    const handleRootInteraction = useCallback((
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
    ) => {
        handleMove(event);
    }, [handleMove]);

    const handleThumbStartInteraction = useCallback(() => {
        setActive(true);
    }, []);

    const handleThumbEndInteraction = useCallback(() => {
        setActive(false);
    }, []);

    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <Root
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
                disabled={disabled}
                onStartInteraction={handleThumbStartInteraction}
                onEndInteraction={handleThumbEndInteraction}
                onKeyDown={handleKeyDown}
            />
        </Root>
    );
}