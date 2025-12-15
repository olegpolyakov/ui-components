import {
    type ChangeEvent,
    type MouseEvent,
    type ReactNode,
    useCallback,
    useRef,
    useState
} from 'react';

import { size as popoverSize } from '@floating-ui/react';

import type { ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Badge from '../Badge';
import { List } from '../List';
import { Item } from '../Item';

import cssClasses from './Combobox.module.scss';
import Popover from '../Popover';
import Button from '../Button';

export type ComboboxValue = string | string[];

export type ComboboxProps = {
    name?: string;
    value?: ComboboxValue;
    defaultValue?: ComboboxValue;
    options?: ComboboxOption[];
    label?: string;
    start?: ReactNode;
    end?: ReactNode;
    placeholder?: string;
    size?: Size;
    variant?: 'outlined' | 'underlined' | 'transparent';
    multiple?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    creatable?: boolean;
    createNewLabel?: string;
    maxMenuHeight?: number;
    onChange?: ComboboxChangeHandler;
    onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type ComboboxOption = {
    value: string;
    start?: ReactNode;
    end?: ReactNode;
    disabled?: boolean;
    active?: boolean;
    selected?: boolean;
    onClick?: (event: MouseEvent) => void;
} & ({
    content: ReactNode;
} | {
    label: string;
});

export type ComboboxChangeHandler = (
    data: {
        value: string | string[];
        name?: string;
    }
) => void;

Combobox.displayName = 'Combobox';
const elementClassNames = getElementClassNames(
    Combobox.displayName,
    ['control', 'start', 'label', 'values', 'input', 'container', 'menu', 'end']
);

export default function Combobox({
    name,
    defaultValue = '',
    value: initialValue = defaultValue,
    options = [],
    label,
    start,
    end,
    placeholder = '',
    size = 'm',
    variant = 'outlined',
    disabled,
    clearable,
    creatable,
    createNewLabel = 'Add',
    maxMenuHeight,
    onChange,
    onInputChange,

    className,
    ...props
}: ComponentProps<ComboboxProps, 'div'>) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = useCallback((
        event: MouseEvent<HTMLElement>
    ) => {
        const value = (event.target as HTMLElement).dataset.value;
        const content = (event.target as HTMLElement).textContent;

        if (!value || !content) return;

        setInputValue(content);

        onChange?.({
            name,
            value
        });
    }, [name, onChange]);

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

    const handleCreateNew = useCallback(() => {
        onChange?.({
            value: inputValue,
            name
        });
    }, [name, inputValue, onChange]);

    const value = initialValue;
    const hasValue = Array.isArray(value)
        ? value.length > 0
        : !!value;
    const hasLabel = Boolean(label);

    console.log('Combobox render', {
        value,
        hasValue,
        inputValue,
        open,
        focused
    });

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        cssClasses[variant],
        focused && cssClasses.focused,
        open && cssClasses.open,
        disabled && cssClasses.disabled,
        (hasValue || focused) && cssClasses.activated,
        hasLabel && cssClasses.hasLabel
    );

    return (
        <div className={classNames} {...props}>
            <div
                ref={containerRef}
                className={cn(elementClassNames.container, cssClasses.container)}
            >
                {start &&
                    <span className={cn(elementClassNames.start, cssClasses.start)}>
                        {start}
                    </span>
                }

                <div
                    className={cn(elementClassNames.control, cssClasses.control)}
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {label &&
                        <label className={cn(elementClassNames.label, cssClasses.label)}>
                            {label}
                        </label>
                    }

                    <div className={cn(elementClassNames.values, cssClasses.values)}>
                        {Array.isArray(value) && value.map(value =>
                            <Badge
                                key={value}
                                content={value}
                                variant="tinted"
                                size="s"
                                shape="rounded"
                            />
                        )}
                    </div>

                    <input
                        className={cn(elementClassNames.input, cssClasses.input)}
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={disabled}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />

                    {clearable && hasValue && !disabled &&
                        <Button icon="clear" size="xs" />
                    }
                </div>


                {end &&
                    <span className={cn(elementClassNames.end, cssClasses.end)}>
                        {end}
                    </span>
                }
            </div>

            <Popover
                anchorRef={containerRef}
                open={open}
                arrow={false}
                unstyled
                middleware={[
                    popoverSize({
                        apply: ({ availableHeight, elements }) => {
                            elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';
            
                            elements.floating.style.maxHeight = maxMenuHeight
                                ? Math.min(availableHeight, maxMenuHeight) + 'px'
                                : availableHeight + 'px';
                        }
                    })
                ]}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <div className={cn(elementClassNames.menu, cssClasses.menu)}>
                    <List>
                        {options
                            .filter(option => getLabel(option).includes(inputValue))
                            .map((option, index) => {
                                const optionLabel = getLabel(option);
                                const optionValue = getValue(option);
                                const selected = Array.isArray(value)
                                    ? value.find(value => getValue(value) === optionValue)
                                    : optionValue === getValue(value);

                                return (
                                    <Item
                                        key={index}
                                        as="li"
                                        color={selected ? 'brand' : undefined}
                                        variant={selected ? 'filled' : undefined}
                                        interactive
                                        data-value={optionValue}
                                        onClick={handleChange}
                                    >
                                        {optionLabel}
                                    </Item>
                                );

                            })}

                        {creatable && inputValue && options.length > 0 && !options.find(option => getLabel(option) === inputValue) &&
                            <Item
                                as="li"
                                content={`${createNewLabel} "${inputValue}"`}
                                interactive
                                onClick={handleCreateNew}
                            />
                        }
                    </List>
                </div>
            </Popover>
        </div>
    );
}

function getValue(arg: string | ComboboxOption): string {
    return typeof arg === 'object' ? arg.value : arg;
}

function getLabel(arg: string | ComboboxOption): string {
    return typeof arg === 'string'
        ? arg 
        : typeof arg === 'object'
            ? ('label' in arg
                ? arg.label 
                : 'content' in arg && typeof arg.content === 'string' 
                    ? arg.content
                    : arg.toString()
            )
            : '';
}