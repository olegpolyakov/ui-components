import { createContext, useEffect, useMemo, useState } from 'react';

import { getDefaultTheme, onThemeChange, type Theme } from '../../theme';
import type { Props } from '../../types';
import { cn } from '../../utils';

import styles from './Provider.module.scss';

export type ProviderProps = {
    theme?: Theme;
};

export const Context = createContext<{
    rootElement: HTMLElement | null;
    theme: Theme | undefined;
}>({
    rootElement: null,
    theme: undefined
});

Provider.displayName = 'Provider';

const defaultTheme = getDefaultTheme();

export default function Provider({
    children,
    className,
    
    theme,
    ...props
}: Props<ProviderProps>) {
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    
    useEffect(() => {
        rootElement?.setAttribute('data-theme', theme || defaultTheme);

        return onThemeChange(newTheme => {
            if (!theme) {
                rootElement?.setAttribute('data-theme', newTheme);
            }
        });
    }, [rootElement, theme]);

    const classNames = cn(
        className,
        styles.root
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