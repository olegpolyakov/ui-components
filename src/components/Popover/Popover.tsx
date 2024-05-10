import {
    type HTMLAttributes,
    type MouseEvent as ReactMouseEvent,
    type ReactElement,
    type ReactNode,
    type RefAttributes,
    type SyntheticEvent,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import type { Placement, VirtualElement } from '@popperjs/core';
import { usePopper } from 'react-popper';

import type { Color, PropsWithChildren, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Portal from '../Portal';

import { arrowPosition } from './modifiers';
import cssClasses from './Popover.scss';

export type { VirtualElement };

export type PopoverProps = PropsWithChildren<{
    anchorElement?: HTMLElement | VirtualElement | null;
    containerElement?: HTMLElement;
    placement?: Placement;
    fallbackPlacements?: Placement[];
    trigger?: ReactElement<RefAttributes<HTMLElement> & HTMLAttributes<HTMLElement>>;
    content?: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    color?: Color;
    size?: Size;
    variant?: Variant;
    disabled?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onOpenChange?: (isOpen: boolean, event?: SyntheticEvent | KeyboardEvent | MouseEvent) => void;
}>;

const displayName = 'Popover';
const elementClassNames = getElementClassNames(displayName, ['surface', 'arrow', 'content']);

const Popover = ({
    containerElement,
    anchorElement,
    placement,
    fallbackPlacements,
    trigger,
    content,
    open,
    defaultOpen = false,
    color,
    size,
    variant = 'plain',
    onOpen,
    onClose,

    children = content,
    className
}: PopoverProps) => {
    const triggerRef = useRef<HTMLElement | VirtualElement | null | undefined>(anchorElement);
    const rootRef = useRef<HTMLDivElement>(null);
    const surfaceRef = useRef<HTMLDivElement>();

    const [triggerElement, setTriggerElement] = useState<HTMLElement | VirtualElement | null | undefined>(anchorElement);
    const [surfaceElement, setSurfaceElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const isUncontrolled = open === undefined;

    const { attributes, styles } = usePopper(triggerElement, surfaceElement, {
        placement,
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 8] }
            },
            {
                name: 'flip',
                options: { fallbackPlacements }
            },
            {
                name: 'arrow',
                options: { element: arrowElement }
            },
            arrowPosition
        ]
    });

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

        if (isUncontrolled)
            setInternalOpen(true);

        onOpen?.();

        function handleClick(event: MouseEvent) {
            const target = event.target as Node;
            const fromPopover = surfaceRef.current?.contains(target);

            if (fromPopover) return;

            if (isUncontrolled)
                setInternalOpen(false);

            onClose?.();
        }

        const root = rootRef.current;

        root?.addEventListener('click', handleClick);

        return () => {
            root?.removeEventListener('click', handleClick);
        };
    }, [open, internalOpen, isUncontrolled, onOpen, onClose]);

    const handleTriggerRef = useCallback((triggerElement: HTMLElement) => {
        triggerRef.current = triggerElement;
        setTriggerElement(triggerElement);
    }, []);

    const handleSurfaceRef = useCallback((menuElement: HTMLDivElement) => {
        surfaceRef.current = menuElement;
        setSurfaceElement(menuElement);
    }, []);

    const handleTriggerClick = useCallback(() => {
        if (isUncontrolled)
            setInternalOpen(true);

        onOpen?.();
    }, [isUncontrolled, onOpen]);

    const handlePopoverClick = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, []);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        size && cssClasses[size],
        variant && cssClasses[variant]
    );

    return (
        <>
            {isValidElement(trigger) &&
                cloneElement(trigger, {
                    ref: handleTriggerRef,
                    onClick: handleTriggerClick
                })
            }

            {(open || internalOpen) &&
                <Portal container={containerElement}>
                    <div ref={rootRef} className={classNames}>
                        <div
                            ref={handleSurfaceRef}
                            className={cn(elementClassNames.surface, cssClasses.surface)}
                            style={styles.popper}
                            {...attributes.popper}
                            onClick={handlePopoverClick}
                        >
                            <div
                                ref={setArrowElement}
                                className={cn(elementClassNames.arrow, cssClasses.arrow)}
                                style={styles.arrow}
                            />

                            <div className={cn(elementClassNames.content, cssClasses.content)}>
                                {children}
                            </div>
                        </div>
                    </div>
                </Portal>
            }
        </>
    );
};

Popover.displayName = displayName;

export default Popover;