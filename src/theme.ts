export type Theme = 'dark' | 'light';

export function getDefaultTheme(): Theme {
    if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }

    return 'light';
}

export function onThemeChange(callback: (theme: Theme) => void) {
    if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (event: MediaQueryListEvent) => {
            callback(event.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', listener);

        return () => {
            mediaQuery.removeEventListener('change', listener);
        };
    }

    return () => {};
}