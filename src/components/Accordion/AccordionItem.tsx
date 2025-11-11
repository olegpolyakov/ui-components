import { ReactElement, ReactNode, useState, useCallback, useRef } from 'react';

import type { Size,  ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';
import Transition from '../Transition';

import cssClasses from './AccordionItem.module.scss';

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

AccordionItem.displayName = 'AccordionItem';

const elementClassNames = getElementClassNames(
    AccordionItem.displayName,
    ['header', 'icon', 'indicatorIcon', 'openIcon', 'closeIcon', 'content']
);

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

    const handleClick = useCallback(() => {
        setOpen(v => !v);
    }, []);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        size && cssClasses[size],
        open && cssClasses.open,
        disabled && cssClasses.disabled
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            <div
                className={cn(elementClassNames.header, cssClasses.header)}
                onClick={!disabled ? handleClick : undefined}
            >
                {icon &&
                    <Icon className={cn(elementClassNames.icon, cssClasses.icon)}>
                        {icon}
                    </Icon>
                }

                {header}

                {!openIcon && !closeIcon && indicatorIcon &&
                    <Icon className={cn(elementClassNames.indicatorIcon, cssClasses.indicatorIcon)}>
                        {indicatorIcon}
                    </Icon>
                }

                {openIcon &&
                    <Icon className={cn(elementClassNames.openIcon, elementClassNames.indicatorIcon, cssClasses.indicatorIcon)}>
                        {openIcon}
                    </Icon>
                }

                {closeIcon &&
                    <Icon className={cn(elementClassNames.closeIcon, elementClassNames.indicatorIcon, cssClasses.indicatorIcon)}>
                        {closeIcon}
                    </Icon>
                }
            </div>

            <Transition
                className={cn(elementClassNames.content, cssClasses.content)}
                nodeRef={contentRef}
                in={open}
                timeout={200}
                type="collapse"
            >
                <div ref={contentRef}>
                    {content}
                </div>
            </Transition>
        </Component>
    );
}