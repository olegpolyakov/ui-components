import { cn } from '../../component';
import type {
    AspectRatio,
    BaseColor,
    PaletteColor,
    ComponentProps,
    ElementType,
    Padding,
    Shadow,
    Shape,
    SizeFull as Size,
    Variant
} from '../../types';

import baseStyles from '../../styles/classes.module.scss';
import styles from './Box.module.scss';

export type BoxProps = {
    color?: BaseColor | PaletteColor;
    shape?: Shape;
    shadow?: Shadow;
    shadowHover?: Shadow;
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

Box.displayName = 'Box';

export default function Box<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    color,
    shape,
    variant,
    shadow,
    shadowHover,
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
    const Root = as || 'div';
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
    const classNames = cn(
        className,
        {
            color,
            shape,
            variant,
            shadow,
            shadowHover,
            aspectRatio: ar,
            interactive,
            p: typeof p === 'string' ? p : undefined
        },
        styles,
        typeof p === 'string' && baseStyles[`p-${p}`],
        x && baseStyles[`px-${x}`],
        y && baseStyles[`py-${y}`],
        t && baseStyles[`pt-${t}`],
        r && baseStyles[`pr-${r}`],
        b && baseStyles[`pb-${b}`],
        l && baseStyles[`pl-${l}`]
    );

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}