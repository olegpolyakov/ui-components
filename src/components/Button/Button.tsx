import type { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, IconPosition, Shape, SizeExtended, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';
// import Spinner from '../Spinner';

import cssClasses from './Button.module.scss';

export type ButtonProps = {
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: SizeExtended;
    variant?: Variant | 'text';
    active?: boolean;
    fluid?: boolean;
    disabled?: boolean;
    loading?: boolean;
    iconPosition?: IconPosition;
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
    icon,
    start,
    end,
    color,
    shape = 'rounded',
    size = 'm',
    variant = 'plain',
    active,
    fluid,
    loading,
    iconPosition,
    iconProps,
    ...props
}: ComponentProps<ButtonProps, T>) {
    const Component = as || 'button';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[shape],
        cssClasses[size],
        cssClasses[variant],
        cssClasses[color ? `${variant}-${color}` : variant],
        icon && !content && cssClasses.iconButton,
        iconPosition && cssClasses[`icon-${iconPosition}`],
        active && cssClasses.active,
        fluid && cssClasses.fluid,
        loading && cssClasses.loading
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {icon &&
                <Icon
                    className={cn(elementClassNames.icon, cssClasses.icon)}
                    size={size}
                    {...iconProps}
                >
                    {icon}
                </Icon>
            }

            {content &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {content}
                </span>
            }

            {/* {loading &&
                <Spinner
                    className={cn(elementClassNames.spinner, cssClasses.spinner)}
                    size="smaller"
                />
            } */}

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Component>
    );
}