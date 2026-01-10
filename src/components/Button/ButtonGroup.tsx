import { cn, resolveChildren } from '../../component';
import type { ComponentProps, ElementType, Orientation, PropsWithKey, Size } from '../../types';

import Button, { ButtonProps } from './Button';

import styles from './ButtonGroup.module.scss';

export type ButtonGroupProps = {
    buttons?: PropsWithKey<ButtonProps>[];
    orientation?: Orientation;
    gap?: Size;
    fluid?: boolean;
    joined?: boolean;
    color?: ButtonProps['color'];
    size?: ButtonProps['size'];
    shape?: ButtonProps['shape'];
    variant?: ButtonProps['variant'];
};

ButtonGroup.displayName = 'ButtonGroup';

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
    size = 'm',
    shape,
    variant= 'plain',
    ...props
}: ComponentProps<ButtonGroupProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        [orientation]: orientation,
        fluid,
        joined,
        gap
    }, styles);

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