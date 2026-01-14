import {
    type ChangeEvent,
    type ReactNode,
    useCallback,
    useId
} from 'react';

import { cn } from '../../component';
import type { ComponentProps, ElementType, Size } from '../../types';

import Label from '../Label';

import styles from './Radio.module.scss';

export type RadioProps = {
    label?: ReactNode;
    size?: Size;
    disabled?: boolean;
    onChange?: RadioChangeHandler;
};

export type RadioChangeHandler = (
    data: {
        checked: boolean;
        name?: string;
        value?: string;
    },
    event: ChangeEvent<HTMLInputElement>
) => void;

Radio.displayName = 'Radio';

export default function Radio<T extends ElementType = 'input'>({
    as,
    className,

    label,
    size = 'm',
    disabled,
    onChange,
    ...props
}: ComponentProps<RadioProps, T>) {
    const id = useId();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            name: event.target.name,
            value: event.target.value,
            checked: event.target.checked
        }, event);
    }, [onChange]);

    const Root = as || 'div';
    const classNames = cn(
        className,
        { size, disabled },
        styles
    );

    return (
        <Root className={classNames}>
            <input
                id={id}
                className={styles.input}
                type="radio"
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />

            {label &&
                <Label
                    className={styles.label}
                    htmlFor={id}
                    size={size}
                >
                    {label}
                </Label>
            }
        </Root>
    );
}