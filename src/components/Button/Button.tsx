import type { ReactNode } from 'react';

import { ccn } from '../../component';
import type { Color, ComponentProps, ElementType, Shadow, Shape, SizeExtended, SizeFull, Slotted, Variant } from '../../types';
import { classnames as cn } from '../../utils';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';
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
    color?: Color;
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

Button.displayName = 'Button';

const spinnerSizeMap: Record<SizeExtended, SizeFull> = {
    xs: 'xxs',
    s: 'xs',
    m: 's',
    l: 'm',
    xl: 'm'
};

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
    shape = 'rounded',
    size = 'm',
    variant = 'plain',
    shadow,
    shadowHover,
    active,
    fluid,
    loading,
    ...props
}: ComponentProps<ButtonProps, T>) {
    const Component = as || 'button';
    const classNames = cn(
        className,
        ccn({
            color,
            size,
            shape,
            variant,
            shadow,
            shadowHover,
            active
        }, styles),
        ((!!icon && !content) || icon === true) && styles.iconButton,
        fluid && styles.fluid,
        loading && styles.loading
    );
    
    const iconContent = icon !== true && (icon || startIcon || endIcon);
    const iconElement = iconContent && (
        <Slot
            fallback={Icon}
            className={styles.icon}
            size={size}
        >
            {iconContent}
        </Slot>
    );

    return (
        <Component
            className={classNames}
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
        </Component>
    );
}