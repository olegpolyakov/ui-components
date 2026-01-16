import { FunctionComponent } from 'react';

import { cn } from '../../component';
import type { PaletteColor, ComponentProps, ElementType } from '../../types';

import { TextProps } from '../Text';

import styles from './Link.module.scss';

export type LinkProps = TextProps & {
    disabled?: boolean;
};

Link.displayName = 'Link';

export default function Link<T extends ElementType | FunctionComponent = 'a'>({
    as,
    className,
    children,

    content = children,
    color,
    disabled,
    ...props
}: ComponentProps<LinkProps, T>) {
    const Component = as || 'a';
    const classNames = cn(
        className,
        {
            color: color as PaletteColor,
            disabled
        },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}