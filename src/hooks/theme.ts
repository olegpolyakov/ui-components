import {  useEffect, useState } from 'react';
import type { Theme } from '../types';

export function useTheme(initialTheme: Theme): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        if (window && document && document.documentElement && theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return [theme, setTheme];
}