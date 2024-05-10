import { type ReactNode, forwardRef } from 'react';
import BaseButton from '@restart/ui/Button';

import type { Color, HTMLAnchorProps, HTMLButtonProps, IconPosition, PropsWithChildren, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';
// import Spinner from '../Spinner';

import cssClasses from './Button.scss';

export type ButtonProps = PropsWithChildren<{
    as?: 'button' | 'a';
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant | 'text';
    active?: boolean;
    fluid?: boolean;
    disabled?: boolean;
    loading?: boolean;
    iconPosition?: IconPosition;
    iconProps?: IconProps;
}, HTMLButtonProps & HTMLAnchorProps>;

const displayName = 'Button';
const elementClassNames = getElementClassNames(displayName, ['start', 'icon', 'content', 'spinner', 'end']);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
    content,
    icon,
    start,
    end,
    color,
    shape = 'rounded',
    size = 'medium',
    variant = 'plain',
    active,
    fluid,
    loading,
    iconPosition,
    iconProps,

    className,
    children,
    ...props
}, ref): JSX.Element => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant],
        icon && !content && cssClasses.iconButton,
        iconPosition && cssClasses[`icon-${iconPosition}`],
        active && cssClasses.active,
        fluid && cssClasses.fluid,
        loading && cssClasses.loading
    );

    return (
        <BaseButton
            ref={ref}
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

            {children}

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
        </BaseButton>
    );
});

Button.displayName = displayName;

export default Button;