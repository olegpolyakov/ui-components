import type { Size } from '@/types';

export const sizeProps: Record<Size, {
    viewBox: number;
    radius: number;
    strokeWidth: number;
    strokeDasharray: number;
}> = {
    large: {
        viewBox: 48,
        radius: 18,
        strokeWidth: 4,
        strokeDasharray: 113.097
    },
    medium: {
        viewBox: 32,
        radius: 12.5,
        strokeWidth: 3,
        strokeDasharray: 78.54
    },
    small: {
        viewBox: 24,
        radius: 8.75,
        strokeWidth: 2.5,
        strokeDasharray: 54.978
    }
};