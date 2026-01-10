import { cn } from '../../component';
import type { Color, ComponentProps, ElementType, Shadow, Shape } from '../../types';

import styles from './Image.module.scss';

export type ImageProps = {
    color?: Color;
    shape?: Shape;
    shadow?: Shadow;
    inline?: boolean;
};

Image.displayName = 'Image';

export default function Image<T extends ElementType = 'img'>({
    as,
    className,

    color,
    shape,
    shadow,
    inline,
    ...props
}: ComponentProps<ImageProps, T>) {
    const Component = as || 'img';
    const classNames = cn(
        className,
        { color, shape, shadow, inline },
        styles
    );

    return (
        <Component className={classNames} {...props} />
    );
}