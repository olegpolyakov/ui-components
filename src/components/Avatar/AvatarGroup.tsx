import { cn, resolveChildren } from '../../component';
import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';

import Avatar, { AvatarProps } from './Avatar';

import styles from './AvatarGroup.module.scss';

export type AvatarGroupProps = {
    avatars?: PropsWithKey<AvatarProps>[];
    color?: AvatarProps['color'];
    shape?: AvatarProps['shape'];
    size?: AvatarProps['size'];
    variant?: AvatarProps['variant'];
    shadow?: AvatarProps['shadow'];
    gap?: Size;
    overlap?: boolean;
    maxCount?: number;
};

const colors: AvatarProps['color'][] = ['warning', 'success', 'info'];

AvatarGroup.displayName = 'AvatarGroup';

export default function AvatarGroup<T extends ElementType>({
    as,
    className,
    children,

    avatars = [],
    color,
    shape,
    size,
    variant,
    shadow,
    gap,
    overlap,
    maxCount = 0,
    ...props
}: ComponentProps<AvatarGroupProps, T>) {
    const resolvedAvatars = resolveChildren(children, avatars);
    const shownAvatars = (maxCount > 0 && resolvedAvatars.length > maxCount)
        ? resolvedAvatars.slice(0, maxCount)
        : resolvedAvatars;
    const hiddenAvatarsCount = resolvedAvatars.length - shownAvatars.length;

    const Root = as || 'div';
    const classNames = cn(className, {
        color,
        size,
        overlap,
        shape,
        variant,
        gap
    }, styles);

    return (
        <Root
            className={classNames}
            {...props}
        >
            {shownAvatars?.map(({ key, ...avatar }, index) =>
                <Avatar
                    key={key ?? index}
                    className={styles.avatar}
                    color={color || colors[index % 3]}
                    shape={shape}
                    size={size}
                    variant={variant}
                    shadow={shadow}
                    {...avatar}
                />
            )}

            {hiddenAvatarsCount > 0 &&
                <Avatar
                    className={styles.avatar}
                    content={`+${hiddenAvatarsCount}`}
                    color={color}
                    shape={shape}
                    size={size}
                    variant={variant}
                />
            }
        </Root>
    );
}