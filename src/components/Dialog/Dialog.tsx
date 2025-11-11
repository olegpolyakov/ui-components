import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';

import type { ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button from '../Button';
import Modal from '../Modal';
import Transition from '../Transition';

import cssClasses from './Dialog.module.scss';

export type DialogProps = {
    title?: ReactNode;
    content?: ReactNode;
    open?: boolean;
    closeButton?: boolean;
    closeOnClickOutside?: boolean;
    disableScroll?: boolean;
    onClose: () => void;
};

Dialog.displayName = 'Dialog';

const elementClassNames = getElementClassNames(
    Dialog.displayName,
    ['overlay', 'surface', 'title', 'content', 'closeButton']
);

export default function Dialog({
    className,
    children,

    title,
    content = children,
    open,
    closeButton = true,
    closeOnClickOutside = false,
    disableScroll,
    onClose,
    ...props
}: ComponentProps<DialogProps, 'div'>) {
    const surfaceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = useCallback(() => {
        if (closeOnClickOutside) {
            onClose();
        }
    }, [closeOnClickOutside, onClose]);

    const handleSurfaceClick = useCallback((event: MouseEvent) => {
        if (closeOnClickOutside) {
            event.stopPropagation();
        }
    }, [closeOnClickOutside]);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <Modal open={open} disableScroll={disableScroll}>
            <div
                className={classNames}
                role="dialog"
                {...props}
            >
                <div
                    className={cn(elementClassNames.overlay, cssClasses.overlay)}
                    tabIndex={-1}
                    onClick={handleOverlayClick}
                >
                    <Transition
                        className={cn(elementClassNames.surface, cssClasses.surface)} 
                        nodeRef={surfaceRef}
                        in={open}
                        type="scale"
                        timeout={200}
                        appear
                        onExited={onClose}
                    >
                        <div
                            ref={surfaceRef}
                            onClick={handleSurfaceClick}
                        >
                            {title &&
                                <h2 className={cn(elementClassNames.title, cssClasses.title)}>{title}</h2>
                            }

                            <div className={cn(elementClassNames.content, cssClasses.content)}>
                                {content}
                            </div>

                            {closeButton &&
                                <Button
                                    className={cn(elementClassNames.closeButton, cssClasses.closeButton)}
                                    icon="close"
                                    size="s"
                                    aria-label="Close modal"
                                    onClick={onClose}
                                />
                            }
                        </div>
                    </Transition>
                </div>
            </div>
        </Modal>
    );
}