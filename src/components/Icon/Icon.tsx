import { cloneElement, isValidElement } from 'react';

import type { ComponentProps, ElementType, Opacity, SizeExtended, TextColor } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';
import { getFontVariationSettings } from './utils';

import styles from './Icon.module.scss';

export type IconProps = {
    name?: string;
    color?: TextColor;
    size?: SizeExtended;
    opacity?: Opacity;
    weight?: number | string;
    grade?: number | string;
    filled?: boolean;
};

Icon.displayName = 'Icon';

const elementClassNames = getElementClassNames(Icon.displayName);

export default function Icon<T extends ElementType = 'i'>({
    as,
    children,
    className,

    name,
    color,
    size,
    opacity,
    weight,
    grade,
    filled = false,
    ...props
}: ComponentProps<IconProps, T>) {
    const Root = as || 'i';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        color && styles[color],
        size && styles[size],
        opacity && styles[`opacity-${opacity}`]
    );

    const fontVariationSettings = getFontVariationSettings(
        filled,
        weight,
        grade,
        Number.parseInt(styles[`size-${size}`])
    );

    const style = fontVariationSettings ? {
        fontVariationSettings
    } : undefined;

    return isValidElement<IconProps>(children)
        ? cloneElement<IconProps & { className?: string }>(children, {
            className: classNames
        }) : (
            <Root
                style={style}
                className={classNames}
                {...props}
            >
                {name || children}
            </Root>
        );
}