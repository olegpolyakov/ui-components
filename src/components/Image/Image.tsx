import type { Color, ComponentProps, ElementType, Shape } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Image.module.scss';

export type ImageProps = {
    color?: Color;
    shape?: Shape;
    inline?: boolean;
};

Image.displayName = 'Image';

const elementClassNames = getElementClassNames(Image.displayName);

export default function Image<T extends ElementType = 'img'>({
    as,
    className,

    color,
    shape,
    inline,
    ...props
}: ComponentProps<ImageProps, T>) {
    const Component = as || 'img';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        color && styles[color],
        shape && styles[shape],
        inline && styles.inline
    );

    return (
        <Component className={classNames} {...props} />
    );
}