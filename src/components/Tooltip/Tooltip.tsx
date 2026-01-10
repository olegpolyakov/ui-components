import {
    type ComponentPropsWithRef,
    type MouseEvent,
    type MouseEventHandler,
    type ReactElement,
    type ReactNode,
    cloneElement,
    isValidElement,
    useCallback,
    useState,
    useRef
} from 'react';

import { Placement, Strategy, autoUpdate, arrow, flip, shift, useFloating } from '@floating-ui/react';

import type { ComponentProps } from '../../types';
import { cn } from '../../utils';

import styles from './Tooltip.module.scss';

export type TooltipProps = {
    content: ReactNode;
    arrow?: boolean;
    position?: Strategy;
    placement?: Placement;
};

Tooltip.displayName = 'Tooltip';

export default function Tooltip({
    className,
    children,

    content = children,
    position = 'fixed',
    placement = 'bottom',
    arrow: showArrow = true
}: ComponentProps<TooltipProps, 'div'>) {
    const arrowRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const {refs, floatingStyles, middlewareData} = useFloating({
        strategy: position,
        placement,
        whileElementsMounted: autoUpdate,
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            flip(),
            shift(),
            showArrow && arrow({
                element: arrowRef,
                padding: -8
            })
        ].filter(Boolean)
    });

    const handleMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        setIsOpen(true);

        if (isValidElement<{onMouseEnter: MouseEventHandler<HTMLDivElement>}>(children)) {
            children.props?.onMouseEnter(event);
        }
    }, [children]);

    const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        setIsOpen(false);

        if (isValidElement<{onMouseLeave: MouseEventHandler<HTMLDivElement>}>(children)) {
            children.props?.onMouseLeave(event);
        }
    }, [children]);

    const handleMouseEnterTooltip = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setIsOpen(true);
    }, []);

    const handleMouseLeaveTooltip = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setIsOpen(false);
    }, []);

    const classNames = cn(
        className,
        styles.root
    );

    return (
        <>
            {isValidElement(children) ?
                cloneElement(children as ReactElement<ComponentPropsWithRef<'div'>>, {
                    ref: refs.setReference,
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave
                })
                :
                <div
                    ref={refs.setReference}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </div>
            }

            {isOpen &&
              <div
                  ref={refs.setFloating}
                  className={classNames}
                  style={floatingStyles}
                  onMouseEnter={handleMouseEnterTooltip}
                  onMouseLeave={handleMouseLeaveTooltip}
              >
                  <div
                      ref={arrowRef}
                      className={styles.arrow}
                      style={middlewareData.arrow && {
                        left: middlewareData.arrow.x,
                        top: middlewareData.arrow.y
                    }}
                  />

                  {content}
              </div>
            }
        </>
    );
}