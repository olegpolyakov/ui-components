import { ReactNode, ElementType } from 'react';

import { cn } from '../../component';
import { useImage } from '../../hooks/image';
import type { PaletteColor, ComponentProps, Shadow, Shape, Size, Slotted, Variant } from '../../types';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './Avatar.module.scss';

export type AvatarProps = {
    src?: string;
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    color?: PaletteColor;
    size?: Size;
    shape?: Shape;
    shadow?: Shadow;
    variant?: Variant;
    interactive?: boolean;
};

Avatar.displayName = 'Avatar';

export default function Avatar<T extends ElementType = 'div'>({
    as,
    className,
    children,

    src,
    alt,
    content = children,
    icon,
    color,
    shape = 'circular',
    size = 'm',
    shadow,
    variant = 'tinted',
    interactive = false,
    ...props
}: ComponentProps<AvatarProps, T>) {
    const { ref: imageRef } = useImage(src);

    const Root = as || 'div';
    const classNames = cn(className, {
        color,
        size,
        shape,
        variant,
        shadow,
        interactive
    }, styles);

    return (
        <Root
            className={classNames}
            {...props}
        >
            {content &&
                <span className={styles.content}>
                    {content}
                </span>
            }

            {icon &&
                <Slot
                    fallback={Icon}
                    className={styles.icon}
                    size={size}
                >
                    {icon}
                </Slot>
            }

            {src &&
                <img
                    ref={imageRef}
                    className={styles.image}
                    src={src}
                    alt={alt}
                />
            }
        </Root>
    );
}