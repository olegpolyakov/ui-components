import { createContext, forwardRef } from 'react';

import type { PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Provider.scss';

export type ProviderProps = PropsWithChildren & {
    theme?: 'dark' | 'light';
};

export const Context = createContext({});

const displayName = 'Provider';
const elementClassNames = getElementClassNames(displayName);

const Provider = forwardRef<HTMLDivElement, ProviderProps>(({
    theme = 'dark',
    children,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[theme]
    );

    return (
        <div ref={ref} className={classNames} {...props}>
            <Context.Provider value={{}}>
                {children}
            </Context.Provider>
        </div>
    );
});

Provider.displayName = displayName;

export default Provider;