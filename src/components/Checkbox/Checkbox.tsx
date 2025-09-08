import {
    type ChangeEvent,
    type ReactNode,
    forwardRef,
    useCallback,
    useId
} from 'react';

import type { HTMLInputProps, Props, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label from '../Label';

import cssClasses from './Checkbox.module.scss';

export type CheckboxChangeHandler = (
    data: {
        name?: string;
        value?: string;
        checked: boolean;
    },
    event: ChangeEvent<HTMLInputElement>
) => void

export type CheckboxProps = Props<{
    label?: ReactNode;
    size?: Size;
    onChange?: CheckboxChangeHandler;
}, HTMLInputProps>;

const displayName = 'Checkbox';
const elementClassNames = getElementClassNames(displayName, ['input', 'label']);

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    size = 'medium',
    disabled,
    onChange,

    className,
    ...props
}, ref) => {
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
        <div className={classNames}>
            <input
                ref={ref}
                id={id}
                className={cn(elementClassNames.input, cssClasses.input)}
                type="checkbox"
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />

            {label &&
                <Label
                    className={cn(elementClassNames.label, cssClasses.label)}
                    htmlFor={id}
                >
                    {label}
                </Label>
            }
        </div>
    );
});

Checkbox.displayName = displayName;

export default Checkbox;
