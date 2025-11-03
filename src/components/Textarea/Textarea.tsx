import {
    type ChangeEvent,
    type ReactNode,
    useCallback,
    useRef,
    useState,
    FormEvent
} from 'react';

import type { ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Textarea.module.scss';

export type TextareaProps = {
    label?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: 'filled' | 'outlined' | 'underlined';
    onChange?: TextareaChangeHandler;
};

export type TextareaChangeHandler = (
    data: {
        name?: string;
        value?: string;
    },
    event: ChangeEvent<HTMLTextAreaElement>
) => void;

Textarea.displayName = 'Textarea';

const elementClassNames = getElementClassNames(
    Textarea.displayName,
    ['start', 'label', 'container', 'hidden', 'textarea', 'end']
);

export default function Textarea({
    value,
    defaultValue,
    label,
    start,
    end,
    size = 'm',
    variant = 'outlined',
    onChange,
    onInvalid,

    className,
    ...props
}: ComponentProps<TextareaProps, 'textarea'>) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [internalValue, setInternalValue] = useState(value || defaultValue);
    const [validationMessage, setValidationMessage] = useState('');
    const [isInvalid, setInvalid] = useState(false);

    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setInvalid(false);
        setValidationMessage('');
        setInternalValue(event.target.value);
        onChange?.({
            name: event.target.name,
            value: event.target.value
        }, event);
    }, [onChange]);

    const handleInvalid = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setInvalid(true);
        setValidationMessage((event.target as HTMLTextAreaElement).validationMessage);
        onInvalid?.(event);
    }, [onInvalid]);

    const isFocused = Boolean(internalValue);

    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        styles[variant],
        isFocused && styles.focused,
        isInvalid && styles.invalid
    );

    return (
        <div
            className={classNames}
            data-validation-message={validationMessage || undefined}
        >
            {start &&
                <span className={cn(elementClassNames.start, styles.start)}>
                    {start}
                </span>
            }

            <div
                ref={containerRef}
                className={cn(elementClassNames.container, styles.container)}
            >
                {label &&
                    <label className={cn(elementClassNames.label, styles.label)}>{label}</label>
                }
            
                <textarea
                    className={cn(elementClassNames.textarea, styles.textarea)}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onInvalid={handleInvalid}
                    {...props}
                />
            </div>

            {end &&
                <span className={cn(elementClassNames.end, styles.end)}>
                    {end}
                </span>
            }
        </div>
    );
}