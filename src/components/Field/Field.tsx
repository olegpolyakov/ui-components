import { type ReactNode, cloneElement, isValidElement } from 'react';

import { cn } from '../../component';
import type { PaletteColor, ComponentProps, Orientation, Size, TextColor } from '../../types';

import Label from '../Label';
import Slot from '../Slot';

import styles from './Field.module.scss';

Field.displayName = 'Field';

export type FieldProps = {
    label?: ReactNode;
    content?: ReactNode;
    color?: PaletteColor | TextColor | 'inherit';
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
        {
            size,
            [orientation]: orientation,
            required
        },
        styles
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

            {isValidElement<{size: Size}>(content) 
                ? cloneElement<{size: Size}>(content, {
                    size: content.props.size ?? size
                })
                : content
            }
        </Root>
    );
}