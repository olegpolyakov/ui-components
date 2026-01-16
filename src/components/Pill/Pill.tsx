import { ReactNode } from 'react';

import { cn } from '../../component';
import type { PaletteColor, ComponentProps, ElementType, Shape, Size, SizeExtended, Variant } from '../../types';

import Icon, { IconProps } from '../Icon';
import Slot, { Slotted } from '../Slot';

import styles from './Pill.module.scss';

export type PillProps = {
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    start?: ReactNode;
    end?: ReactNode;
    color?: PaletteColor;
    shape?: Exclude<Shape, 'rounded'>;
    size?: Size;
    variant?: Variant;
    active?: boolean;
    interactive?: boolean;
};

Pill.displayName = 'Pill';

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
    size = 'm',
    shape,
    variant = 'tinted',
    interactive = false,
    ...props
}: ComponentProps<PillProps, T>) {
    const Root = as || 'span';
    const classNames = cn(
        className,
        { color, size, shape, variant, interactive },
        styles
    );

    return (
        <Root className={classNames} {...props}>
            {start &&
                <span className={styles.start}>
                    {start}
                </span>
            }

            {icon &&
                <Slot
                    fallback={Icon}
                    className={styles.icon}
                    size={iconSizeMap[size]}
                >
                    {icon}
                </Slot>
            }

            {content &&
                <span className={styles.content}>
                    {content}
                </span>
            }

            {children}

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </Root>
    );
}