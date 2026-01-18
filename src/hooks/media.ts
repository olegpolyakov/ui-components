import { useEffect, useState } from 'react';

import { breakpoints, isDesktop, isTablet, mediaMatches, onMediaChange, onWindowResize } from '../media';
import { ScreenSize } from '../types';

import styles from '../styles/vars.module.scss';

export function useIsMobile(): boolean {
    return useMediaQuery(`(max-width: ${styles.bpM})`);
}

export function useIsTablet(): boolean {
    return useMediaQuery(`(min-width: ${styles.bpM}) and (max-width: ${styles.bpL})`);
}

export function useIsDesktop(): boolean {
    return useMediaQuery(`(min-width: ${breakpoints.l + 1}px)`);
}

export function useScreenSize(): ScreenSize {
    const [size, setSize] = useState<ScreenSize>(() => {
        if (isDesktop()) return 'desktop';
        if (isTablet()) return 'tablet';
        return 'mobile';
    });

    useEffect(() => {
        return onWindowResize(() => {
            if (isDesktop()) {
                setSize('desktop');
            } else if (isTablet()) {
                setSize('tablet');
            } else {
                setSize('mobile');
            }
        });
    }, []);

    return size;
}

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => mediaMatches(query));

    useEffect(() => {
        return onMediaChange(query, setMatches);
    }, [query]);

    return matches;
}