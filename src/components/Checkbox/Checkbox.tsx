import {
    type ChangeEvent,
    useCallback,
    useId
} from 'react';

import { cn } from '../../component';
import type { ComponentProps, Size } from '../../types';

import Label, { LabelProps } from '../Label';
import Slot, { Slotted } from '../Slot';

import styles from './Checkbox.module.scss';

export type CheckboxProps = {
    inputRef?: React.Ref<HTMLInputElement>;
    label?: Slotted<LabelProps>;
    checkedIcon?: string;
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

export default function Checkbox({
    className,

    label,
    checkedIcon = 'check',
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
        { size, disabled },
        styles
    );

    return (
        <div
            className={classNames}
            data-checked={checked ? true : undefined}
            data-disabled={disabled ? true : undefined}
        >
            <input
                id={id}
                className={styles.input}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                data-icon={checkedIcon}
                onChange={handleChange}
                {...props}
            />

            {label &&
                <Slot
                    fallback={Label}
                    className={styles.label}
                    htmlFor={id}
                    size={size}
                >
                    {label}
                </Slot>
            }
        </div>
    );
}