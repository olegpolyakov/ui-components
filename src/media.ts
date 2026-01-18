import styles from './styles/vars.module.scss';

export const breakpoints = {
    xxs: parseInt(styles.bpXxs, 10),
    xs: parseInt(styles.bpXs, 10),
    s: parseInt(styles.bpS, 10),
    m: parseInt(styles.bpM, 10),
    l: parseInt(styles.bpL, 10),
    xl: parseInt(styles.bpXl, 10),
    xxl: parseInt(styles.bpXXl, 10)
};

export function isMobile(): boolean {
    return mediaMatches(`(max-width: ${styles.bpM})`);
}

export function isTablet(): boolean {
    return mediaMatches(`(min-width: ${styles.bpM}) and (max-width: ${styles.bpL})`);
}

export function isDesktop(): boolean {
    return mediaMatches(`(min-width: ${breakpoints.l + 1}px)`);
}

export function mediaMatches(query: string): boolean {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia(query).matches;
    }
    return false;
}

export function onMediaChange(query: string, callback: (matches: boolean) => void) {
    if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQueryList = window.matchMedia(query);

        const listener = (event: MediaQueryListEvent) => {
            callback(event.matches);
        };

        mediaQueryList.addEventListener('change', listener);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }

    return () => {};
}

export function onWindowResize(callback: () => void) {
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', callback);

        return () => {
            window.removeEventListener('resize', callback);
        };
    }

    return () => {};
}