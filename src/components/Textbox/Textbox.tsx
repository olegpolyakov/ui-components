import { ReactNode } from 'react';

import { ccn } from '../../component';
import type { ComponentProps, Shape, Size } from '../../types';
import { cn } from '../../utils';

import styles from './Textbox.module.scss';

export type TextboxProps = {
    control?: ReactNode;
    label?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    validationMessage?: string;
    size?: Size;
    shape?: Shape;
    variant?: 'outlined' | 'tinted' | 'outlined-tinted';
    active?: boolean;
    disabled?: boolean;
    focused?: boolean;
    invalid?: boolean;
};

Textbox.displayName = 'Textbox';

export default function Textbox({
    className,
    children,

    control = children,
    label,
    start,
    end,
    size = 'm',
    shape,
    variant = 'outlined',
    validationMessage,
    active,
    focused,
    disabled,
    invalid,
    ...props
}: ComponentProps<TextboxProps, 'div'>) {
    const classNames = ccn(
        cn(className,
            styles.root,
            styles[size],
            styles[variant],
            active && styles.active,
            disabled && styles.disabled,
            focused && styles.focused,
            invalid && styles.invalid
        ),
        {
            root: false,
            shape
        },
        styles
    );

    return (
        <div
            className={classNames}
            data-validation-message={validationMessage || undefined}
            data-active={active ? true : undefined}
            data-disabled={disabled ? true : undefined}
            data-focused={focused ? true : undefined}
            {...props}
        >
            {start &&
                <span className={styles.start}>
                    {start}
                </span>
            }

            <div className={styles.content}>
                {label &&
                    <label className={styles.label}>
                        {label}
                    </label>
                }

                <div className={styles.control}>
                    {control}
                </div>
            </div>

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </div>
    );
}