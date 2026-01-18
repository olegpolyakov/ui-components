import {  useEffect, useState } from 'react';

import { Theme, getDefaultTheme } from '../theme';

export function useTheme(initialTheme: Theme = getDefaultTheme()): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        if (window && document && document.documentElement && theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return [theme, setTheme];
}