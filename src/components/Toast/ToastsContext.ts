import { ReactNode, createContext, useContext } from 'react';

import { noop } from '../../utils';

import type { ToastProps } from './Toast';

export type ToastsContext = {
    container?: HTMLElement;
    showToast: (
        props: Partial<ToastProps>,
        getContent: (onClose: () => void) => ReactNode,
    ) => void;
    hideToast: (id: string) => void;
};

const ToastsContext = createContext<ToastsContext>({
    container: undefined,
    showToast: noop,
    hideToast: noop
});

export function useToastsContext(): ToastsContext {
    return useContext(ToastsContext);
}

export default ToastsContext;