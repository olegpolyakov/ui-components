import { ReactNode, useCallback, useMemo, useState } from 'react';

import Toast from './Toast';
import ToastContext from './ToastsContext';

import styles from './Toast.module.scss';

type ToastProps = Parameters<typeof Toast>[0];

export default function ToastsProvider({
    children
}: {
    children: ReactNode;
}) {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [props, setProps] = useState<Partial<ToastProps> | null>(null);

    const showToast = useCallback((
        toast: Partial<ToastProps>
    ) => {
        setProps({
            ...toast,
            appear: true,
            open: true
        });
    }, []);

    const hideToast = useCallback(() => {
        setProps(props => ({
            ...props,
            appear: false,
            open: false
        }));
    }, []);

    const value = useMemo(() => ({
        container: container ?? undefined,
        showToast,
        hideToast
    }), [container, showToast, hideToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}

            <div
                ref={setContainer}
                className={styles.container}
            >
                {props && 
                    <Toast
                        {...props}
                        onClose={hideToast}
                        onClosed={() => setProps(null)}
                    />
                }
            </div>
        </ToastContext.Provider>
    );
}