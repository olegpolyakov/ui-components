import { type ReactNode, useCallback, forwardRef } from 'react';

import {
    AutocompleteGroupedOption,
    UseAutocompleteProps,
    createFilterOptions,
    useAutocomplete
} from '@mui/base/useAutocomplete';

import type { Props } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Badge from '../Badge';
import { List, ListItem } from '../List';

import cssClasses from './Combobox.module.scss';

export { createFilterOptions };

export type ComboboxOption = {
    value: string | number | null;
    label: string;
    description?: string;
    selected?: boolean;
};

export type ComboboxChangeHandler = (
    data: {
        value?: string | string[];
        name?: string;
    }
) => void;

export type ComboboxProps = Props<{
    name?: string;
    value?: string | ComboboxOption;
    defaultValue?: string | ComboboxOption;
    options?: string[] | ComboboxOption[];
    label?: string;
    start?: ReactNode;
    end?: ReactNode;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'underlined' | 'transparent';
    multiple?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    creatable?: boolean;
    createNewLabel?: string;
    onChange?: ComboboxChangeHandler;
}>;

const displayName = 'Combobox';
const elementClassNames = getElementClassNames(displayName, ['start', 'label', 'values', 'input', 'container', 'menu', 'end']);

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(({
    id,
    name,
    value: initialValue,
    defaultValue,
    options = [],
    label,
    start,
    end,
    placeholder = '',
    size = 'medium',
    variant = 'outlined',
    multiple,
    disabled,
    clearable,
    creatable,
    createNewLabel = 'Добавить',
    onChange,

    className,
    ...props
}, ref) => {
    const handleChange = useCallback((
        event: React.SyntheticEvent<Element, Event>,
        newValue: NonNullable<string | ComboboxOption> | (string | ComboboxOption)[] | null
    ) => {
        const value = Array.isArray(newValue) ?
            (newValue.map(option => getValue<string>(option)).map(value => value?.toString() || '')) :
            (getValue(newValue)?.toString() || '');

        onChange?.({
            value,
            name
        });
    }, [name, onChange]);

    const {
        value,
        inputValue,
        popupOpen,
        focused,
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions
    } = useAutocomplete({
        id,
        value: initialValue,
        defaultValue,
        options,
        multiple,
        disableClearable: !clearable,
        getOptionLabel: option => typeof option === 'object' ? (option as ComboboxOption).label : option,
        onChange: handleChange,
        unstable_classNamePrefix: 'ui'
    });

    const handleCreateNew = useCallback(() => {
        onChange?.({
            value: inputValue,
            name
        });
    }, [name, inputValue, onChange]);

    const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
    const hasLabel = Boolean(label);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        cssClasses[variant],
        focused && cssClasses.focused,
        popupOpen && cssClasses.open,
        hasValue && cssClasses.activated,
        hasLabel && cssClasses.hasLabel,
        disabled && cssClasses.disabled
    );

    console.log('VALUE', value);

    return (
        <div
            ref={ref}
            className={classNames}
            {...getRootProps()}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            <div className={cn(elementClassNames.container, cssClasses.container)}>
                {label &&
                    <label
                        className={cn(elementClassNames.label, cssClasses.label)}
                        {...getInputLabelProps()}
                    >
                        {label}
                    </label>
                }

                <div className={cn(elementClassNames.values, cssClasses.values)}>
                    {Array.isArray(value) && value.length > 0 &&
                        value.map(value =>
                            <Badge
                                key={typeof value === 'object' ? value.value : value}
                                content={typeof value === 'object' ? value.label : value}
                                variant="tinted"
                                size="small"
                                shape="rounded"
                            />
                        )
                    }

                    <input
                        className={cn(elementClassNames.input, cssClasses.input)}
                        {...getInputProps()}
                    />
                </div>
            </div>

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }

            <div className={cn(elementClassNames.menu, cssClasses.menu)}>
                <List {...getListboxProps()}>
                    {groupedOptions.map((option, index) => {
                        const optionLabel = getOptionLabel(option);
                        const optionValue = getValue(option);
                        const selected = Array.isArray(value) ?
                            value.find(value => getValue(value) === optionValue) :
                            optionValue === getValue(value);

                        return (
                            <ListItem
                                key={index}
                                // @ts-ignore
                                {...getOptionProps({ option, index })}
                                color={selected ? 'primary' : undefined}
                                variant={selected ? 'filled' : undefined}
                                interactive
                            >
                                {optionLabel}
                            </ListItem>
                        );

                    })}

                    {creatable && groupedOptions.length === 0 &&
                        <ListItem
                            content={createNewLabel}
                            interactive
                            onClick={handleCreateNew}
                        />
                    }
                </List>
            </div>
        </div>
    );
});

Combobox.displayName = displayName;

export default Combobox;

function getValue<T>(arg: string | ComboboxOption | AutocompleteGroupedOption<string | ComboboxOption> | null): T {
    // @ts-ignore
    return typeof arg === 'object' ? arg.value : arg;
}

function getOptionLabel(arg: string | ComboboxOption | AutocompleteGroupedOption<string | ComboboxOption> | null) {
    // @ts-ignore
    return typeof arg === 'object' ? arg.label : arg;
}

// function getValue(
//     options: OptionsOrGroups<ComboboxOption, GroupBase<ComboboxOption>> = [],
//     value: string | string[] | null | undefined
// ): ComboboxOption | ComboboxOption[] | undefined {
//     const allOptions = options?.flatMap(optionOrGroup => isGroup(optionOrGroup) ? optionOrGroup.options : optionOrGroup);

//     if (Array.isArray(value)) {
//         return allOptions.filter(option => value.includes(option.value as string));
//     } else {
//         return allOptions.find(option => option.value === value);
//     }
// }

// function isGroup(optionOrGroup: ComboboxOption | GroupBase<ComboboxOption>): optionOrGroup is GroupBase<ComboboxOption> {
//     return !!(optionOrGroup as GroupBase<ComboboxOption>).options;
// }