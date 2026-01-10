import {
    cloneElement,
    createElement,
    isValidElement,
    ComponentProps,
    type ElementType,
    type FunctionComponent,
    type ReactNode
} from 'react';

import { classnames as cn, isObject } from '../../utils';

export type Slotted<P> = ReactNode | P;

export type SlotProps<
    T extends ElementType | FunctionComponent,
    C extends ReactNode | ComponentProps<T>
> = {
    fallback: T;
    children?: C;
} & (C extends ReactNode ? ComponentProps<T> : C);

export default function Slot<
    T extends ElementType | FunctionComponent,
    C extends ReactNode | ComponentProps<T>
>({
    fallback,
    children,
    className,
    ...props
}: SlotProps<T, C>) {
    return isValidElement<{className?: string}>(children)
        ? cloneElement(children, {
            ...props,
            className: cn(children.props.className, className)
        })
        : isObject<{className?: string}>(children)
            ? createElement(fallback, {
                ...props,
                ...children,
                className: cn(children.className, props.className, className)
            })
            : createElement(fallback, {
                ...props,
                className: cn(props.className, className)
            }, children);
}