import { ReactElement, ReactNode, useState, useRef } from 'react';

import type { Size,  ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';
import Transition from '../Transition';

import styles from './AccordionItem.module.scss';

AccordionItem.displayName = 'AccordionItem';

const elementClassNames = getElementClassNames(
    AccordionItem.displayName,
    ['header', 'icon', 'indicatorIcon', 'openIcon', 'closeIcon', 'content']
);

export type AccordionItemProps = {
    header?: ReactNode;
    content?: ReactNode;
    icon?: string | ReactElement;
    indicatorIcon?: string | ReactElement;
    openIcon?: string | ReactElement;
    closeIcon?: string | ReactElement;
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

    const handleClick = () => {
        setOpen(v => !v);
    };

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        size && styles[size],
        open && styles.open,
        disabled && styles.disabled
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            <div
                className={cn(elementClassNames.header, styles.header)}
                onClick={!disabled ? handleClick : undefined}
            >
                {icon &&
                    <Icon className={cn(elementClassNames.icon, styles.icon)}>
                        {icon}
                    </Icon>
                }

                {header}

                {!openIcon && !closeIcon && indicatorIcon &&
                    <Icon className={cn(elementClassNames.indicatorIcon, styles.indicatorIcon)}>
                        {indicatorIcon}
                    </Icon>
                }

                {openIcon &&
                    <Icon className={cn(elementClassNames.openIcon, elementClassNames.indicatorIcon, styles.indicatorIcon)}>
                        {openIcon}
                    </Icon>
                }

                {closeIcon &&
                    <Icon className={cn(elementClassNames.closeIcon, elementClassNames.indicatorIcon, styles.indicatorIcon)}>
                        {closeIcon}
                    </Icon>
                }
            </div>

            <Transition
                nodeRef={contentRef}
                in={open}
                timeout={200}
                type="collapse"
            >
                <div
                    ref={contentRef}
                    className={cn(elementClassNames.content, styles.content)}
                >
                    {content}
                </div>
            </Transition>
        </Component>
    );
}