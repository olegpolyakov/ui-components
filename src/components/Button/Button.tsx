import type { ReactNode } from 'react';

import { cn } from '../../component';
import type { PaletteColor, ComponentProps, ElementType, Shadow, Shape, SizeExtended, SizeFull, Variant } from '../../types';

import Icon, { IconProps } from '../Icon';
import Slot, { Slotted } from '../Slot';
import Spinner, { SpinnerProps } from '../Spinner';

import styles from './Button.module.scss';

export type ButtonProps = {
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    start?: ReactNode;
    startIcon?: Slotted<IconProps>;
    end?: ReactNode;
    endIcon?: Slotted<IconProps>;
    spinner?: Slotted<SpinnerProps>;
    color?: PaletteColor;
    shape?: Shape;
    size?: SizeExtended;
    variant?: Variant | 'text';
    shadow?: Shadow;
    shadowHover?: Shadow;
    active?: boolean;
    fluid?: boolean;
    disabled?: boolean;
    loading?: boolean;
};

const spinnerSizeMap: Record<SizeExtended, SizeFull> = {
    xs: 'xxs',
    s: 'xs',
    m: 's',
    l: 'm',
    xl: 'm'
};

Button.displayName = 'Button';

export default function Button<T extends ElementType = 'button'>({
    as,
    className,
    children,

    content = children,
    icon,
    start,
    startIcon,
    end,
    endIcon,
    spinner,
    color,
    size = 'm',
    shape,
    variant = 'plain',
    shadow,
    shadowHover,
    active,
    fluid,
    loading,
    ...props
}: ComponentProps<ButtonProps, T>) {
    const Root = as || 'button';
    const classNames = cn(className, {
        iconButton: (!!icon && !content) || icon === true,
        color,
        size,
        shape,
        variant,
        shadow,
        shadowHover,
        active,
        fluid,
        loading
    }, styles);
    
    const iconContent = icon !== true && (icon || startIcon || endIcon);
    const iconElement = iconContent && (
        <Slot
            fallback={Icon}
            className={styles.icon}
            color="inherit"
            size={size}
        >
            {iconContent}
        </Slot>
    );

    return (
        <Root
            className={classNames}
            data-active={active}
            data-loading={loading}
            {...props}
        >
            {(start || startIcon) &&
                <span className={styles.start}>
                    {start || iconElement}
                </span>
            }

            {!startIcon && !endIcon && iconElement}

            {loading &&
                <div className={styles.loader}>
                    <Slot
                        fallback={Spinner}
                        className={styles.spinner}
                        color="inherit"
                        size={spinnerSizeMap[size]}
                    >
                        {spinner}
                    </Slot>
                </div>
            }

            {content &&
                <span className={styles.content}>
                    {content}
                </span>
            }

            {(end || endIcon) &&
                <span className={styles.end}>
                    {end || iconElement}
                </span>
            }
        </Root>
    );
}