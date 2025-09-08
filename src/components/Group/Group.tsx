import { forwardRef } from 'react';

import type { HTMLDivProps, PropsWithChildren, PropsWithKey, Space } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Avatar, { type AvatarProps } from './Avatar';
import cssClasses from './AvatarGroup.module.scss';

export type AvatarGroupProps = PropsWithChildren<{
    as?: 'div';
    avatars?: PropsWithKey<AvatarProps>[];
    color?: AvatarProps['color'];
    shape?: AvatarProps['shape'];
    size?: AvatarProps['size'];
    variant?: AvatarProps['variant'];
    raised?: AvatarProps['raised'];
    gap?: Space;
    overlapping?: boolean;
    maxCount?: number;
}, HTMLDivProps>;

const displayName = 'AvatarGroup';
const elementClassNames = getElementClassNames(displayName, ['avatar']);
const colors: AvatarProps['color'][] = ['warning', 'success', 'info'];

export default function Group({
    avatars = [],
    color,
    shape,
    size,
    variant,
    overlapping,
    raised,
    gap,
    maxCount = 0,

    as: Tag = 'div',
    className,
    children,
    ...props
}) {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        overlapping && cssClasses.overlapping,
        gap && cssClasses[`gap-${gap}`]
    );

    const shownAvatars = (maxCount > 0 && avatars.length > maxCount) ? avatars.slice(0, maxCount) : avatars;
    const hiddenAvatarsCount = avatars.length - shownAvatars.length;

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {shownAvatars?.map((avatar, index) =>
                <Avatar
                    key={avatar.key}
                    className={cn(elementClassNames.avatar, cssClasses.avatar)}
                    color={color || colors[index % 3]}
                    shape={shape}
                    size={size}
                    variant={variant}
                    raised={raised}
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

            {children}
        </Tag>
    );
}