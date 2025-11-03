import type { Size } from '../../types';

export const sizeProps: Record<Size, {
    viewBox: number;
    radius: number;
    strokeWidth: number;
    strokeDasharray: number;
}> = {
    l: {
        viewBox: 48,
        radius: 18,
        strokeWidth: 4,
        strokeDasharray: 113.097
    },
    m: {
        viewBox: 32,
        radius: 12.5,
        strokeWidth: 3,
        strokeDasharray: 78.54
    },
    s: {
        viewBox: 24,
        radius: 8.75,
        strokeWidth: 2.5,
        strokeDasharray: 54.978
    }
};