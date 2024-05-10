import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';

import type { Color, Gender, Props, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';

import cssClasses from './Avatar.scss';

export type AvatarProps = Props<{
    content?: ReactNode;
    icon?: ReactNode;
    src?: string;
    gender?: Gender;
    color?: Color;
    shape?: Shape;
    size?: Size;
    variant?: Variant;
    raised?: boolean;
    iconProps?: IconProps;
}>;

const GenderColor = {
    unknown: 'unset',
    male: 'primary',
    female: 'secondary'
};

const displayName = 'Avatar';
const elementClassNames = getElementClassNames(displayName, ['content', 'icon', 'image']);

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
    content,
    icon,
    src,
    gender,
    color = gender ? GenderColor[gender] : undefined,
    shape = 'circular',
    size = 'medium',
    variant = 'tinted',
    raised,
    iconProps,

    className,
    children = content,
    ...props
}, ref) => {
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

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        gender && cssClasses[gender],
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant],
        raised && cssClasses.raised
    );

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            {children &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {children}
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
        </div>
    );
});

Avatar.displayName = displayName;

export default Avatar;