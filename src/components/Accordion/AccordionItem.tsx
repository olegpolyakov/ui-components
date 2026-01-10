import { ReactNode, useState, useRef, useEffect, useLayoutEffect } from 'react';

import { cn } from '../../component';
import type { Size,  ComponentProps, ElementType, Slotted, Variant } from '../../types';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './AccordionItem.module.scss';

export type AccordionItemProps = {
    header?: ReactNode;
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    indicatorIcon?: Slotted<IconProps>;
    openIcon?: Slotted<IconProps>;
    closeIcon?: Slotted<IconProps>;
    size?: Size;
    variant?: Variant;
    open?: boolean;
    disabled?: boolean;
};

AccordionItem.displayName = 'AccordionItem';

export default function AccordionItem<T extends ElementType = 'div'>({
    as,
    className,
    children,

    header,
    content = children,
    icon,
    indicatorIcon = 'expand_more',
    openIcon,
    closeIcon,
    size,
    variant = 'plain',
    open: initialOpen = false,
    disabled,
    ...props
}: ComponentProps<AccordionItemProps, T>) {
    const contentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(initialOpen);

    const heightRef = useRef(0);

    useLayoutEffect(() => {
        if (!contentRef.current) return;

        heightRef.current = contentRef.current.clientHeight || 0;
    }, []);

    useEffect(() => {
        if (!contentRef.current) return;

        contentRef.current.style.height = open ? `${heightRef.current}px` : '0px';
    }, [open]);

    const handleClick = () => {
        setOpen(v => !v);
    };

    const Root = as || 'div';
    const rootClassNames = cn(className, {
        size,
        open
    }, styles);
    const headerClassNames = cn(styles.header, {
        root: false,
        variant,
        active: open,
        disabled
    }, styles);

    return (
        <Root
            className={rootClassNames}
            data-open={open ? true : undefined}
            data-disabled={disabled ? true : undefined}
            {...props}
        >
            <div
                className={headerClassNames}
                onClick={!disabled ? handleClick : undefined}
            >
                {icon &&
                    <Slot
                        fallback={Icon}
                        className={styles.icon}
                        size={size}
                    >
                        {icon}
                    </Slot>
                }

                {header}

                {!openIcon && !closeIcon && indicatorIcon &&
                    <Slot
                        fallback={Icon}
                        className={styles.indicatorIcon}
                        size={size}
                        color="tertiary"
                    >
                        {indicatorIcon}
                    </Slot>
                }

                {open && openIcon &&
                    <Slot
                        fallback={Icon}
                        className={styles.indicatorIcon}
                        size={size}
                        color="tertiary"
                    >
                        {openIcon}
                    </Slot>
                }

                {!open && closeIcon &&
                    <Slot
                        fallback={Icon}
                        className={styles.indicatorIcon}
                        size={size}
                        color="tertiary"
                    >
                        {closeIcon}
                    </Slot>
                }
            </div>

            <div
                ref={contentRef}
                className={styles.content}
            >
                {content}
            </div>
        </Root>
    );
}