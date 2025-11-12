import { useContext, useEffect, useRef } from 'react';

import type { PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Portal from '../Portal';
import { ProviderContext } from '../Provider';
import Transition from '../Transition';

import styles from './Modal.module.scss';

export type ModalProps = PropsWithChildren<{
    container?: HTMLElement;
    backdrop?: boolean;
    fixed?: boolean;
    open?: boolean;
    disableScroll?: boolean;
}>;

Modal.displayName = 'Modal';

const elementClassNames = getElementClassNames(Modal.displayName);

export default function Modal({
    className,
    children,

    container,
    backdrop = false,
    fixed = false,
    open = false,
    disableScroll = true
}: ModalProps) {
    const { rootElement } = useContext(ProviderContext);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !disableScroll) return;

        document.body.classList.add(styles.scrollDisabled);

        return () => {
            document.body.classList.remove(styles.scrollDisabled);
        };
    }, [open, disableScroll]);

    useEffect(() => {
        const activeElement = document.activeElement as HTMLElement;
        const firstChild = modalRef.current?.firstChild as HTMLElement;

        firstChild?.focus?.();

        return () => {
            firstChild?.blur?.();
            activeElement?.focus?.();
        };
    }, []);

    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        backdrop && styles.backdrop,
        fixed && styles.fixed
    );

    return (
        <Portal container={rootElement ?? container}>
            <Transition
                in={open}
                nodeRef={modalRef}
                type="fade"
                timeout={200}
                unmountOnExit
            >
                <div
                    ref={modalRef}
                    className={classNames}
                    data-open={open ? true : undefined}
                >
                    {children}
                </div>
            </Transition>
        </Portal>
    );
}