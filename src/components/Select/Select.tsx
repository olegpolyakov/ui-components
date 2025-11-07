import {
    type MouseEvent,
    type ReactNode,
    useEffect,
    useRef,
    useState,
    useCallback
} from 'react';

import { flip, size as popoverSize, type Placement } from '@floating-ui/react';

import type { ComponentProps, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import { Popover } from '../Popover';

import Option, { type OptionProps } from './Option';

import styles from './Select.module.scss';

export type SelectProps = {
    options?: PropsWithKey<OptionProps>[];
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

export default function Select({
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
}: ComponentProps<SelectProps, 'select'>) {
    const controlRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<Placement>('bottom');

    useEffect(() => {
        if (open) {
            listboxRef.current?.focus();
        }
    }, [open]);

    const handleOptionClick = useCallback((event: MouseEvent) => {
        const value = (event.currentTarget as HTMLElement).dataset.value;

        setOpen(false);
        onChange?.({ value, name }, event);
    }, [name, onChange]);

    const selectedValue = options.find(option => option.value === value)?.label || '';
    const activated = open || (value !== undefined && value !== null);
    
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        styles[variant],
        activated && styles.activated,
        open && styles.open,
        placement && styles[placement]
    );

    return (
        <div className={classNames} {...props}>
            <div
                ref={controlRef}
                className={cn(elementClassNames.control, styles.control)}
            >
                {label &&
                    <label className={cn(elementClassNames.label, styles.label)}>{label}</label>
                }

                {start &&
                    <span className={cn(elementClassNames.start, styles.start)}>
                        {start}
                    </span>
                }

                <button
                    className={cn(elementClassNames.input, styles.input)}
                    type="button"
                    value={value || undefined}
                    data-placeholder={placeholder}
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {selectedValue}
                </button>

                {end &&
                    <span className={cn(elementClassNames.end, styles.end)}>
                        {end}
                    </span>
                }
            </div>

            <Popover
                className={classNames}
                anchorRef={controlRef}
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
                <ul
                    className={cn(elementClassNames.menu, styles.menu)}
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
