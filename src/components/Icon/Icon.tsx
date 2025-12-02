import { cloneElement, isValidElement } from 'react';

import type { ComponentProps, ElementType, SizeExtended, Tone } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';
import { getFontVariationSettings } from './utils';

import styles from './Icon.module.scss';

export type IconProps = {
    name?: string;
    type?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
    size?: SizeExtended;
    tone?: Tone;
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
    type = 'outlined',
    size,
    tone,
    weight,
    grade,
    filled = false,
    ...props
}: ComponentProps<IconProps, T>) {
    const Component = as || 'i';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[type],
        size && styles[size],
        tone && styles[`tone-${tone}`]
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

    return isValidElement<IconProps>(children) ?
        cloneElement<IconProps & { className?: string }>(children, {
            className: classNames
        }) : (
            <Component
                style={style}
                className={classNames}
                {...props}
            >
                {name || children}
            </Component>
        );
}