import { ReactNode, useEffect, useRef, useState, type ElementType } from 'react';

import type { Color, ComponentProps, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';

import cssClasses from './Avatar.module.scss';

export type AvatarProps = {
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
    content = children,
    icon,
    color,
    shape = 'circular',
    size = 'm',
    variant = 'tinted',
    raised,
    iconProps,
    ...props
}: ComponentProps<AvatarProps, T>) {
    const imageRef = useRef<HTMLImageElement>(null);

    const [notLoaded, setNotLoaded] = useState(false);

    useEffect(() => {
        if (!imageRef.current) return;

        setNotLoaded(false);

        const image = imageRef.current;

        function handleLoad() {
            setNotLoaded(false);
        }

        function handleError() {
            setNotLoaded(true);
        }

        if (image.complete && image.naturalHeight !== 0) {
            setNotLoaded(false);
        } else {
            image.addEventListener('load', handleLoad);
            image.addEventListener('error', handleError);

            return () => {
                image.removeEventListener('load', handleLoad);
                image.removeEventListener('error', handleError);
            };
        }
    }, [src]);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant],
        raised && cssClasses.raised
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {children &&
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

            {src && !notLoaded &&
                <img
                    ref={imageRef}
                    className={cn(elementClassNames.image, cssClasses.image)}
                    src={src}
                    alt=""
                />
            }
        </Component>
    );
}