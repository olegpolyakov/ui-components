import { type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';

import type { ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label, { LabelProps } from '../Label';

import styles from './Field.module.scss';

Field.displayName = 'Field';

const elementClassNames = getElementClassNames(Field.displayName);

export type FieldProps = {
    label?: ReactNode;
    content?: ReactNode;
    size?: Size;
    inline?: boolean;
    required?: boolean;
    labelProps?: LabelProps;
};

export default function Field({
    as,
    className,
    children,

    content = children,
    label,
    size = 'm',
    inline,
    required,
    labelProps,
    ...props
}: ComponentProps<FieldProps, 'div'>) {
    const isRequired = isValidElement<FieldProps>(label)
        ? !!label.props?.required
        : !!required;

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        inline && styles.inline,
        isRequired && styles.required
    );

    return (
        <Component className={classNames} {...props}>
            {label && (isValidElement<LabelProps>(label) ? label :
                <Label
                    className={styles.label}
                    content={label}
                    size={size}
                    {...labelProps}
                />
            )}

            {isValidElement(content) 
                ? cloneElement(content as ReactElement<{size: Size}>, { size })
                : content
            }
        </Component>
    );
}