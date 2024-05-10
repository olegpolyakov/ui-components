import { forwardRef } from 'react';

import type { Color, HTMLImageProps, Props, Shape } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Image.scss';

export type ImageProps = Props<{
    as?: 'img';
    color?: Color;
    shape?: Shape;
    inline?: boolean;
}, HTMLImageProps>;

const displayName = 'Image';
const elementClassNames = getElementClassNames(displayName);

const Image = forwardRef<HTMLImageElement, ImageProps>(({
    color,
    shape,
    inline,

    as: Tag = 'img',
    className,
    ...props
}, ref): JSX.Element => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        shape && cssClasses[shape],
        inline && cssClasses.inline
    );

    return (
        <Tag
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

Image.displayName = displayName;

export default Image;