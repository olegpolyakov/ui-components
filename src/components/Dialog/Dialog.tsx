import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';

import type { ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button from '../Button';
import Modal from '../Modal';

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
    const overlayRef = useRef<HTMLDivElement>(null);

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

    if (!open) return null;

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <Modal disableScroll={disableScroll}>
            <div
                className={classNames}
                role="dialog"
                {...props}
            >
                <div
                    ref={overlayRef}
                    className={cn(elementClassNames.overlay, cssClasses.overlay)}
                    tabIndex={-1}
                    onClick={handleOverlayClick}
                >
                    <div className={cn(elementClassNames.surface, cssClasses.surface)} onClick={handleSurfaceClick}>
                        {title &&
                            <h2 className={cn(elementClassNames.title, cssClasses.title)}>{title}</h2>
                        }

                        <div className={cn(elementClassNames.content, cssClasses.content)}>{content}</div>

                        {closeButton &&
                            <Button
                                className={cn(elementClassNames.closeButton, cssClasses.closeButton)}
                                type="button"
                                icon="close"
                                size="s"
                                aria-label="Close modal"
                                onClick={onClose}
                            />
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}