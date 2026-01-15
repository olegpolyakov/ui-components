import * as React from 'react';

export type { ComponentProps as PropsOf } from 'react';

export type Merge<T1, T2> = Omit<T2, keyof T1> & T1;

export type ElementType = React.ElementType;

export type As<P> = React.ElementType<P>;

export type Children = React.ReactNode | React.ReactNode[];

export type AsProp<T extends ElementType = ElementType> = {
    as?: T;
};

export type Props<
    CustomProps,
    BuiltinProps = HTMLProps
> = Merge<CustomProps, BuiltinProps>;

export type PropsWithChildren<
    CustomProps,
    BuiltinProps = HTMLProps
> = Merge<Props<CustomProps, BuiltinProps>, {
    children?: Children;
}>;

export type PropsWithKey<
    CustomProps,
    BuiltinProps = HTMLProps
> = Merge<Props<CustomProps, BuiltinProps>, {
    key?: string;
}>;

export type PropsWithRef<P, E extends ElementType> = ComponentProps<P, E>;

export type ComponentProps<P, E extends ElementType> = Merge<P & {
    as?: E;
    children?: Children;
}, React.ComponentPropsWithRef<E>>;

export type HTMLProps<T = HTMLElement> = React.HTMLAttributes<T>;
export type HTMLAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;
export type HTMLHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type HTMLImageProps = React.InputHTMLAttributes<HTMLImageElement>;
export type HTMLLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
export type HTMLListProps = React.OlHTMLAttributes<HTMLOListElement> & React.HTMLAttributes<HTMLUListElement>;
export type HTMLListItemProps = React.LiHTMLAttributes<HTMLLIElement>;
export type HTMLParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
export type HTMLSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
export type HTMLSpanProps = React.HTMLAttributes<HTMLSpanElement>;
export type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type Align = 'start' | 'center' | 'end';
export type AspectRatio = '16/10' | '16/9' | '4/3' | '3/2' | '2/1' | '1/1';
export type Color = 'brand' | 'accent' | 'danger' | 'info' | 'success' | 'warning';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | Color | 'inherit';
export type Emphasis = 'low' | 'medium' | 'high';
export type Gender = 'unknown' | 'male' | 'female';
export type IconPosition = 'before' | 'after';
export type Intent = 'danger' | 'info' | 'success' | 'warning';
export type Justify = 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
export type Opacity = 'full' | 'high' | 'medium' | 'low' | 'none';
export type Orientation = 'horizontal' | 'vertical';
export type Padding = Size
    | { x: Size; y: Size }
    | { top?: Size; right?: Size; bottom?: Size; left?: Size };
export type Size = 's' | 'm' | 'l';
export type SizeExtended = 'xs' | Size | 'xl';
export type SizeFull = 'xxs' | SizeExtended | 'xxl';
export type Shadow = SizeFull;
export type Shape = 'circular' | 'rectangular' | 'rounded-xs' | 'rounded-s' | 'rounded-m' | 'rounded-l' | 'rounded-xl';
export type Space = SizeFull | 'none';
export type Variant = 'plain' | 'filled' | 'outlined' | 'tinted' | 'outlined-filled' | 'outlined-tinted';
export type Weight = 'light' | 'normal' | 'semibold' | 'bold';

export type MouseInteractionEvent<T extends HTMLElement = HTMLElement> =
    MouseEvent |
    TouchEvent |
    React.MouseEvent<T> |
    React.TouchEvent<T>;

export type Slotted<P> = React.ReactNode | P;