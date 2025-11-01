import { MouseEvent, useCallback, useState } from 'react';

import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames, noop } from '../../utils';

import Divider from '../Divider';
import Heading from '../Heading';
import Icon from '../Icon';
import Popover, { type PopoverProps } from '../Popover';

import MenuItem, { type MenuItemProps } from './MenuItem';

import styles from './Menu.module.scss';

export type MenuProps = PopoverProps & {
    items?: PropsWithKey<MenuItemProps>[];
    defaultOpen?: boolean;
    size?: Size;
};

Menu.displayName = 'Menu';
Menu.Item = MenuItem;

const elementClassNames = getElementClassNames(Menu.displayName);

export default function Menu<T extends ElementType = 'div'>({
    as,
    children,
    className,

    items,
    defaultOpen = false,
    size = 'm',
    onOpen = noop,
    onClose = noop,
    onOpenChange = noop,
    ...props
}: ComponentProps<MenuProps, T>) {
    const [isOpen, setOpen] = useState<boolean>(defaultOpen);

    const handleItemClick = useCallback((item: MenuItemProps, event: MouseEvent) => {
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

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size]
    );

    return (
        <Popover
            open={isOpen}
            onOpen={handlePopoverOpen}
            onClose={handlePopoverClose}
            {...props}
        >
            <Component className={classNames} {...props}>
                {items?.map(item => {
                    if (item.type === 'divider') {
                        return (
                            <Divider key={item.key} />
                        );
                    } else if (item.type === 'heading') {
                        return (
                            <Heading
                                key={item.key}
                                className={styles.heading}
                                content={item.content}
                                size="s"
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
            </Component>
        </Popover>
    );
}