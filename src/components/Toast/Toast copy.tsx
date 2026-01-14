import {
    KeyboardEvent,
    ReactNode,
    ReactElement,
    cloneElement,
    isValidElement,
    useCallback,
    useRef
} from 'react';

import { cn } from '../../component';
import { Key } from '../../constants';
import { useUpdated } from '../../hooks/lifecycle';
import type{ Color, ComponentProps, Shape, Variant } from '../../types';
import { getEventKey } from '../../utils';

import Button from '../Button';
import type { IconProps } from '../Icon';
import Item from '../Item';
import { Portal } from '../Portal';
import type { Slotted } from '../Slot';
import Transition from '../Transition';

import styles from './Toast.module.scss';

const DEFAULT_AUTO_DISMISS_TIMEOUT_MS = 5000;
const ANIMATION_OPEN_TIME_MS = Number.parseInt(styles.enterDuration);
const ANIMATION_CLOSE_TIME_MS = Number.parseInt(styles.exitDuration);

export type ToastProps = {
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    action?: ReactNode;
    dismissIcon?: Slotted<IconProps>;
    color?: Color;
    variant?: Variant;
    shape?: Shape;
    open?: boolean;
    dismissible?: boolean;
    closeOnEscape?: boolean;
    timeout?: number;
    onClose?: () => void;
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
    open,
    dismissible = true,
    closeOnEscape = true,
    timeout = DEFAULT_AUTO_DISMISS_TIMEOUT_MS,
    onClose,
    ...props
}: ComponentProps<ToastProps, 'div'>) {
    const rootRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | undefined>(undefined);

    useUpdated(() => {
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
    }, [open]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = getEventKey(event);

        if (closeOnEscape && key === Key.ESCAPE) {
            onClose?.();
        }
    }, [closeOnEscape, onClose]);

    const Root = as || 'div';
    const classNames = cn(
        className,
        { shape },
        styles
    );

    return (
        <Portal>
            <Transition
                nodeRef={rootRef}
                in={open}
                type="slide-bottom"
                timeout={{
                    appear: ANIMATION_OPEN_TIME_MS,
                    enter: ANIMATION_OPEN_TIME_MS,
                    exit: ANIMATION_CLOSE_TIME_MS
                }}
                mountOnEnter
                unmountOnExit
                onExited={onClose}
            >
                <Root
                    ref={rootRef}
                    className={classNames}
                    role="status"
                    aria-relevant="additions"
                >
                    <Item
                        icon={icon}
                        content={content}
                        end={<>
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

                        </>}
                        color={color}
                        variant={variant}
                        shape={shape}
                        onKeyDown={handleKeyDown}
                        {...props}
                    />
                </Root>
            </Transition>
        </Portal>
    );
}