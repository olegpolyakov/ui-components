import {
    type MouseEvent,
    type ReactNode,
    forwardRef,
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react';

import {
    type SelectOptionDefinition,
    SelectProvider,
    useSelect
} from '@mui/base/useSelect';

import type { HTMLDivProps, PropsWithChildren, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Option, { type OptionProps } from './Option';
import cssClasses from './Select.module.scss';

export type SelectChangeHandler = (
    data: {
        value?: string;
        name?: string;
    },
    event: MouseEvent
) => void

export type SelectProps = PropsWithChildren<{
    label?: string;
    name?: string;
    value?: string;
    options?: PropsWithKey<OptionProps>[];
    placeholder?: string;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: 'filled' | 'outlined' | 'underlined';
    required?: boolean;
    disabled?: boolean;
    maxMenuHeight?: number;
    onChange?: SelectChangeHandler;
}, HTMLDivProps>;

const displayName = 'Select';
const elementClassNames = getElementClassNames(displayName, ['start', 'label', 'input', 'end', 'menu']);

const Select = forwardRef<HTMLDivElement, SelectProps>(({
    label,
    name,
    value: _value,
    options = [],
    placeholder,
    start,
    end,
    size = 'medium',
    variant = 'outlined',
    maxMenuHeight,
    onChange,

    children,
    className,
    ...props
}, ref) => {
    const listboxRef = useRef<HTMLUListElement>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            listboxRef.current?.focus();
        }
    }, [open]);

    const handleOptionClick = useCallback((event: MouseEvent) => {
        const value = (event.currentTarget as HTMLElement).dataset.value;

        onChange?.({ value, name }, event);
    }, [name, onChange]);

    const { getButtonProps, getListboxProps, contextValue, value } = useSelect({
        listboxRef,
        open,
        onOpenChange: setOpen,
        options: options as SelectOptionDefinition<string>[],
        value: _value
    });

    const selectedValue = options.find(option => option.value === value)?.label || '';
    const menuStyle = maxMenuHeight ? {
        maxHeight: `${maxMenuHeight}px`
    } : undefined;

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        cssClasses[variant],
        open && cssClasses.open,
        (open || (value !== undefined && value !== null)) && cssClasses.activated
    );

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            {label &&
                <label className={cn(elementClassNames.label, cssClasses.label)}>{label}</label>
            }

            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            <button
                className={cn(elementClassNames.input, cssClasses.input)}
                data-placeholder={placeholder}
                value={value || undefined}
                {...getButtonProps()}
            >
                {selectedValue}
            </button>

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }

            <ul
                className={cn(elementClassNames.menu, cssClasses.menu)}
                style={menuStyle}
                {...getListboxProps()}
            >
                <SelectProvider value={contextValue}>
                    {options?.map(option =>
                        <Option
                            key={option.value}
                            onClick={handleOptionClick}
                            {...option}
                        />
                    )}

                    {children}
                </SelectProvider>
            </ul>
        </div>
    );
});

Select.displayName = displayName;

export default Select;
