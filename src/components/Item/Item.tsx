import { ReactNode } from 'react';

import { cn } from '../../component';
import type { Color, Variant, Shape, ComponentProps, ElementType, Size, Slotted, Shadow } from '../../types';

import { Icon, IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './Item.module.scss';

export type ItemProps = {
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    size?: Size;
    shape?: Shape;
    shadow?: Shadow;
    shadowHover?: Shadow;
    variant?: Exclude<Variant, 'filled' | 'outlined-filled' | 'text'>;
    active?: boolean;
    disabled?: boolean;
    interactive?: boolean;
};

Item.displayName = 'Item';

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
    shape,
    variant,
    shadow,
    shadowHover,
    active,
    disabled,
    interactive = false,
    ...props
}: ComponentProps<ItemProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        color,
        size,
        shape,
        variant,
        shadow,
        shadowHover,
        active,
        disabled,
        interactive
    }, styles);

    return (
        <Root
            className={classNames}
            data-active={active}
            data-disabled={disabled}
            data-interactive={interactive || undefined}
            {...props}
        >
            {(start || icon) &&
                <span className={styles.start}>
                    {start}

                    {icon && 
                        <Slot
                            fallback={Icon}
                            className={styles.icon}
                            size={size}
                        >
                            {icon}
                        </Slot>
                    }
                </span>
            }

            {content &&
                <span className={styles.content}>
                    {content}
                </span>
            }

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </Root>
    );
}