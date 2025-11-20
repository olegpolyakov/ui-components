import type { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Shape, SizeExtended, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';
// import Spinner from '../Spinner';

import styles from './Button.module.scss';

export type ButtonProps = {
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    startIcon?: ReactNode;
    end?: ReactNode;
    endIcon?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: SizeExtended;
    variant?: Variant | 'text';
    active?: boolean;
    fluid?: boolean;
    disabled?: boolean;
    loading?: boolean;
    iconProps?: IconProps;
};

Button.displayName = 'Button';

const elementClassNames = getElementClassNames(
    Button.displayName,
    ['start', 'icon', 'content', 'spinner', 'end']
);

export default function Button<T extends ElementType = 'button'>({
    as,
    className,
    children,

    content = children,
    start,
    startIcon,
    end,
    endIcon,
    icon,
    color,
    shape = 'rounded',
    size = 'm',
    variant = 'plain',
    active,
    fluid,
    loading,
    iconProps,
    ...props
}: ComponentProps<ButtonProps, T>) {
    const Component = as || 'button';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[shape],
        styles[size],
        styles[variant],
        styles[color ? `${variant}-${color}` : variant],
        !!icon && !content && styles.iconButton,
        !!startIcon && styles.iconBefore,
        !!endIcon && styles.iconAfter,
        active && styles.active,
        fluid && styles.fluid,
        loading && styles.loading
    );
    
    const iconContent = icon || startIcon || endIcon;
    const iconElement = iconContent && (
        <Icon
            className={cn(elementClassNames.icon, styles.icon)}
            size={size}
            {...iconProps}
        >
            {iconContent}
        </Icon>
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {(start || startIcon) &&
                <span className={cn(elementClassNames.start, styles.start)}>
                    {start || iconElement}
                </span>
            }

            {!startIcon && !endIcon && iconElement}

            {content &&
                <span className={cn(elementClassNames.content, styles.content)}>
                    {content}
                </span>
            }

            {/* {loading &&
                <Spinner
                    className={cn(elementClassNames.spinner, cssClasses.spinner)}
                    size="smaller"
                />
            } */}

            {(end || endIcon) &&
                <span className={cn(elementClassNames.end, styles.end)}>
                    {end || iconElement}
                </span>
            }
        </Component>
    );
}