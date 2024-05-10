import { DependencyList, useEffect, useLayoutEffect, useState } from 'react';

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