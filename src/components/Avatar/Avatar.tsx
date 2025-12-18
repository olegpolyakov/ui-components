import { ReactNode, ElementType } from 'react';

import { useImage } from '../../hooks/image';
import type { Color, ComponentProps, Shape, Size, Slotted, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './Avatar.module.scss';

export type AvatarProps = {
    src?: string;
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
    raised?: boolean;
    iconProps?: IconProps;
};

Avatar.displayName = 'Avatar';

const elementClassNames = getElementClassNames(
    Avatar.displayName,
    ['content', 'icon', 'image']
);

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
    variant = 'tinted',
    ...props
}: ComponentProps<AvatarProps, T>) {
    const { ref: imageRef } = useImage(src);

    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[color ? `${variant}-${color}` : variant],
        styles[size],
        styles[shape]
    );

    return (
        <Root
            className={classNames}
            {...props}
        >
            {content &&
                <span className={cn(elementClassNames.content, styles.content)}>
                    {content}
                </span>
            }

            {icon &&
                <Slot
                    fallback={Icon}
                    className={cn(elementClassNames.icon, styles.icon)}
                    size={size}
                >
                    {icon}
                </Slot>
            }

            {src &&
                <img
                    ref={imageRef}
                    className={cn(elementClassNames.image, styles.image)}
                    src={src}
                    alt={alt}
                />
            }
        </Root>
    );
}