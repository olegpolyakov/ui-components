import {
    type ChangeEvent,
    type FocusEvent,
    type InvalidEvent,
    type ReactNode,
    useCallback,
    useState
} from 'react';

import type { ComponentProps, Shape, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Input.module.scss';

export type InputProps = {
    label?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    shape?: Shape;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted' | 'tinted-outlined' | 'underlined' | 'underlined-tinted' | 'tinted-underlined';
    active?: boolean;
    disabled?: boolean;
    onChange?: InputChangeHandler;
};

export type InputChangeHandler = (
    data: {
        name?: string;
        value: string;
    },
    event: React.ChangeEvent<HTMLInputElement>
) => void;

Input.displayName = 'Input';

const elementClassNames = getElementClassNames(
    Input.displayName,
    ['start', 'label', 'input', 'end']
);

export default function Input({
    value,
    defaultValue,
    start,
    end,
    label,
    shape = 'rounded',
    size = 'm',
    variant = 'outlined',
    active,
    disabled,
    onChange,
    onFocus,
    onBlur,
    onInvalid,

    className,
    ...props
}: ComponentProps<InputProps, 'input'>) {
    const [isFocused, setFocused] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInvalid(!event.target.validity.valid);
        setValidationMessage('');
        onChange?.({
            name: event.target.name,
            value: event.target.value
        }, event);
    }, [onChange]);

    const handleInvalid = useCallback((event: InvalidEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInvalid(true);
        setValidationMessage(event.target.validationMessage);
        onInvalid?.(event);
    }, [onInvalid]);

    const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    }, [onFocus]);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    }, [onBlur]);

    const isActive = Boolean(active || value || defaultValue);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant],
        isActive && cssClasses.active,
        isFocused && cssClasses.focused,
        isInvalid && cssClasses.invalid,
        disabled && cssClasses.disabled,
        Boolean(start) && cssClasses.withStart,
        Boolean(end) && cssClasses.withEnd
    );

    return (
        <div
            className={classNames}
            data-validation-message={validationMessage || undefined}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {label &&
                <label className={cn(elementClassNames.label, cssClasses.label)}>
                    {label}
                </label>
            }

            <input
                className={cn(elementClassNames.input, cssClasses.input)}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                onInvalid={handleInvalid}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </div>
    );
}