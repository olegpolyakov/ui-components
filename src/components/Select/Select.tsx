import {
    type MouseEvent,
    type ReactNode,
    useEffect,
    useRef,
    useState,
    useCallback,
    Children,
    isValidElement
} from 'react';

import { flip, size as popoverSize, type Placement } from '@floating-ui/react';

import type { ComponentProps, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button from '../Button';
import List from '../List';
import Option, { type OptionProps } from './Option';
import { Popover } from '../Popover';

import styles from './Select.module.scss';

export type SelectProps = {
    name?: string;
    value?: string | string[];
    defaultValue?: string | string[];
    options?: PropsWithKey<OptionProps>[];
    multiple?: boolean;
    label?: string;
    placeholder?: string;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted' | 'tinted-outlined' | 'underlined' | 'underlined-tinted' | 'tinted-underlined';
    maxMenuHeight?: number;
    onChange?: SelectChangeHandler;
};

export type SelectChangeHandler = (
    data: {
        value?: string | string[];
        name?: string;
    },
    event: MouseEvent
) => void;

Select.displayName = 'Select';

const elementClassNames = getElementClassNames(
    Select.displayName,
    ['popover', 'control', 'start', 'label', 'value', 'input', 'end', 'menu']
);

export default function Select({
    children,
    className,

    name,
    value,
    defaultValue,
    options = [],
    label,
    placeholder,
    start,
    end,
    size = 'm',
    variant = 'outlined',
    maxMenuHeight,
    onChange,
    ...props
}: ComponentProps<SelectProps, 'div'>) {
    const listRef = useRef<HTMLUListElement>(null);

    const [intervalValue, setIntervalValue] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<Placement>('bottom');

    useEffect(() => {
        if (open) {
            listRef.current?.focus();
        }
    }, [open]);

    const resolvedValue = value ?? intervalValue;
    const isControlled = value !== undefined;
    const isMultiple = Array.isArray(resolvedValue);

    const handleOptionClick = useCallback((event: MouseEvent) => {
        const optionValue = (event.currentTarget as HTMLElement).dataset.value;

        if (optionValue === undefined) return;

        const newValue = Array.isArray(resolvedValue)
            ? [...resolvedValue, optionValue]
            : optionValue;

        if (!isControlled) {
            setIntervalValue(newValue);
        }

        setOpen(false);
        onChange?.({ value: newValue, name }, event);
    }, [name, resolvedValue, isControlled, setOpen, onChange]);

    const handleClearClick = useCallback((event: MouseEvent) => {
        event.stopPropagation();

        if (!isControlled) {
            setIntervalValue(isMultiple ? [] : undefined);
        }

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
    const activated = isMultiple
        ? resolvedValue.length > 0
        : (resolvedValue !== undefined && resolvedValue !== null);

    const commonClassNames = cn(
        styles.common,
        placement && styles[placement],
        activated && styles.activated,
        open && styles.open
    );
    
    const rootClassNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        styles[variant],
        commonClassNames
    );

    const menuClassNames = cn(
        elementClassNames.menu,
        styles.menu,
        commonClassNames
    );

    return (
        <Popover
            trigger={
                <div className={rootClassNames} {...props}>
                    {start &&
                        <span className={cn(elementClassNames.start, styles.start)}>
                            {start}
                        </span>
                    }

                    <div className={cn(elementClassNames.control, styles.control)}>
                        {label &&
                            <label className={cn(elementClassNames.label, styles.label)}>{label}</label>
                        }

                        {selectedValues.map(value =>
                            <span
                                key={value?.toString()}
                                className={cn(elementClassNames.value, styles.value)}
                            >
                                {value}
                            </span>
                        )}

                        <input
                            className={cn(elementClassNames.input, styles.input)}
                            type="button"
                            value={resolvedValue || undefined}
                            data-placeholder={placeholder}
                            onClick={() => setOpen(prevOpen => !prevOpen)}
                        />

                        {hasValue &&
                            <Button
                                icon={{
                                    name: 'close',
                                    size: 's'
                                }}
                                size="xs"
                                onClick={handleClearClick}
                            />
                        }
                    </div>

                    {end &&
                        <span className={cn(elementClassNames.end, styles.end)}>
                            {end}
                        </span>
                    }
                </div>
            }
            open={open}
            placement="bottom"
            fallbackPlacements={['top']}
            arrow={false}
            middleware={[
                flip(),
                popoverSize({
                    apply: ({ availableHeight, elements }) => {
                        elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';

                        elements.floating.style.maxHeight = maxMenuHeight
                            ? Math.min(availableHeight, maxMenuHeight) + 'px'
                            : availableHeight + 'px';
                    }
                })
            ]}
            unstyled
            onOpen={placement => {
                setPlacement(placement);
                setOpen(true);
            }}
            onClose={() => setOpen(false)}
        >
            <List
                ref={listRef}
                className={menuClassNames}
                interactive
            >
                {resolvedOptions.map(({ key, ...rest }) => 
                    <Option
                        key={key}
                        as="li"
                        selected={isMultiple
                            ? resolvedValue.includes(rest.value)
                            : rest.value === resolvedValue}
                        onClick={handleOptionClick}
                        {...rest}
                    />
                )}
            </List>
        </Popover>
    );
}