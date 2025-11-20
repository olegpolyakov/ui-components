import { Children, cloneElement, isValidElement } from 'react';

import type { ComponentProps, ElementType, PropsWithKey, Space } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Avatar, { type AvatarProps } from './Avatar';
import cssClasses from './AvatarGroup.module.scss';

export type AvatarGroupProps = {
    avatars?: PropsWithKey<AvatarProps>[];
    color?: AvatarProps['color'];
    shape?: AvatarProps['shape'];
    size?: AvatarProps['size'];
    variant?: AvatarProps['variant'];
    raised?: AvatarProps['raised'];
    gap?: Space;
    overlap?: boolean;
    maxCount?: number;
};

AvatarGroup.displayName = 'AvatarGroup';

const elementClassNames = getElementClassNames(
    AvatarGroup.displayName, ['avatar']
);

const colors: AvatarProps['color'][] = ['warning', 'success', 'info'];

export default function AvatarGroup<T extends ElementType>({
    as,
    className,
    children,

    avatars = [],
    color,
    shape,
    size,
    variant,
    overlap,
    gap = 'xxs',
    maxCount = 0,
    ...props
}: ComponentProps<AvatarGroupProps, T>) {
    const shownAvatars = (maxCount > 0 && avatars.length > maxCount)
        ? avatars.slice(0, maxCount)
        : avatars;
    const hiddenAvatarsCount = avatars.length - shownAvatars.length;

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        overlap && cssClasses.overlap,
        gap && cssClasses[`gap-${gap}`]
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {shownAvatars?.map((avatar, index) =>
                <Avatar
                    key={avatar.key}
                    className={cn(elementClassNames.avatar, cssClasses.avatar)}
                    color={color || colors[index % 3]}
                    shape={shape}
                    size={size}
                    variant={variant}
                    {...avatar}
                />
            )}

            {hiddenAvatarsCount > 0 &&
                <Avatar
                    className={cn(elementClassNames.avatar, cssClasses.avatar)}
                    content={`+${hiddenAvatarsCount}`}
                    color={color}
                    shape={shape}
                    size={size}
                    variant={variant}
                />
            }

            {Children.map(children, child => (
                isValidElement<AvatarProps>(child) && cloneElement<AvatarProps>(child, {
                    className: cn(elementClassNames.avatar, cssClasses.avatar, child.props.className),
                    color,
                    shape,
                    size,
                    variant
                })
            ))}
        </Component>
    );
}