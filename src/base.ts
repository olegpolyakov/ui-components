import { THEME_PREFIX } from './constants';

export function baseClassName(className: string) {
    return `${THEME_PREFIX}-${className}`;
}

export { baseClassName as bcn };