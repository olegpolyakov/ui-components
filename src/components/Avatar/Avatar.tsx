import { ReactNode, ElementType } from 'react';

import { useImage } from '../../hooks/image';
import type { Color, ComponentProps, Shadow, Shape, Size, Slotted, Variant } from '../../types';
import { classnames as cn, getComponentClassNames, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './Avatar.module.scss';

export type AvatarProps = {
    src?: string;
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    color?: Color;
    size?: Size;
    shape?: Shape;
    shadow?: Shadow;
    variant?: Variant;
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
    shadow,
    variant = 'tinted',
    ...props
}: ComponentProps<AvatarProps, T>) {
    const { ref: imageRef } = useImage(src);

    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        ...getComponentClassNames(styles, {
            color,
            size,
            shape,
            variant,
            shadow
        })
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