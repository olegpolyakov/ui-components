import { ReactNode, ReactElement, forwardRef, useRef, useCallback, KeyboardEvent, isValidElement, cloneElement } from 'react';

import { useUpdated } from '../../hooks';
import { Props } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Layer from '../Layer';
import Button from '../Button';

import cssClasses from './Toast.scss';

const DEFAULT_AUTO_DISMISS_TIMEOUT_MS = 5000;
const ANIMATION_OPEN_TIME_MS = 150;
const ANIMATION_CLOSE_TIME_MS = 75;

export type ToastProps = Props<{
    as?: 'div';
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
}>;

const displayName = 'Toast';
const elementClassNames = getElementClassNames(displayName, []);

const Toast = forwardRef<HTMLDivElement, ToastProps>(({
    content,
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

    as: Tag = 'div',
    className,
    children = content,
    ...props
}, ref) => {
    const timeoutRef = useRef<number | undefined>();

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

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        leading && cssClasses.leading,
        stacked && cssClasses.stacked
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
                appear: cssClasses.opening,
                appearActive: cssClasses.open,
                enter: cssClasses.opening,
                enterActive: cssClasses.open,
                enterDone: cssClasses.open,
                exit: cssClasses.closing
            }}
            modal
            mountOnEnter
            unmountOnExit
        >
            <Tag
                ref={ref}
                className={classNames}
                onKeyDown={handleKeyDown}
                {...props}
            >
                <div
                    className={cssClasses.surface}
                    role="status"
                    aria-relevant="additions"
                >
                    <div className={cssClasses.content} aria-atomic="false">
                        {children}
                    </div>

                    <div className={cssClasses.actions} aria-atomic="true">
                        {isValidElement<Props>(action) &&
                            cloneElement(action, {
                                className: cssClasses.action
                            })
                        }

                        {dismissible && (isValidElement<Props>(dismissIcon) ?
                            cloneElement(dismissIcon, {
                                className: cssClasses.dismiss,
                                onClick: onClose
                            })
                            :
                            <Button
                                icon={dismissIcon}
                                className={cssClasses.dismiss}
                                onClick={onClose}
                            />
                        )}
                    </div>
                </div>
            </Tag>
        </Layer>
    );
});

Toast.displayName = displayName;

export default Toast;