import { useEffect, useRef } from 'react';

import type { PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Portal from '../Portal';

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

    container = document.body,
    backdrop = false,
    fixed = false,
    disableScroll = true
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!disableScroll) return;

        document.body.classList.add(styles.scrollDisabled);

        return () => {
            document.body.classList.remove(styles.scrollDisabled);
        };
    }, [disableScroll]);

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
        <Portal container={container}>
            <div ref={modalRef} className={classNames}>
                {children}
            </div>
        </Portal>
    );
}