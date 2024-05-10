import { forwardRef, ReactNode } from 'react';

import type { Color, HTMLSpanProps, IconPosition, PropsWithChildren, Shape, Size, SizeExtended, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';

import cssClasses from './Pill.scss';

export type PillProps = PropsWithChildren<{
    as?: 'span';
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
    active?: boolean;
    interactive?: boolean;
    iconPosition?: IconPosition;
    iconProps?: IconProps;
}, HTMLSpanProps>;

const displayName = 'Pill';
const elementClassNames = getElementClassNames(displayName, ['start', 'icon', 'content', 'end']);

const iconSizeMap: Record<Size, SizeExtended> = {
    small: 'smaller',
    medium: 'small',
    large: 'medium'
};

const Pill = forwardRef<HTMLElement, PillProps>(({
    content,
    icon,
    start,
    end,
    color = 'primary',
    shape = 'rounded',
    size = 'medium',
    variant = 'outlined',
    interactive,
    iconPosition,
    iconProps,

    as: Tag = 'span',
    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[color],
        cssClasses[shape],
        cssClasses[size],
        cssClasses[variant],
        interactive && cssClasses.interactive,
        iconPosition && cssClasses[`icon-${iconPosition}`]
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {icon &&
                <span className={cn(elementClassNames.icon, cssClasses.icon)}>
                    <Icon
                        name={typeof icon === 'string' ? icon : undefined}
                        size={iconSizeMap[size]}
                        {...iconProps}
                    >
                        {icon}
                    </Icon>
                </span>
            }

            {content &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {content}
                </span>
            }

            {children}

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Tag>
    );
});

Pill.displayName = displayName;

export default Pill;