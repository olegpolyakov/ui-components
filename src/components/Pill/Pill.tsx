import { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, IconPosition, Shape, Size, SizeExtended, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';

import styles from './Pill.module.scss';

export type PillProps = {
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
};

Pill.displayName = 'Pill';

const elementClassNames = getElementClassNames(
    Pill.displayName,
    ['start', 'icon', 'content', 'end']
);

const iconSizeMap: Record<Size, SizeExtended> = {
    s: 'xs',
    m: 's',
    l: 'm'
};

export default function Pill<T extends ElementType = 'span'>({
    as,
    className,
    children,

    content,
    icon,
    start,
    end,
    color,
    shape = 'rounded',
    size = 'm',
    variant = 'tinted',
    interactive,
    iconPosition,
    iconProps,
    ...props
}: ComponentProps<PillProps, T>) {
    const Root = as || 'span';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[shape],
        styles[size],
        styles[variant],
        styles[color ? `${variant}-${color}` : variant],
        interactive && styles.interactive,
        iconPosition && styles[`icon-${iconPosition}`]
    );

    return (
        <Root className={classNames} {...props}>
            {start &&
                <span className={cn(elementClassNames.start, styles.start)}>
                    {start}
                </span>
            }

            {icon &&
                <span className={cn(elementClassNames.icon, styles.icon)}>
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
                <span className={cn(elementClassNames.content, styles.content)}>
                    {content}
                </span>
            }

            {children}

            {end &&
                <span className={cn(elementClassNames.end, styles.end)}>
                    {end}
                </span>
            }
        </Root>
    );
}