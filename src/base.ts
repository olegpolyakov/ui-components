import { THEME_PREFIX } from './constants';

import classNames from './styles/classes.module.scss';
import type { AspectRatio, PaletteColor, Opacity, Shadow, Shape, SizeExtended, Space, Variant, Weight } from './types';
import { cn, joinClasses } from './utils';

export function baseClassName(className: string) {
    return `${THEME_PREFIX}-${className}`;
}

export function baseClassNames({
    color,
    shape,
    shadow,
    shadowHover,
    variant,
    aspectRatio,
    gap,
    opacity,
    weight,

    margin,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,

    italic,
    capitalize,
    uppercase,
    active,
    disabled,
    interactive
}: {
        color?: PaletteColor;
        size?: SizeExtended;
        shape?: Shape;
        variant?: Variant | 'text';
        shadow?: Shadow;
        shadowHover?: Shadow;
        aspectRatio?: AspectRatio;
        gap?: Space;
        opacity?: Opacity;
        weight?: Weight;

        margin?: Space;
        marginX?: Space;
        marginY?: Space;
        marginTop?: Space;
        marginBottom?: Space;
        marginLeft?: Space;
        marginRight?: Space;

        italic?: boolean;
        capitalize?: boolean;
        uppercase?: boolean;
        active?: boolean;
        disabled?: boolean;
        interactive?: boolean;
    } = {}) {
    return cn(
        variant && color 
            ? classNames[joinClasses(variant, color)]
            : variant
                ? classNames[variant]
                : color,
        active && classNames[joinClasses(variant, color, 'active')],
        shape && classNames[shape],
        shadow && classNames[`shadow-${shadow}`],
        shadowHover && classNames[`shadow-hover-${shadowHover}`],
        aspectRatio && classNames[`ar-${aspectRatio.replace('/', '-')}`],
        gap && classNames[`g-${gap}`],
        opacity && classNames[`o-${opacity}`],
        weight && classNames[weight],

        margin && classNames[`m-${margin}`],
        marginX && classNames[`mx-${marginX}`],
        marginY && classNames[`my-${marginY}`],
        marginTop && classNames[`mt-${marginTop}`],
        marginBottom && classNames[`mb-${marginBottom}`],
        marginLeft && classNames[`ml-${marginLeft}`],
        marginRight && classNames[`mr-${marginRight}`],

        italic && classNames.italic,
        capitalize && classNames.capitalize,
        uppercase && classNames.uppercase,
        
        disabled && classNames.disabled,
        typeof interactive === 'boolean' && (
            interactive
                ? classNames.interactive
                : classNames.nonInteractive
        )
    );
}

export { baseClassNames as bcn };