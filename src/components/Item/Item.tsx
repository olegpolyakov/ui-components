import { ReactNode } from 'react';

import type { Color, Variant, Shape, ComponentProps, ElementType, Size, Slotted } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import { Icon, IconProps } from '../Icon';

import styles from './Item.module.scss';
import Slot from '../Slot';

export type ItemProps = {
    start?: ReactNode;
    icon?: Slotted<IconProps>;
    content?: ReactNode;
    end?: ReactNode;
    color?: Color;
    size?: Size;
    shape?: Shape;
    variant?: Variant;
    disabled?: boolean;
    interactive?: boolean;
    active?: boolean;
};

Item.displayName = 'Item';

const elementClassNames = getElementClassNames(
    Item.displayName,
    ['start', 'icon', 'content', 'end']
);

export default function Item<T extends ElementType = 'div'>({
    as,
    children,
    className,

    content = children,
    icon,
    start,
    end,
    color,
    size,
    shape = 'rounded',
    variant = 'plain',
    active,
    disabled,
    interactive,
    ...props
}: ComponentProps<ItemProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        color && styles[color],
        size && styles[size],
        shape && styles[shape],
        styles[variant],
        styles[color ? `${variant}-${color}` : variant],
        active && styles.active,
        disabled && styles.disabled,
        interactive && styles.interactive
    );

    return (
        <Root
            className={classNames}
            data-active={active}
            data-disabled={disabled}
            data-interactive={interactive}
            {...props}
        >
            {(start || icon) &&
                <span className={cn(elementClassNames.start, styles.start)}>
                    {start}

                    {icon && 
                        <Slot
                            fallback={Icon}
                            className={cn(elementClassNames.icon, styles.icon)}
                            size={size}
                        >
                            {icon}
                        </Slot>
                    }
                </span>
            }

            {content &&
                <span className={cn(elementClassNames.content, styles.content)}>
                    {content}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, styles.end)}>
                    {end}
                </span>
            }
        </Root>
    );
}