import {
    cloneElement,
    createElement,
    isValidElement,
    type ForwardRefExoticComponent,
    type FunctionComponent,
    type ReactElement,
    type ReactNode
} from 'react';

import { classnames as cn, isObject } from '../../utils';

export type SlotProps<P> = {
  element: FunctionComponent<P> | ForwardRefExoticComponent<P> | string;
  children: ReactNode | P;
} & Omit<P, 'children'>

export default function Slot<P extends {className?: string}>({
    element = 'div',
    children,
    ...props
}: SlotProps<P>) {
    return slot(children, element, props);
}

export function slot<P extends {className?: string}>(
    arg: ReactNode | P,
    element: FunctionComponent<P> | ForwardRefExoticComponent<P> | string,
    props = {} as any
) {
    return isValidElement<P>(arg)
        ? cloneElement<P>(arg as ReactElement<P>, {
            ...props,
            className: cn(arg.props.className, props.className)
        })
        : isObject<P>(arg)
            ? createElement(element, {
                ...arg,
                ...props,
                className: cn(arg.className, props.className)
            })
            : createElement(element, props, arg);
}