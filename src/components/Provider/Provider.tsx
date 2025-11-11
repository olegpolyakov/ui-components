import { createContext, useMemo, useState } from 'react';

import type { Props } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Provider.module.scss';

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

const elementClassNames = getElementClassNames(Provider.displayName);

export default function Provider({
    children,
    className,
    
    theme,
    ...props
}: Props<ProviderProps>) {
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[theme ?? '']
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