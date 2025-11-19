import { Children, cloneElement, isValidElement } from 'react';
import type { ComponentProps, ElementType, Orientation, PropsWithKey, SizeFull } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button from './Button';

import styles from './ButtonGroup.module.scss';

type ButtonProps = Parameters<typeof Button>[0];

export type ButtonGroupProps = {
    buttons?: PropsWithKey<ButtonProps>[];
    orientation?: Orientation;
    gap?: SizeFull;
    fluid?: boolean;
    joined?: boolean;
    color?: ButtonProps['color'];
    shape?: ButtonProps['shape'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
};

ButtonGroup.displayName = 'ButtonGroup';

const elementClassNames = getElementClassNames(ButtonGroup.displayName);

export default function ButtonGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    buttons,
    orientation = 'horizontal',
    gap,
    fluid,
    joined,
    color,
    shape,
    size = 'm',
    variant= 'plain',
    ...props
}: ComponentProps<ButtonGroupProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        gap && styles[`gap-${gap}`],
        size && styles[size],
        variant && styles[variant],
        orientation && styles[orientation],
        fluid && styles.fluid,
        joined && styles.joined
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {buttons?.map(({ key, ...props }) =>
                <Button
                    key={key}
                    color={color}
                    shape={shape}
                    size={size}
                    variant={variant}
                    {...props}
                />
            )}

            {Children.map(children, child =>
                isValidElement<ButtonProps>(child) &&
                cloneElement<ButtonProps>(child, {
                    className: cn(child.props.className, styles.button),
                    color,
                    shape,
                    size,
                    variant
                })
            )}
        </Component>
    );
}