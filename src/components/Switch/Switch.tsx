import {
    type ChangeEvent,
    type ReactNode,
    useCallback,
    useId
} from 'react';

import type { ComponentProps, Size } from '../../types';
import { cn } from '../../utils';

import Label from '../Label';

import styles from './Switch.module.scss';

export type SwitchProps = {
    label?: ReactNode;
    size?: Size;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: SwitchChangeHandler;
};

export type SwitchChangeHandler = (
    data: {
        checked: boolean;
        name?: string;
        value?: string;
    },
    event: ChangeEvent<HTMLInputElement>
) => void;

Switch.displayName = 'Switch';

export default function Switch({
    className,

    label,
    size = 'm',
    disabled,
    onChange,
    ...props
}: ComponentProps<SwitchProps, 'input'>) {
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
        styles[size],
        styles.root
    );

    return (
        <div className={classNames}>
            <input
                id={id}
                className={styles.input}
                type="checkbox"
                role="switch"
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />

            {label &&
                <Label
                    className={styles.label}
                    htmlFor={id}
                >
                    {label}
                </Label>
            }
        </div>
    );
}