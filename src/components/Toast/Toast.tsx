import {
    Fragment,
    KeyboardEvent,
    ReactNode,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useRef
} from 'react';

import { cn } from '../../component';
import { Key } from '../../constants';
import type{ PaletteColor, ComponentProps, Shape, Variant } from '../../types';
import { getEventKey } from '../../utils';

import Button from '../Button';
import type { IconProps } from '../Icon';
import Item from '../Item';
import { Portal } from '../Portal';
import type { Slotted } from '../Slot';
import Transition from '../Transition';

import { useToastsContext } from './ToastsContext';
import styles from './Toast.module.scss';

const DEFAULT_AUTO_DISMISS_TIMEOUT_MS = 5000;
const ANIMATION_OPEN_TIME_MS = Number.parseInt(styles.enterDuration);
const ANIMATION_CLOSE_TIME_MS = Number.parseInt(styles.exitDuration);

export type ToastProps = {
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    action?: ReactNode;
    dismissIcon?: Slotted<IconProps>;
    color?: PaletteColor;
    variant?: Variant;
    shape?: Shape;
    appear?: boolean;
    open?: boolean;
    dismissible?: boolean;
    closeOnEscape?: boolean;
    timeout?: number;
    onClose?: () => void;
    onClosed?: () => void;
};

Toast.displayName = 'Toast';

export default function Toast({
    as,
    className,
    children,
    
    content = children,
    icon,
    action,
    dismissIcon = 'close',
    color,
    variant,
    shape,
    appear,
    open,
    dismissible = true,
    closeOnEscape = true,
    timeout = DEFAULT_AUTO_DISMISS_TIMEOUT_MS,
    onClose,
    onClosed,
    ...props
}: ComponentProps<ToastProps, 'div'>) {
    const { container } = useToastsContext();

    const rootRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (open) {
            timeoutRef.current = window.setTimeout(() => {
                timeoutRef.current = undefined;
                onClose?.();
            }, timeout);
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = undefined;
            }
        }

        return () => clearTimeout(timeoutRef.current);
    }, [open, timeout, onClose]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = getEventKey(event);

        if (closeOnEscape && key === Key.ESCAPE) {
            onClose?.();
        }
    }, [closeOnEscape, onClose]);

    const Root = as || 'div';
    const classNames = cn(
        className,
        { 
            shape,
            container: !container
        },
        styles
    );

    return (
        <Portal container={container}>
            <Transition
                nodeRef={rootRef}
                in={open}
                appear={appear}
                type="slide-bottom"
                timeout={{
                    appear: ANIMATION_OPEN_TIME_MS,
                    enter: ANIMATION_OPEN_TIME_MS,
                    exit: ANIMATION_CLOSE_TIME_MS
                }}
                mountOnEnter
                unmountOnExit
                onExited={onClosed}
            >
                <Root
                    ref={rootRef}
                    className={classNames}
                    role="status"
                    aria-relevant="additions"
                    onKeyDown={handleKeyDown}
                    {...props}
                >
                    <Item
                        icon={icon}
                        content={content}
                        end={
                            <Fragment>
                                {isValidElement<{className: string}>(action) &&
                                    cloneElement(action, {
                                        className: styles.action
                                    })
                                }

                                {dismissible && (isValidElement<{className: string, onClick: () => void}>(dismissIcon) ?
                                    cloneElement(dismissIcon, {
                                        className: styles.dismiss,
                                        onClick: onClose
                                    })
                                    :
                                    <Button
                                        icon={dismissIcon}
                                        className={styles.dismiss}
                                        size="s"
                                        onClick={onClose}
                                    />
                                )}

                            </Fragment>
                        }
                        color={color}
                        // @ts-expect-error TODO pass correct type
                        variant={variant}
                        shape={shape}
                    />
                </Root>
            </Transition>
        </Portal>
    );
}