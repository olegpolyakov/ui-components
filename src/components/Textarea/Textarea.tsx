import {
    type ChangeEvent,
    type ReactNode,
    useCallback,
    useRef,
    useState,
    FormEvent
} from 'react';

import type { ComponentProps, Size } from '../../types';
import { cn } from '../../utils';

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
                <span className={styles.start}>
                    {start}
                </span>
            }

            <div
                ref={containerRef}
                className={styles.container}
            >
                {label &&
                    <label className={styles.label}>{label}</label>
                }
            
                <textarea
                    className={styles.textarea}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onInvalid={handleInvalid}
                    {...props}
                />
            </div>

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </div>
    );
}