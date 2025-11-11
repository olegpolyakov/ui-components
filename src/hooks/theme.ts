import {  useEffect, useState } from 'react';
import type { Theme } from '../types';

export function useTheme(initialTheme: Theme = getInitialTheme()): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        if (window && document && document.documentElement && theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return [theme, setTheme];
}

function getInitialTheme(): Theme {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
        return 'dark';
    } else {
        return 'light';
    }
}