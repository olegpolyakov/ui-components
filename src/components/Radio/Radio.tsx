import {
    type ChangeEvent,
    type ReactNode,
    useCallback,
    useId
} from 'react';

import type { ComponentProps, ElementType, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label from '../Label';

import styles from './Radio.module.scss';

export type RadioProps = {
    label?: ReactNode;
    size?: Size;
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

const elementClassNames = getElementClassNames(
    Radio.displayName,
    ['input', 'label']
);

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
        elementClassNames.root,
        styles.root,
        styles[size],
        disabled && styles.disabled
    );

    return (
        <Root className={classNames}>
            <input
                id={id}
                className={cn(elementClassNames.input, styles.input)}
                type="radio"
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />

            {label &&
                <Label
                    className={cn(elementClassNames.label, styles.label)}
                    htmlFor={id}
                    size={size}
                >
                    {label}
                </Label>
            }
        </Root>
    );
}