import { ForwardRefExoticComponent, forwardRef, useCallback, useState } from 'react';

import type { HTMLDivProps, PropsWithChildren, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames, noop } from '../../utils';

import Divider from '../Divider';
import Heading from '../Heading';
import Icon from '../Icon';
import Popover, { type PopoverProps } from '../Popover';

import MenuItem, { type MenuItemProps } from './MenuItem';
import cssClasses from './Menu.module.scss';

export type MenuProps = PropsWithChildren<PopoverProps & {
    items?: PropsWithKey<MenuItemProps>[];
    defaultOpen?: boolean;
    size?: Size;
}, HTMLDivProps>;

const displayName = 'Menu';
const elementClassNames = getElementClassNames(displayName);

const Menu: ForwardRefExoticComponent<MenuProps> & {
    Item?: typeof MenuItem;
} = forwardRef<HTMLDivElement, MenuProps>(({
    items,
    defaultOpen = false,
    size = 'medium',
    onOpen = noop,
    onClose = noop,
    onOpenChange = noop,

    children,
    className,
    ...props
}, ref) => {
    const [isOpen, setOpen] = useState<boolean>(defaultOpen);

    // @ts-ignore
    const handleItemClick = useCallback((item, event) => {
        if (typeof item?.onClick === 'function') {
            item?.onClick(event);
        }

        if (item.items) return;

        setOpen(false);
        onClose();
        onOpenChange(false, event);
    }, [onOpenChange, onClose]);

    const handlePopoverOpen = useCallback(() => {
        setOpen(true);
        onOpen();
    }, [onOpen]);

    const handlePopoverClose = useCallback(() => {
        setOpen(false);
        onClose();
    }, [onClose]);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size]
    );

    return (
        <Popover
            open={isOpen}
            onOpen={handlePopoverOpen}
            onClose={handlePopoverClose}
            {...props}
        >
            <div ref={ref} className={classNames}>
                {items?.map(item => {
                    if (item.type === 'divider') {
                        return (
                            <Divider key={item.key} />
                        );
                    } else if (item.type === 'heading') {
                        return (
                            <Heading
                                key={item.key}
                                content={item.content}
                                type="h5"
                                muted
                            />
                        );
                    } else if (item.items) {
                        return (
                            <Menu
                                key={item.key}
                                placement="right-start"
                                trigger={
                                    <MenuItem
                                        {...item}
                                        items={undefined}
                                        end={
                                            <Icon
                                                name="chevron_right"
                                                size="xs"
                                            />
                                        }
                                    />
                                }
                                items={item.items}
                                disabled={item.disabled}
                                onClose={handlePopoverClose}
                            />
                        );
                    } else {
                        return (
                            <MenuItem
                                key={item.key}
                                {...item}
                                onClick={event => handleItemClick(item, event)}
                            />
                        );
                    }
                })}

                {children}
            </div>
        </Popover>
    );
});

Menu.displayName = displayName;

Menu.Item = MenuItem;

export default Menu;