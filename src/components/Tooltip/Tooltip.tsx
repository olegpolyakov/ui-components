import {
    type MouseEvent,
    type ReactElement,
    cloneElement,
    isValidElement,
    forwardRef,
    useCallback,
    useState
} from 'react';
import type { PositioningStrategy, Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';

import type { HTMLSpanProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Tooltip.module.scss';

export type TooltipProps = PropsWithChildren<{
    content: string;
    position?: PositioningStrategy | undefined;
    placement?: Placement;
}, HTMLSpanProps>;

const displayName = 'Tooltip';
const elementClassNames = getElementClassNames(displayName, ['arrow']);

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
    content,
    position = 'absolute',
    placement = 'bottom',

    className,
    children
}, ref) => {
    const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>();
    const [tooltipElement, setTooltipElement] = useState<HTMLDivElement>();
    const [arrowElement, setArrowElement] = useState<HTMLDivElement>();
    const [isOpen, setIsOpen] = useState(false);

    const { styles, attributes } = usePopper(anchorElement, tooltipElement, {
        strategy: position,
        placement,
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 8] }
            },
            {
                name: 'arrow',
                options: {
                    element: arrowElement
                }
            }
        ]
    });

    const handleAnchorRef = useCallback((node: HTMLDivElement) => {
        setAnchorElement(node);
    }, []);

    const handlePopperRef = useCallback((node: HTMLDivElement) => {
        setTooltipElement(node);
    }, []);

    const handleArrowRef = useCallback((node: HTMLDivElement) => {
        setArrowElement(node);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsOpen(true);

        if (isValidElement(children) && children.props?.onMouseEnter) {
            children.props?.onMouseEnter();
        }
    }, [children]);

    const handleMouseLeave = useCallback(() => {
        setIsOpen(false);

        if (isValidElement(children) && children.props?.onMouseLeave) {
            children.props?.onMouseLeave();
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
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <>
            {isValidElement(children) ?
                cloneElement(children as ReactElement, {
                    ref: handleAnchorRef,
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave
                })
                :
                <div
                    ref={handleAnchorRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </div>
            }

            {isOpen &&
              <div
                  ref={handlePopperRef}
                  className={classNames}
                  style={styles.popper}
                  onMouseEnter={handleMouseEnterTooltip}
                  onMouseLeave={handleMouseLeaveTooltip}
                  {...attributes.popper}
              >
                  <div
                      ref={handleArrowRef}
                      className={cn(elementClassNames.arrow, cssClasses.arrow)}
                      style={styles.arrow}
                  />

                  {content}
              </div>
            }
        </>
    );
});

Tooltip.displayName = displayName;

export default Tooltip;