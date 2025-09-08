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

import cssClasses from './Switch.module.scss';

export type SwitchChangeHandler = (
    data: {
        name?: string;
        value?: string;
        checked: boolean;
    },
    event: ChangeEvent<HTMLInputElement>
) => void;

export type SwitchProps = Props<{
    label?: ReactNode;
    size?: Size;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: SwitchChangeHandler;
}, HTMLInputProps>;

const displayName = 'Switch';
const elementClassNames = getElementClassNames(displayName, ['input', 'label']);

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
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
        cssClasses[size],
        cssClasses.root
    );

    return (
        <div className={classNames}>
            <input
                ref={ref}
                id={id}
                className={cn(elementClassNames.input, cssClasses.input)}
                type="checkbox"
                role="switch"
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

Switch.displayName = displayName;

export default Switch;