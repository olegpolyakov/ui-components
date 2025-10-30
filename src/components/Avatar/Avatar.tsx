import { ReactNode, ElementType } from 'react';

import { useImage } from '../../hooks/image';
import type { Color, ComponentProps, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';

import cssClasses from './Avatar.module.scss';

export type AvatarProps = {
    className?: string;
    src?: string;
    content?: ReactNode;
    icon?: ReactNode;
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
    iconProps,
    ...props
}: ComponentProps<AvatarProps, T>) {
    const { ref: imageRef, isLoaded } = useImage(src);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant]
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {content &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {content}
                </span>
            }

            {icon &&
                <Icon
                    className={cn(elementClassNames.icon, cssClasses.icon)}
                    name={typeof icon === 'string' ? icon : undefined}
                    size={size}
                    {...iconProps}
                >
                    {icon}
                </Icon>
            }

            {src && !isLoaded &&
                <img
                    ref={imageRef}
                    className={cn(elementClassNames.image, cssClasses.image)}
                    src={src}
                    alt={alt}
                />
            }
        </Component>
    );
}