import { forwardRef, useState, type ReactElement, type ReactNode, useCallback } from 'react';

import { Props, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import cssClasses from './AccordionItem.scss';

export type AccordionItemProps = Props<{
    as?: 'div';
    header?: ReactNode;
    content?: ReactNode;
    icon?: string | ReactElement;
    indicatorIcon?: string | ReactElement;
    openIcon?: string | ReactElement;
    closeIcon?: string | ReactElement;
    size?: Size;
    open?: boolean;
    disabled?: boolean;
}>;

const displayName = 'AccordionItem';
const elementClassNames = getElementClassNames(displayName, [
    'header', 'icon', 'indicatorIcon', 'openIcon', 'closeIcon', 'content'
]);

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(({
    header,
    content,
    icon,
    indicatorIcon = 'expand_more',
    openIcon,
    closeIcon,
    size,
    open: _open = false,
    disabled,

    as: Tag = 'div',
    className,
    children = content,
    ...props
}, ref) => {
    const [open, setOpen] = useState(_open);

    const handleClick = useCallback(() => {
        setOpen(v => !v);
    }, []);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        size && cssClasses[size],
        open && cssClasses.open,
        disabled && cssClasses.disabled
    );

    return (
        <Tag
            ref={ref}
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

            <div className={cn(elementClassNames.content, cssClasses.content)}>
                <div>
                    {children}
                </div>
            </div>
        </Tag>
    );
});

AccordionItem.displayName = displayName;

export default AccordionItem;