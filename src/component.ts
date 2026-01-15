import { Children as ReactChildren, ReactElement, isValidElement, createElement, cloneElement, type FunctionComponent } from 'react';

import type {
    Children,
    Color,
    Shadow,
    Shape,
    Variant,
    SizeExtended,
    Space,
    AspectRatio,
    Opacity,
    Weight,
    SizeFull,
    Size,
    TextColor
} from './types';
import { cn, isObject, isString } from './utils';

import baseClassNames from './styles/classes.module.scss';

export function resolveChildren<T>(children: Children, items: T[]): T[] {
    return items.length > 0
        ? items
        : ReactChildren.toArray(children)
            .filter((child): child is ReactElement<T> => isValidElement<T>(child))
            .map(child => child.props);
}

export function renderChildren<T extends Record<string, unknown>>(
    children: Children,
    items: T[],
    Fallback: FunctionComponent<T>,
    props?: T
): ReactElement[] {
    return [
        ...ReactChildren.toArray(children),
        ...items
    ].map(child => isValidElement<T>(child)
        ? cloneElement<T>(child, {
            ...props,
            ...(child.props as T)
        })
        : createElement<T>(Fallback, {
            ...props,
            ...(child as T)
        })
    );
} 

export function getComponentClassNames(
    className = '',
    {
        root = true,
        color,
        size,
        shape,
        variant,

        shadow,
        shadowHover,

        inline,
        aspectRatio,
        gap,
        opacity,

        italic,
        capitalize,
        underline,
        uppercase,
        ellipsis,
        weight,

        active,
        disabled,
        interactive,
        ...rest
    }: {
        root?: boolean;
        color?: Color | TextColor;
        size?: Size | SizeExtended | SizeFull | 'inherit';
        shape?: Shape;
        variant?: Variant | 'text';

        shadow?: Shadow;
        shadowHover?: Shadow;

        aspectRatio?: AspectRatio;
        opacity?: Opacity;
        inline?: boolean;

        gap?: Space;

        italic?: boolean;
        capitalize?: boolean;
        underline?: boolean;
        uppercase?: boolean;
        ellipsis?: boolean;
        weight?: Weight;

        active?: boolean;
        disabled?: boolean;
        interactive?: boolean;
    } & Record<string, string | boolean | undefined> = {},
    componentClassNames: Record<string, string | boolean | undefined>,
    ...restClassNames: Record<string, string | boolean | undefined>[] | (string | boolean | undefined)[]
) {
    const classNames = {
        ...baseClassNames,
        ...componentClassNames,
        ...restClassNames
            .map(cls =>
                isObject(cls)
                    ? cls
                    : isString(cls)
                        ? { [cls]: true }
                        : undefined
            )
            .filter(cls => !!cls)
            .reduce((acc, curr) => ({ ...acc, ...curr }), {})
    };
    
    return cn(
        className,

        root && classNames.root,
        size && classNames[size],

        ...Object.entries(rest).map(([key, value]) => value && (componentClassNames[key] || baseClassNames[key])),
        
        getVariantClassNames(
            variant,
            color,
            active,
            interactive === false,
            classNames
        ),
        
        shape && classNames[shape],

        shadow && classNames[`shadow-${shadow}`],
        shadowHover && classNames[`shadow-hover-${shadowHover}`],
        
        aspectRatio && classNames[`ar-${aspectRatio.replace('/', '-')}`],
        gap && classNames[`gap-${gap}`],
        opacity && classNames[`o-${opacity}`],
        inline && classNames.inline,

        weight && classNames[weight],
        italic && classNames.italic,
        underline && classNames.underline,
        capitalize && classNames.capitalize,
        uppercase && classNames.uppercase,
        ellipsis && classNames.ellipsis,

        disabled && classNames.disabled,
        interactive && classNames.interactive
    );
}

function getVariantClassNames(
    variant: Variant | 'text' | undefined,
    color: Color | TextColor | undefined,
    active: boolean | undefined,
    nonInteractive: boolean | undefined,
    classNames: Record<string, string | boolean | undefined>
) {
    const className = [
        variant,
        color,
        active ? 'active' : undefined,
        nonInteractive ? 'static' : undefined
    ].filter(part => !!part).join('-');

    return classNames[className];
}

export { getComponentClassNames as cn, getComponentClassNames as ccn };