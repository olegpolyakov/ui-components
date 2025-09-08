import {
    type ChangeEvent,
    type ReactNode,
    forwardRef,
    useCallback,
    useRef,
    useState,
    FormEvent
} from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import type { HTMLTextareaProps, Props, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Textarea.module.scss';

export type TextareaChangeHandler = (
    data: {
        name?: string;
        value?: string;
    },
    event: ChangeEvent<HTMLTextAreaElement>
) => void;

export type TextareaProps = Props<{
    label?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: 'filled' | 'outlined' | 'underlined';
    onChange?: TextareaChangeHandler;
}, HTMLTextareaProps>;

const displayName = 'Textarea';
const elementClassNames = getElementClassNames(displayName, ['start', 'label', 'container', 'hidden', 'textarea', 'end']);

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    value,
    defaultValue,
    label,
    start,
    end,
    size = 'medium',
    variant = 'outlined',
    onChange,
    onInvalid,

    className,
    ...props
}, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [validationMessage, setValidationMessage] = useState('');
    const [isInvalid, setInvalid] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue);

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
        cssClasses.root,
        cssClasses[size],
        cssClasses[variant],
        isFocused && cssClasses.focused,
        isInvalid && cssClasses.invalid
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

            <div
                ref={containerRef}
                className={cn(elementClassNames.container, cssClasses.container)}
            >
                {label &&
                    <label className={cn(elementClassNames.label, cssClasses.label)}>{label}</label>
                }
            
                <TextareaAutosize
                    ref={ref}
                    className={cn(elementClassNames.textarea, cssClasses.textarea)}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onInvalid={handleInvalid}
                    {...props}
                />
            </div>

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </div>
    );
});

Textarea.displayName = displayName;

export default Textarea;