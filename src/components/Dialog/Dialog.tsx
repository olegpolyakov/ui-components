import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';

import type { ComponentProps, Shadow, Slotted } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { type ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Modal from '../Modal';
import Slot from '../Slot';
import Transition from '../Transition';

import styles from './Dialog.module.scss';

export type DialogProps = {
    open?: boolean;
    title?: Slotted<HeadingProps>;
    content?: ReactNode;
    closeButton?: Slotted<ButtonProps>;
    closeButtonPosition?: 'inside' | 'outside';
    closeOnClickOutside?: boolean;
    disableScroll?: boolean;
    shadow?: Shadow;
    onClose: () => void;
};

Dialog.displayName = 'Dialog';

const elementClassNames = getElementClassNames(
    Dialog.displayName,
    ['surface', 'title', 'content', 'closeButton']
);

export default function Dialog({
    className,
    children,

    open,
    title,
    content = children,
    closeButton = { icon: 'close' },
    closeButtonPosition = 'inside',
    closeOnClickOutside = false,
    disableScroll,
    shadow = 'm',
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
        styles.root
    );

    return (
        <Modal
            open={open}
            disableScroll={disableScroll}
            backdrop
            fixed
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
                        className={cn(elementClassNames.surface, styles.surface, shadow && styles[`shadow-${shadow}`])} 
                        onClick={handleSurfaceClick}
                    >
                        {title &&
                            <Slot
                                fallback={Heading}
                                className={cn(elementClassNames.title, styles.title)}
                                size="s"
                            >
                                {title}
                            </Slot>
                        }

                        <div className={cn(elementClassNames.content, styles.content)}>
                            {content}
                        </div>

                        {closeButton && 
                            <Slot
                                fallback={Button}
                                className={cn(elementClassNames.closeButton, styles.closeButton, styles[`close-button-${closeButtonPosition}`])}
                                icon="close"
                                size="s"
                                variant={closeButtonPosition === 'inside' ? 'plain' : 'tinted'}
                                aria-label="Close dialog"
                                onClick={onClose}
                            />
                        }
                    </div>
                </Transition>
            </div>
        </Modal>
    );
}