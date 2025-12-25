import { ReactNode, useState, useRef, useEffect, useLayoutEffect } from 'react';

import { ccn } from '../../component';
import type { Size,  ComponentProps, ElementType, Slotted, Variant } from '../../types';
import { classnames as cn } from '../../utils';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import baseStyles from '../../styles/classes.module.scss';
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
    const classNames = cn(
        className,
        styles.root,
        open && styles.open
    );
    const headerClassNames = cn(
        styles.header,
        ccn({
            size,
            variant,
            active: open,
            disabled
        }, baseStyles, styles)
    );

    return (
        <Root
            className={classNames}
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
                    >
                        {indicatorIcon}
                    </Slot>
                }

                {open && openIcon &&
                    <Slot
                        fallback={Icon}
                        className={styles.indicatorIcon}
                        size={size}
                    >
                        {openIcon}
                    </Slot>
                }

                {!open && closeIcon &&
                    <Slot
                        fallback={Icon}
                        className={styles.indicatorIcon}
                        size={size}
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