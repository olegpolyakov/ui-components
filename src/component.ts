import { Children as ReactChildren, ReactElement, isValidElement } from 'react';

import { baseClassName } from './base';
import type {  Children, Color,  Shadow, Shape, Variant, SizeExtended } from './types';

export function resolveChildren<T>(children: Children, items: T[]): T[] {
    return items.length > 0
        ? items
        : ReactChildren.toArray(children)
            .filter((child): child is ReactElement<T> => isValidElement<T>(child))
            .map(child => child.props);
}

export function getComponentClassNames(
    classNames: Record<string, string>,
    {
        color,
        size,
        shape,
        shadow,
        hoverShadow,
        variant,
        interactive
    }: {
        color?: Color;
        size?: SizeExtended;
        shape?: Shape;
        shadow?: Shadow;
        hoverShadow?: Shadow;
        variant?: Variant | 'text';
        interactive?: boolean;
    } = {}
) {
    return [
        classNames.root,
        size && classNames[size],
        variant && color 
            ? classNames[joinClasses(variant, color)]
            : variant
                ? classNames[variant]
                : color,
        shape && (shape in classNames
            ? classNames[shape]
            : baseClassName(shape)
        ),
        shadow && (`shadow-${shadow}` in classNames
            ? classNames[`shadow-${shadow}`]
            : baseClassName(`shadow-${shadow}`)
        ),
        hoverShadow && baseClassName(`hover-shadow-${hoverShadow}`),
        interactive && classNames.interactive
    ].filter(Boolean);
}

export { getComponentClassNames as ccn };

function joinClasses(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join('-');
}