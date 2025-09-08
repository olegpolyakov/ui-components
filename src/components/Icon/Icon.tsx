import { HTMLAttributes, ReactNode, cloneElement, forwardRef, isValidElement } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';
import { getSizeValue, getFontVariationSettings } from './utils';

import cssClasses from './Icon.module.scss';
import type { SizeExtended } from '@/types';

export type IconProps = {
    name?: string;
    type?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
    size?: SizeExtended;
    weight?: number | string;
    grade?: number | string;
    filled?: boolean;
    light?: boolean;
    dark?: boolean;
    inactive?: boolean;

    as?: 'i';
    className?: string;
    children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const displayName = 'Icon';
const elementClassNames = getElementClassNames(displayName);

const Icon = forwardRef<HTMLElement, IconProps>(({
    name,
    type = 'outlined',
    size,
    weight,
    grade,
    filled = false,
    light = false,
    dark = false,
    inactive = false,

    as: Component = 'i',
    children = name,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[type],
        size && cssClasses[size],
        light && cssClasses.light,
        dark && cssClasses.dark,
        inactive && cssClasses.inactive
    );

    const fontVariationSettings = getFontVariationSettings(filled, weight, grade, getSizeValue(size));

    const style = fontVariationSettings ? {
        fontVariationSettings
    } : undefined;

    return isValidElement<IconProps>(children) ?
        cloneElement(children, {
            className: classNames
        }) : (
            <Component
                ref={ref}
                style={style}
                className={classNames}
                {...props}
            >
                {children}
            </Component>
        );
});

Icon.displayName = displayName;

export default Icon;