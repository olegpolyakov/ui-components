import {
    KeyboardEvent,
    ReactNode,
    ReactElement,
    cloneElement,
    isValidElement,
    useCallback,
    useRef
} from 'react';

import { useUpdated } from '../../hooks/lifecycle';
import type{ ComponentProps, Props } from '../../types';
import { cn } from '../../utils';

import Layer from '../Layer';
import Button from '../Button';

import styles from './Toast.module.scss';

const DEFAULT_AUTO_DISMISS_TIMEOUT_MS = 5000;
const ANIMATION_OPEN_TIME_MS = Number.parseInt(styles.enterDuration);
const ANIMATION_CLOSE_TIME_MS = Number.parseInt(styles.exitDuration);

export type ToastProps = {
    content?: ReactNode;
    action?: ReactNode;
    dismissIcon?: string | ReactElement;
    open?: boolean;
    appear?: boolean;
    leading?: boolean;
    stacked?: boolean;
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
    action,
    dismissIcon = 'close',
    open,
    appear,
    leading,
    stacked,
    dismissible = true,
    closeOnEscape = true,
    timeout = DEFAULT_AUTO_DISMISS_TIMEOUT_MS,
    onClose,
    ...props
}: ComponentProps<ToastProps, 'div'>) {
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
        if (closeOnEscape && event.key === 'Escape' || event.keyCode === 27) {
            onClose?.();
        }
    }, [closeOnEscape, onClose]);

    const Root = as || 'div';
    const classNames = cn(
        className,
        styles.root,
        leading && styles.leading,
        stacked && styles.stacked
    );

    return (
        <Layer
            in={open}
            appear={appear}
            timeout={{
                enter: ANIMATION_OPEN_TIME_MS,
                exit: ANIMATION_CLOSE_TIME_MS
            }}
            classNames={{
                appear: styles.opening,
                appearActive: styles.open,
                enter: styles.opening,
                enterActive: styles.open,
                enterDone: styles.open,
                exit: styles.closing
            }}
            modal
            mountOnEnter
            unmountOnExit
        >
            <Root
                className={classNames}
                onKeyDown={handleKeyDown}
                {...props}
            >
                <div
                    className={styles.surface}
                    role="status"
                    aria-relevant="additions"
                >
                    <div className={styles.content} aria-atomic="false">
                        {content}
                    </div>

                    <div className={styles.actions} aria-atomic="true">
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
                                onClick={onClose}
                            />
                        )}
                    </div>
                </div>
            </Root>
        </Layer>
    );
}