import { DependencyList, useEffect, useLayoutEffect, useRef, useState } from 'react';

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
    const mountedRef = useRef(false);

    useEffect(() => {
        if (mountedRef.current) return;
        
        mountedRef.current = true;

        return fn();
    }, deps);
}

export function useUpdatedSync(fn: () => void, deps: DependencyList) {
    const mountedRef = useRef(false);

    useLayoutEffect(() => {
        if (mountedRef.current) return;
        
        mountedRef.current = true;

        return fn();
    }, deps);
}

export function useUnmounted(fn: () => void) {
    useEffect(() => () => fn(), []);
}