import { ReactNode, useState, useRef, useEffect, useLayoutEffect } from 'react';

import type { Size,  ComponentProps, ElementType, Slotted } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './AccordionItem.module.scss';

AccordionItem.displayName = 'AccordionItem';

const elementClassNames = getElementClassNames(
    AccordionItem.displayName,
    ['header', 'icon', 'indicatorIcon', 'openIcon', 'closeIcon', 'content']
);

export type AccordionItemProps = {
    header?: ReactNode;
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    indicatorIcon?: Slotted<IconProps>;
    openIcon?: Slotted<IconProps>;
    closeIcon?: Slotted<IconProps>;
    size?: Size;
    open?: boolean;
    disabled?: boolean;
};

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
        elementClassNames.root,
        styles.root,
        size && styles[size],
        open && styles.open,
        disabled && styles.disabled
    );

    return (
        <Root
            className={classNames}
            {...props}
        >
            <div
                className={cn(elementClassNames.header, styles.header)}
                onClick={!disabled ? handleClick : undefined}
            >
                {icon &&
                    <Slot
                        fallback={Icon}
                        className={cn(elementClassNames.icon, styles.icon)}
                        size={size}
                    >
                        {icon}
                    </Slot>
                }

                {header}

                {!openIcon && !closeIcon && indicatorIcon &&
                    <Slot
                        fallback={Icon}
                        className={cn(elementClassNames.indicatorIcon, styles.indicatorIcon)}
                        size={size}
                    >
                        {indicatorIcon}
                    </Slot>
                }

                {open && openIcon &&
                    <Slot
                        fallback={Icon}
                        className={cn(elementClassNames.openIcon, elementClassNames.indicatorIcon, styles.indicatorIcon)}
                        size={size}
                    >
                        {openIcon}
                    </Slot>
                }

                {!open && closeIcon &&
                    <Slot
                        fallback={Icon}
                        className={cn(elementClassNames.closeIcon, elementClassNames.indicatorIcon, styles.indicatorIcon)}
                        size={size}
                    >
                        {closeIcon}
                    </Slot>
                }
            </div>

            <div
                ref={contentRef}
                className={cn(elementClassNames.content, styles.content)}
            >
                {content}
            </div>
        </Root>
    );
}