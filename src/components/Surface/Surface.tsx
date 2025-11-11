import { forwardRef } from 'react';

import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Surface.scss';
import type { Color, PropsWithChildren, Shadow, Variant } from '../../types';

// TODO Move to types
type Size = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
type Padding = Size
    | { x: Size; y: Size }
    | { top?: Size; right?: Size; bottom?: Size; left?: Size };

const displayName = 'Surface';
const elementClassNames = getElementClassNames(displayName);

export type SurfaceProps = PropsWithChildren<{
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
}>;

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(({
    as: As = 'div',
    color,
    roundness,
    shadow,
    variant = 'filled',
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
    className,
    children,
    ...props
}, ref) => {
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
        elementClassNames.root,
        cssClasses.root,
        cssClasses[variant],
        color && cssClasses[color],
        roundness && cssClasses.roundness,
        roundness && cssClasses[`roundness-${roundness}`],
        shadow && cssClasses[`shadow-${shadow}`],
        interactive && cssClasses.interactive,
        typeof p === 'string' && cssClasses[`p-${p}`],
        x && cssClasses[`px-${x}`],
        y && cssClasses[`py-${y}`],
        t && cssClasses[`pt-${t}`],
        r && cssClasses[`pr-${r}`],
        b && cssClasses[`pb-${b}`],
        l && cssClasses[`pl-${l}`]
    );

    return <As ref={ref} className={classNames} {...props}>{children}</As>;
});

Surface.displayName = displayName;

export default Surface;