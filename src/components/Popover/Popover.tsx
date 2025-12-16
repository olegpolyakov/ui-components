import {
    type HTMLAttributes,
    type MouseEvent as ReactMouseEvent,
    type ReactElement,
    type ReactNode,
    type RefAttributes,
    type RefObject,
    type SyntheticEvent,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';

import { Middleware, Placement, VirtualElement, autoUpdate, arrow, useFloating } from '@floating-ui/react';

import type { Color, PropsWithChildren, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Portal from '../Portal';

import styles from './Popover.module.scss';

export type { Placement, VirtualElement };

export type PopoverProps = PropsWithChildren<{
    containerElement?: HTMLElement;
    anchorRef?: RefObject<Element | null>;
    anchorElement?: Element | null;
    placement?: Placement;
    fallbackPlacements?: Placement[];
    trigger?: ReactElement<RefAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & {active?: boolean}>;
    content?: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    arrow?: boolean;
    color?: Color;
    size?: Size;
    variant?: Variant;
    disabled?: boolean;
    middleware?: Middleware[];
    unstyled?: boolean;
    onOpen?: (placement: Placement) => void;
    onClose?: () => void;
    onOpenChange?: (isOpen: boolean, event?: SyntheticEvent | KeyboardEvent | MouseEvent) => void;
}>;

Popover.displayName = 'Popover';

const elementClassNames = getElementClassNames(
    Popover.displayName,
    ['surface', 'arrow', 'content']
);

export default function Popover({
    children,
    className,

    trigger,
    content = children,
    containerElement,
    anchorRef,
    anchorElement = anchorRef?.current,
    placement,
    fallbackPlacements,
    open,
    defaultOpen = false,
    arrow: showArrow = true,
    color,
    size,
    variant = 'filled',
    middleware = [],
    unstyled,
    onOpen,
    onClose
}: PopoverProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const surfaceRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const {refs, placement: internalPlacement, floatingStyles, middlewareData} = useFloating({
        placement,
        open: internalOpen,
        onOpenChange: setInternalOpen,
        elements: anchorElement ? {
            reference: anchorElement,
            floating: surfaceRef.current
        } : undefined,
        middleware: [
            showArrow && arrow({
                element: arrowRef
            }),
            ...middleware
        ].filter(Boolean),
        whileElementsMounted: autoUpdate
    });

    const isUncontrolled = open === undefined;

    useLayoutEffect(() => {
        if (!open && !internalOpen) return;

        if (document.body.style.overflow === 'hidden') return;

        const bodyWidthBefore = document.body.clientWidth;

        document.body.style.overflow = 'hidden';

        const bodyWidthAfter = document.body.clientWidth;

        if (bodyWidthBefore !== bodyWidthAfter) {
            document.body.style.marginRight = Math.abs(bodyWidthAfter - bodyWidthBefore) + 'px';
        }

        return () => {
            document.body.removeAttribute('style');
        };
    }, [open, internalOpen]);

    useEffect(() => {
        if (!open && !internalOpen) return;

        if (isUncontrolled) {
            setInternalOpen(true);
        }

        onOpen?.(internalPlacement);

        function handleClick(event: MouseEvent) {
            const target = event.target as Node;
            const fromPopover = contentRef.current?.contains(target);

            if (fromPopover) return;

            if (isUncontrolled) {
                setInternalOpen(false);
            }

            onClose?.();
        }

        const root = rootRef.current;

        root?.addEventListener('click', handleClick);

        return () => {
            root?.removeEventListener('click', handleClick);
        };
    }, [open, internalOpen, internalPlacement, isUncontrolled, onOpen, onClose]);

    const handleTriggerClick = useCallback(() => {
        if (isUncontrolled) {
            setInternalOpen(true);
        }

        onOpen?.(internalPlacement);
    }, [isUncontrolled, internalPlacement, onOpen]);

    const handlePopoverClick = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, []);

    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        unstyled && styles.unstyled
    );

    const surfaceClassNames = cn(
        elementClassNames.surface,
        styles.surface,
        variant && styles[variant],
        color && styles[color],
        size && styles[size],
    );

    return (
        <>
            {isValidElement(trigger) &&
                cloneElement(trigger, {
                    ref: refs.setReference,
                    active: open || internalOpen,
                    onClick: handleTriggerClick
                })
            }

            {(open || internalOpen) &&
                <Portal container={containerElement}>
                    <div ref={rootRef} className={classNames}>
                        <div
                            ref={refs.setFloating}
                            className={surfaceClassNames}
                            style={floatingStyles}
                            onClick={handlePopoverClick}
                        >
                            {unstyled || !showArrow &&
                                <div
                                    ref={arrowRef}
                                    className={cn(elementClassNames.arrow, styles.arrow)}
                                    style={middlewareData.arrow &&{
                                        left: middlewareData.arrow.x,
                                        top: middlewareData.arrow.y
                                    }}
                                />
                            }

                            <div ref={contentRef} className={cn(elementClassNames.content, styles.content)}>
                                {content}
                            </div>
                        </div>
                    </div>
                </Portal>
            }
        </>
    );
};