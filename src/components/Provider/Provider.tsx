import { createContext, useEffect, useMemo, useState } from 'react';

import type { Props } from '../../types';
import { cn } from '../../utils';

import styles from './Provider.module.scss';

export type ProviderProps = {
    theme?: 'dark' | 'light';
};

export const Context = createContext<{
    rootElement: HTMLElement | null;
    theme: 'dark' | 'light' | undefined;
}>({
    rootElement: null,
    theme: undefined
});

Provider.displayName = 'Provider';

export default function Provider({
    children,
    className,
    
    theme = 'dark',
    ...props
}: Props<ProviderProps>) {
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        rootElement?.setAttribute('data-theme', theme);
    }, [rootElement, theme]);

    const classNames = cn(
        className,
        styles.root,
        styles[theme ?? '']
    );

    const value = useMemo(() => ({
        rootElement,
        theme
    }), [rootElement, theme]);

    return (
        <div
            ref={setRootElement}
            className={classNames}
            data-theme={theme}
            {...props}
        >
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        </div>
    );
}