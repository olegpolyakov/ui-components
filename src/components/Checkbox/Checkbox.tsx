import {
    type ChangeEvent,
    type ReactNode,
    useCallback,
    useId
} from 'react';

import type { ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label from '../Label';

import cssClasses from './Checkbox.module.scss';

export type CheckboxProps = {
    inputRef?: React.Ref<HTMLInputElement>;
    label?: ReactNode;
    size?: Size;
    checked?: boolean;
    disabled?: boolean;
    onChange?: CheckboxChangeHandler;
};

export type CheckboxChangeHandler = (
    data: {
        name?: string;
        value?: string;
        checked: boolean;
    },
    event: ChangeEvent<HTMLInputElement>
) => void

Checkbox.displayName = 'Checkbox';

const elementClassNames = getElementClassNames(
    Checkbox.displayName,
    ['input', 'label']
);

export default function Checkbox({
    className,

    label,
    size = 'm',
    checked,
    disabled,
    onChange,
    ...props
}: ComponentProps<CheckboxProps, 'input'>) {
    const id = useId();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            name: event.target.name,
            value: event.target.value,
            checked: event.target.checked
        }, event);
    }, [onChange]);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        disabled && cssClasses.disabled
    );

    return (
        <div
            className={classNames}
            data-checked={checked ? true : undefined}
            data-disabled={disabled ? true : undefined}
        >
            <input
                id={id}
                className={cn(elementClassNames.input, cssClasses.input)}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />

            {label &&
                <Label
                    className={cn(elementClassNames.label, cssClasses.label)}
                    htmlFor={id}
                    size={size}
                >
                    {label}
                </Label>
            }
        </div>
    );
}