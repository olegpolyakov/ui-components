import { createContext, forwardRef, useMemo, useState } from 'react';

import type { PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Provider.module.scss';

export type ProviderProps = PropsWithChildren & {
    theme?: 'dark' | 'light';
};

export const Context = createContext<{
    theme: 'dark' | 'light' | undefined;
}>({
    theme: undefined
});

const displayName = 'Provider';
const elementClassNames = getElementClassNames(displayName);

const Provider = forwardRef<HTMLDivElement, ProviderProps>(({
    theme,
    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[theme ?? '']
    );

    const value = useMemo(() => ({
        theme
    }), [theme]);

    return (
        <div
            ref={ref}
            className={classNames}
            data-theme={theme}
            {...props}
        >
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        </div>
    );
});

Provider.displayName = displayName;

export default Provider;