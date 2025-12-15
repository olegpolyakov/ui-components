import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';

import type { ComponentProps, Slotted } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { type ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Modal from '../Modal';
import Slot from '../Slot';
import Transition from '../Transition';

import cssClasses from './Dialog.module.scss';

export type DialogProps = {
    title?: Slotted<HeadingProps>;
    content?: ReactNode;
    closeButton?: Slotted<ButtonProps>;
    open?: boolean;
    noCloseButton?: boolean;
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
    closeButton,
    open,
    noCloseButton,
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

    const handleRootClick = useCallback(() => {
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
        <Modal
            open={open}
            backdrop
            fixed
            disableScroll={disableScroll}
        >
            <div
                className={classNames}
                role="dialog"
                data-open={open ? true : undefined}
                tabIndex={-1}
                onClick={handleRootClick}
                {...props}
            >
                <Transition
                    nodeRef={surfaceRef}
                    in={open}
                    type="scale"
                    timeout={200}
                    appear
                    onExited={onClose}
                >
                    <div
                        ref={surfaceRef}
                        className={cn(elementClassNames.surface, cssClasses.surface)} 
                        onClick={handleSurfaceClick}
                    >
                        {title &&
                            <Slot
                                fallback={Heading}
                                className={cn(elementClassNames.title, cssClasses.title)}
                                size="s"
                            >
                                {title}
                            </Slot>
                        }

                        <div className={cn(elementClassNames.content, cssClasses.content)}>
                            {content}
                        </div>

                        {!noCloseButton && 
                            <Slot
                                fallback={Button}
                                className={cn(elementClassNames.closeButton, cssClasses.closeButton)}
                                icon="close"
                                size="s"
                                aria-label="Close dialog"
                                onClick={onClose}
                            >
                                {closeButton}
                            </Slot>
                        }
                    </div>
                </Transition>
            </div>
        </Modal>
    );
}