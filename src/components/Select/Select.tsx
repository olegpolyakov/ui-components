import {
    type MouseEvent,
    type ReactNode,
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react';

import { size as popoverSize } from '@floating-ui/react';

import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Option, { type OptionProps } from './Option';
import cssClasses from './Select.module.scss';
import { Popover } from '../Popover';

export type SelectProps = {
    options?: PropsWithKey<OptionProps>[];
    label?: string;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted' | 'tinted-outlined' | 'underlined' | 'underlined-tinted' | 'tinted-underlined';
    maxMenuHeight?: number;
    onChange?: SelectChangeHandler;
};

export type SelectChangeHandler = (
    data: {
        value?: string;
        name?: string;
    },
    event: MouseEvent
) => void;

Select.displayName = 'Select';

const elementClassNames = getElementClassNames(
    Select.displayName,
    ['control', 'start', 'label', 'input', 'end', 'menu']
);

export default function Select<T extends ElementType = 'div'>({
    children,
    className,

    name,
    value,
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
}: ComponentProps<SelectProps, T>) {
    const controlRef = useRef<HTMLDivElement>(null);
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

    const selectedValue = options.find(option => option.value === value)?.label || '';
    
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
        <div className={classNames} {...props}>
            <div
                ref={controlRef}
                className={cn(elementClassNames.control, cssClasses.control)}
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
                    type="button"
                    value={value || undefined}
                    data-placeholder={placeholder}
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {selectedValue}
                </button>

                {end &&
                    <span className={cn(elementClassNames.end, cssClasses.end)}>
                        {end}
                    </span>
                }
            </div>

            <Popover
                anchorRef={controlRef}
                open={open}
                arrow={false}
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
                <ul
                    className={cn(elementClassNames.menu, cssClasses.menu)}
                >
                    {options?.map(option =>
                        <Option
                            key={option.value}
                            onClick={handleOptionClick}
                            {...option}
                        />
                    )}

                    {children}
                </ul>
            </Popover>
        </div>
    );
}
