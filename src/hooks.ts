import { DependencyList, useEffect, useLayoutEffect, useState } from 'react';
import type { Theme } from './types';

export function useCreated(fn: () => void) {
    const [created, setCreated] = useState(false);

    if (created) return;

    fn();

    setCreated(true);
}

export function useMounted(fn: () => void) {
    useEffect(() => fn(), []);
}

export function useUpdated(fn: () => void, deps: DependencyList) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) return setMounted(true);

        return fn();
    }, deps);
}

export function useUpdatedSync(fn: () => void, deps: DependencyList) {
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        if (!mounted) return setMounted(true);

        return fn();
    }, deps);
}

export function useUnmounted(fn: () => void) {
    useEffect(() => () => fn(), []);
}

export function useTheme(initialTheme: Theme): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    useEffect(() => {
        if (window && document && document.documentElement && theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    return [theme, setTheme];
}