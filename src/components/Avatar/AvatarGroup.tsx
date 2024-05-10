import { forwardRef } from 'react';

import type { HTMLDivProps, PropsWithChildren, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Avatar, { type AvatarProps } from './Avatar';
import cssClasses from './AvatarGroup.scss';

export type AvatarGroupProps = PropsWithChildren<{
    as?: 'div';
    avatars?: PropsWithKey<AvatarProps>[];
    color?: AvatarProps['color'];
    shape?: AvatarProps['shape'];
    size?: AvatarProps['size'];
    variant?: AvatarProps['variant'];
    raised?: AvatarProps['raised'];
    maxCount?: number;
}, HTMLDivProps>;

const displayName = 'AvatarGroup';
const elementClassNames = getElementClassNames(displayName);
const colors: AvatarProps['color'][] = ['warning', 'success', 'info'];

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
    avatars = [],
    color,
    shape,
    size,
    variant,
    raised,
    maxCount = 0,

    as: Tag = 'div',
    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    const shownAvatars = (maxCount > 0 && avatars.length > maxCount) ? avatars.slice(0, maxCount) : avatars;
    const hiddenAvatarsCount = avatars.length - shownAvatars.length;

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {shownAvatars?.map((avatar, index) =>
                <Avatar
                    key={avatar.key}
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
});

AvatarGroup.displayName = displayName;

export default AvatarGroup;