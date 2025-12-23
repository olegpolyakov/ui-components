import type { ComponentProps, ElementType, Orientation, PropsWithKey, SizeFull } from '../../types';
import { classnames as cn, getElementClassNames, resolveChildren } from '../../utils';

import Button, { ButtonProps } from './Button';

import styles from './ButtonGroup.module.scss';

export type ButtonGroupProps = {
    buttons?: PropsWithKey<ButtonProps>[];
    orientation?: Orientation;
    gap?: SizeFull;
    fluid?: boolean;
    joined?: boolean;
    color?: ButtonProps['color'];
    size?: ButtonProps['size'];
    shape?: ButtonProps['shape'];
    variant?: ButtonProps['variant'];
};

ButtonGroup.displayName = 'ButtonGroup';

const elementClassNames = getElementClassNames(ButtonGroup.displayName);

export default function ButtonGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    buttons = [],
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
    const Root = as || 'div';
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
        <Root
            className={classNames}
            {...props}
        >
            {resolveChildren(children, buttons).map(({ key, ...props }) =>
                <Button
                    key={key}
                    className={styles.button}
                    color={color}
                    shape={shape}
                    size={size}
                    variant={variant}
                    {...props}
                />
            )}
        </Root>
    );
}