import {
    type MouseEvent,
    type ReactNode,
    useState,
    useCallback,
    Children,
    isValidElement,
    type ChangeEvent,
    Fragment
} from 'react';

import type { Placement } from '@floating-ui/react';

import type { ComponentProps, PropsWithKey, Size } from '../../types';
import { cn } from '../../utils';

import Button from '../Button';
import Dropdown from '../Dropdown';
import List from '../List';
import Textbox from '../Textbox';

import Option, { OptionProps } from './Option';

import styles from './Select.module.scss';
import Icon from '../Icon';

export type SelectProps = {
    label?: string;
    name?: string;
    value?: string | string[];
    defaultValue?: string | string[];
    options?: PropsWithKey<OptionProps>[];
    placeholder?: string;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted';
    input?: boolean;
    defaultInputValue?: string;
    disabled?: boolean;
    clearable?: boolean;
    creatable?: boolean;
    createNewLabel?: string;
    noOptionsLabel?: string;
    maxDropdownHeight?: number;
    onChange?: SelectChangeHandler;
    onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type SelectChangeHandler = (
    data: {
        value?: string | string[];
        name?: string;
    },
    event: MouseEvent
) => void;

Select.displayName = 'Select';

export default function Select({
    children,
    className,

    name,
    value,
    defaultValue,
    input = false,
    defaultInputValue,
    options = [],
    label,
    placeholder,
    start,
    end,
    size = 'm',
    variant = 'outlined',
    disabled,
    clearable = true,
    creatable = false,
    createNewLabel = 'Add', // TODO i18n
    noOptionsLabel = 'No options', // TODO i18n
    maxDropdownHeight,
    onChange,
    onInputChange,
    ...props
}: ComponentProps<SelectProps, 'div'>) {
    const [intervalValue, setIntervalValue] = useState(defaultValue);
    const [inputValue, setInputValue] = useState(defaultInputValue);
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<Placement>('bottom');

    const resolvedValue = value ?? intervalValue;
    const resolvedInputValue = inputValue || defaultInputValue;
    const isControlled = value !== undefined;
    const isMultiple = Array.isArray(resolvedValue);

    const handleOptionClick = useCallback((event: MouseEvent) => {
        const optionValue = (event.currentTarget as HTMLElement).dataset.value;

        if (optionValue === undefined) return;

        const newValue = Array.isArray(resolvedValue)
            ? resolvedValue.includes(optionValue)
                ? resolvedValue.filter(v => v !== optionValue)
                : [...resolvedValue, optionValue]
            : optionValue;

        if (!isControlled) {
            setIntervalValue(newValue);
            setInputValue('');
        }

        setOpen(false);
        onChange?.({ value: newValue, name }, event);
    }, [name, resolvedValue, isControlled, setOpen, onChange]);

    const handleInputChange = useCallback((
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target as HTMLInputElement;
    
        setInputValue(value);
    
        onInputChange?.(event);
    }, [onInputChange]);

    const handleFocus = useCallback(() => {
        setFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setFocused(false);
    }, []);

    const handleClearClick = useCallback((event: MouseEvent) => {
        event.stopPropagation();

        if (!isControlled) {
            setIntervalValue(isMultiple ? [] : undefined);
            setInputValue('');
        }

        setFocused(false);
        setOpen(false);

        onChange?.({ value: undefined, name }, event);
    }, [name, isMultiple, isControlled, onChange]);

    const resolvedOptions = [
        ...options,
        ...Children.toArray(children)
            .filter(child => isValidElement<OptionProps>(child))
            .map(child => {
                const element = child as React.ReactElement<OptionProps>;
                return {
                    key: element.key,
                    ...element.props
                };
            }) as PropsWithKey<OptionProps>[]
    ];

    const selectedOptions = isMultiple
        ? resolvedOptions.filter(option => resolvedValue.includes(option.value))
        : [resolvedOptions.find(option => option.value == resolvedValue)].filter(Boolean) as PropsWithKey<OptionProps>[];
    const selectedValues = selectedOptions.map(option => option.label || option.content);

    const hasValue = isMultiple
        ? resolvedValue.length > 0
        : !!resolvedValue;
    const active = hasValue || (input && !!resolvedInputValue);
    
    const rootClassNames = cn(
        className,
        styles.root,
        styles[placement],
        open && styles.open
    );

    return (
        <Dropdown
            trigger={
                <Textbox
                    className={rootClassNames}
                    label={label}
                    start={start}
                    end={
                        <Fragment>
                            {clearable && hasValue && !disabled &&
                                <Button
                                    icon={{
                                        name: 'close',
                                        color: 'tertiary',
                                        size: 's'
                                    }}
                                    size="xs"
                                    onClick={handleClearClick}
                                />
                            }

                            <Icon
                                className={styles.arrow}
                                name="arrow_drop_down"
                                color="tertiary"
                                size="m"
                                inline
                            />

                            {end}
                        </Fragment>
                    }
                    size={size}
                    variant={variant}
                    active={active}
                    focused={focused}
                    disabled={disabled}
                    data-open={open ? true : undefined}
                    {...props}
                >
                    {selectedValues.map(value =>
                        <span
                            key={value?.toString()}
                            className={styles.value}
                        >
                            {value}
                        </span>
                    )}

                    {input ? 
                        <input
                            className={styles.input}
                            type="text"
                            placeholder={placeholder}
                            value={inputValue}
                            defaultValue={defaultInputValue}
                            disabled={disabled}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        :
                        <input
                            className={styles.input}
                            type="button"
                            value={resolvedValue || undefined}
                            data-placeholder={placeholder}
                            onClick={() => setOpen(prevOpen => !prevOpen)}
                        />
                    }
                </Textbox>
            }
            open={open}
            variant={variant as 'filled' | 'outlined'} // TODO fix types that Dropdown accepts
            maxHeight={maxDropdownHeight}
            onOpen={placement => {
                setPlacement(placement);
                setFocused(true);
                setOpen(true);
            }}
            onClose={() => {
                setFocused(false);
                setOpen(false);
            }}
        >
            <List
                className={styles.list}
                data-no-options-label={noOptionsLabel}
            >
                {resolvedOptions
                    .filter(option => input
                        ? getLabel(option).toLowerCase().includes(inputValue?.toLowerCase() || '')
                        : true
                    ).map(({ key, ...props }) => {
                        const optionLabel = getLabel(props);
                        const optionValue = getValue(props);
                        const selected = isMultiple
                            ? resolvedValue.includes(optionValue)
                            : optionValue === resolvedValue;
                            
                        return (
                            <Option
                                key={key}
                                content={optionLabel}
                                active={selected}
                                interactive
                                onClick={handleOptionClick}
                                {...props}
                            />
                        );
                    })
                }

                {creatable && inputValue && !resolvedOptions.find(option => getLabel(option) === inputValue) &&
                    <Option
                        label={`${createNewLabel} "${inputValue}"`}
                        value={inputValue}
                        interactive
                        onClick={handleOptionClick}
                    />
                }
            </List>
        </Dropdown>
    );
}

function getValue(arg: string | OptionProps): string {
    return typeof arg === 'object' ? arg.value : arg;
}

function getLabel(arg: string | OptionProps): string {
    return typeof arg === 'string'
        ? arg 
        : typeof arg === 'object'
            ? ('label' in arg && typeof arg.label === 'string'
                ? arg.label
                : 'content' in arg && typeof arg.content === 'string' 
                    ? arg.content
                    : arg.toString()
            )
            : '';
}