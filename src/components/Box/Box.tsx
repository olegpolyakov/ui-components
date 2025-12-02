import type {
    Color,
    ComponentProps,
    ElementType,
    Shadow,
    SizeFull as Size,
    Variant
} from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './Box.module.scss';

Box.displayName = 'Box';
const elementClassNames = getElementClassNames(Box.displayName);

type Padding = Size
    | { x: Size; y: Size }
    | { top?: Size; right?: Size; bottom?: Size; left?: Size };

type AspectRatio = '16/10' | '16/9' | '4/3' | '3/2' | '2/1' | '1/1';

export type BoxProps = {
    as?: 'div';
    color?: Color;
    roundness?: Size;
    shadow?: Shadow;
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
    roundness,
    shadow,
    variant = 'plain',
    interactive,
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
    aspectRatio,
    ar = aspectRatio,
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

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[variant],
        color && styles[color],
        styles[color ? `${variant}-${color}` : variant],
        roundness && styles.roundness,
        roundness && styles[`roundness-${roundness}`],
        shadow && styles[`shadow-${shadow}`],
        interactive && styles.interactive,
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
        <Component className={classNames} {...props}>
            {content}
        </Component>
    );
}