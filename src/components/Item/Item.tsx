import { ReactNode } from 'react';

import { ccn } from '../../component';
import type { Color, Variant, Shape, ComponentProps, ElementType, Size, Slotted, Shadow } from '../../types';
import { classnames as cn } from '../../utils';

import { Icon, IconProps } from '../Icon';
import Slot from '../Slot';

import baseStyles from '../../styles/classes.module.scss';
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
    variant?: Variant;
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
    shape = 'rounded',
    variant = 'plain',
    shadow,
    shadowHover,
    active,
    disabled,
    interactive,
    ...props
}: ComponentProps<ItemProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        ccn({
            color,
            size,
            shape,
            variant,
            shadow,
            shadowHover,
            active,
            disabled,
            interactive
        }, baseStyles, styles)
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