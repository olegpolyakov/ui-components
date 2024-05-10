import * as React from 'react';

export type Merge<T1, T2> = Omit<T2, keyof T1> & T1;

export type As<P> = React.ElementType<P>;

export type Children = React.ReactNode | React.ReactNode[];

export interface AsProp<As extends React.ElementType = React.ElementType> {
    as?: As;
}

export type Props<CustomProps = object, BuiltinProps = HTMLProps> = Merge<CustomProps, BuiltinProps>;

export type PropsWithChildren<CustomProps = object, BuiltinProps = HTMLProps> = Merge<Props<CustomProps, BuiltinProps>, {
    children?: Children;
}>;

export type PropsWithKey<T> = T & { key?: string; };

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
export type Color = 'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning';
export type Gender = 'unknown' | 'male' | 'female';
export type IconPosition = 'before' | 'after';
export type Intent = 'danger' | 'info' | 'success' | 'warning';
export type Justify = 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
export type Orientation = 'horizontal' | 'vertical';
export type Size = 'small' | 'medium' | 'large';
export type SizeExtended = 'smaller' | 'small' | 'medium' | 'large' | 'larger';
export type SizeFull = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';
export type Shadow = 'small' | 'medium' | 'large';
export type Shape = 'circular' | 'rectangular' | 'rounded';
export type Variant = 'plain' | 'filled' | 'outlined' | 'tinted';
export type Weight = 'light' | 'normal' | 'semibold' | 'bold';

export type MouseInteractionEvent<T extends HTMLElement = HTMLElement> =
    MouseEvent |
    TouchEvent |
    React.MouseEvent<T> |
    React.TouchEvent<T>;