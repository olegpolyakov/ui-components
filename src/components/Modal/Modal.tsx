import { useEffect, useRef } from 'react';

import type { PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Portal from '../Portal';

import cssClasses from './Modal.scss';

export type ModalProps = PropsWithChildren<{
    container?: HTMLElement;
    backdrop?: boolean;
    fixed?: boolean;
    open?: boolean;
    disableScroll?: boolean;
}>;

const displayName = 'Modal';
const elementClassNames = getElementClassNames(displayName);
const scrollDisabledClassName = 'ui-scroll-disabled';

const Modal = ({
    container = document.body,
    backdrop = false,
    fixed = false,
    disableScroll = true,

    className,
    children
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!disableScroll) return;

        document.body.classList.add(scrollDisabledClassName);

        return () => {
            document.body.classList.remove(scrollDisabledClassName);
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
        cssClasses.root,
        backdrop && cssClasses.backdrop,
        fixed && cssClasses.fixed,
    );

    return (
        <Portal container={container}>
            <div ref={modalRef} className={classNames}>
                {children}
            </div>
        </Portal>
    );
};

Modal.displayName = displayName;

export default Modal;