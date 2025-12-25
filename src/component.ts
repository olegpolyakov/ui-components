import { Children as ReactChildren, ReactElement, isValidElement } from 'react';

import type {  Children, Color,  Shadow, Shape, Variant, SizeExtended } from './types';
import { cn } from './utils';

import baseStyles from './styles/classes.module.scss';

export function resolveChildren<T>(children: Children, items: T[]): T[] {
    return items.length > 0
        ? items
        : ReactChildren.toArray(children)
            .filter((child): child is ReactElement<T> => isValidElement<T>(child))
            .map(child => child.props);
}

export function getComponentClassNames(
    {
        color,
        size,
        shape,
        shadow,
        shadowHover,
        variant,
        active,
        disabled,
        interactive
    }: {
        color?: Color;
        size?: SizeExtended;
        shape?: Shape;
        shadow?: Shadow;
        shadowHover?: Shadow;
        variant?: Variant | 'text';
        active?: boolean;
        disabled?: boolean;
        interactive?: boolean;
    } = {},
    ...restClassNames: Record<string, string>[]
) {
    const classNames = Object.assign({}, baseStyles, ...restClassNames);
    
    return cn(
        classNames.root,
        size && classNames[size],
        variant && color 
            ? classNames[joinClasses(variant, color)]
            : variant
                ? classNames[variant]
                : color,
        active && classNames[joinClasses(variant, 'active')],
        shape && classNames[shape],
        shadow && classNames[`shadow-${shadow}`],
        shadowHover && classNames[`shadow-hover-${shadowHover}`],
        typeof interactive === 'boolean' && (interactive ? classNames.interactive : classNames.static),
        disabled && classNames.disabled
    );
}

export { getComponentClassNames as ccn };

function joinClasses(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join('-');
}