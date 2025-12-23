import { type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';

import type { ComponentProps, Orientation, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label from '../Label';
import Slot from '../Slot';

import styles from './Field.module.scss';

Field.displayName = 'Field';

const elementClassNames = getElementClassNames(Field.displayName);

export type FieldProps = {
    label?: ReactNode;
    content?: ReactNode;
    size?: Size;
    orientation?: Orientation;
    required?: boolean;
};

export default function Field({
    as,
    className,
    children,

    content = children,
    label,
    size = 'm',
    orientation = 'vertical',
    required,
    ...props
}: ComponentProps<FieldProps, 'div'>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size],
        styles[orientation],
        required && styles.required
    );

    return (
        <Root className={classNames} {...props}>
            {label &&
                <Slot
                    fallback={Label}
                    className={styles.label}
                    size={size}
                >
                    {label}
                </Slot>
            }

            {isValidElement(content) 
                ? cloneElement(content as ReactElement<{size: Size}>, { size })
                : content
            }
        </Root>
    );
}