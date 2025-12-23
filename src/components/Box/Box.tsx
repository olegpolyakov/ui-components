import type {
    AspectRatio,
    Color,
    ComponentProps,
    ElementType,
    Padding,
    Shadow,
    Shape,
    SizeFull as Size,
    Variant
} from '../../types';
import { classnames as cn, getComponentClassNames, getElementClassNames } from '../../utils';

import styles from './Box.module.scss';

Box.displayName = 'Box';

const elementClassNames = getElementClassNames(Box.displayName);

export type BoxProps = {
    as?: 'div';
    color?: Color;
    shape?: Shape;
    shadow?: Shadow;
    hoverShadow?: Shadow;
    variant?: Variant;
    interactive?: boolean;
    padding?: Padding;
    paddingX?: Size;
    paddingY?: Size;
    paddingTop?: Size;
    paddingRight?: Size;
    paddingBottom?: Size;
    paddingLeft?: Size;
    p?: Padding;
    px?: Size;
    py?: Size;
    pt?: Size;
    pr?: Size;
    pb?: Size;
    pl?: Size;
    aspectRatio?: AspectRatio;
    ar?: AspectRatio;
};

export default function Box<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    color,
    shape,
    shadow,
    hoverShadow,
    variant = 'plain',
    interactive,
    aspectRatio,
    ar = aspectRatio,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    p = padding,
    px = paddingX,
    py = paddingY,
    pt = paddingTop,
    pr = paddingRight,
    pb = paddingBottom,
    pl = paddingLeft,
    ...props
}: ComponentProps<BoxProps, T>) {
    const {
        x = px,
        y = py,
        top: t = pt,
        right: r = pr,
        bottom: b = pb,
        left: l = pl
    } = typeof p === 'object'
        ? (p as { x: Size; y: Size } & {
        top: Size;
        right: Size;
        bottom: Size;
        left: Size;
      })
        : ({} as { x: Size; y: Size } & {
        top: Size;
        right: Size;
        bottom: Size;
        left: Size;
      });

    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        ...getComponentClassNames(styles, {
            color,
            shape,
            shadow,
            hoverShadow,
            variant,
            interactive
        }),
        typeof p === 'string' && styles[`p-${p}`],
        x && styles[`px-${x}`],
        y && styles[`py-${y}`],
        t && styles[`pt-${t}`],
        r && styles[`pr-${r}`],
        b && styles[`pb-${b}`],
        l && styles[`pl-${l}`],
        ar && styles[`ar-${ar.replace('/', '-')}`]
    );

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}