import {
    cloneElement,
    createElement,
    isValidElement,
    type ElementType,
    type ForwardRefExoticComponent,
    type FunctionComponent,
    type ReactElement,
    type ReactNode
} from 'react';

import { classnames as cn, isObject } from '../../utils';

export type SlotProps<P> = {
  as: FunctionComponent<P> | ForwardRefExoticComponent<P> | ElementType;
  children: ReactNode | P;
} & Omit<P, 'children'>

export default function Slot<P extends {className?: string}>({
    as = 'div',
    children,
    ...props
}: SlotProps<P>) {
    return isValidElement<P>(children)
        ? cloneElement<P>(children as ReactElement<P>, {
            ...props,
            className: cn(children.props.className, props.className)
        })
        : isObject<P>(children)
            ? createElement(as, {
                ...children,
                ...props,
                className: cn(children.className, props.className)
            })
            : createElement(as, props, children);
}