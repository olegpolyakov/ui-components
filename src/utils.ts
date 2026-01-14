import cn from 'classnames';

import { Key, KeyCode } from './constants';
import type { MouseInteractionEvent } from './types';

export { cn, cn as classnames };

export function noop() { return; }

export function joinClasses(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join('-');
}

export function getClientWidth(element: HTMLElement) {
    if (element.offsetParent !== null)
        return element.clientWidth;

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.setProperty('position', 'absolute');
    clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
    document.documentElement.appendChild(clone);
    const clientWidth = clone.clientWidth;
    document.documentElement.removeChild(clone);

    return clientWidth;
}

export function getClientHeight(element: HTMLElement) {
    if (element.offsetParent !== null)
        return element.clientHeight;

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.setProperty('position', 'absolute');
    clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
    document.documentElement.appendChild(clone);
    const clientHeight = clone.clientHeight;
    document.documentElement.removeChild(clone);

    return clientHeight;
}

export function getEventKey(event: KeyboardEvent | React.KeyboardEvent) {
    switch (event.key || event.keyCode) {
        case Key.ARROW_LEFT:
        case KeyCode.ARROW_LEFT:
            return Key.ARROW_LEFT;

        case Key.ARROW_UP:
        case KeyCode.ARROW_UP:
            return Key.ARROW_UP;

        case Key.ARROW_RIGHT:
        case KeyCode.ARROW_RIGHT:
            return Key.ARROW_RIGHT;

        case Key.ARROW_DOWN:
        case KeyCode.ARROW_DOWN:
            return Key.ARROW_DOWN;

        case Key.HOME:
        case KeyCode.HOME:
            return Key.HOME;

        case Key.END:
        case KeyCode.END:
            return Key.END;

        case Key.PAGE_UP:
        case KeyCode.PAGE_UP:
            return Key.PAGE_UP;

        case Key.PAGE_DOWN:
        case KeyCode.PAGE_DOWN:
            return Key.PAGE_DOWN;

        default:
            return undefined;
    }
}

export function getPageX<T extends HTMLElement>(event: MouseInteractionEvent) {
    return event instanceof TouchEvent ?
        event.targetTouches?.[0].pageX :
        (event as React.MouseEvent<T>).pageX;
}

export function getPageY<T extends HTMLElement>(event: MouseInteractionEvent) {
    return event instanceof TouchEvent ?
        event.targetTouches?.[0].pageY :
        (event as React.MouseEvent<T>).pageY;
}

export function isUndefined(value: unknown) {
    return value === undefined;
}

export function isNull(value: unknown) {
    return value === null;
}

export function isBoolean(value: unknown) {
    return typeof value === 'boolean';
}

export function isNumber(value: unknown) {
    return typeof value === 'number';
}

export function isString(value: unknown) {
    return typeof value === 'string';
}

export function isArray(value: unknown) {
    return Array.isArray(value);
}

export function isObject<T = object>(arg: unknown): arg is T {
    return typeof arg === 'object' && !Array.isArray(arg) && arg !== null;
}

export function isFunction(value: unknown) {
    return typeof value === 'function';
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}