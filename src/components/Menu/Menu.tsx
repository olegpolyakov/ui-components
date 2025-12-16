import { Children, isValidElement, MouseEvent, useCallback, useState } from 'react';

import { Placement, flip } from '@floating-ui/react';

import type { ComponentProps, ElementType, PropsOf, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames, isObject } from '../../utils';

import Divider from '../Divider';
import Heading from '../Heading';
import Icon from '../Icon';
import Item from '../Item';
import Popover, { type PopoverProps } from '../Popover';

import styles from './Menu.module.scss';

type MenuItemProps = {
    type?: string;
    items?: PropsWithKey<MenuItemProps>[];
    selected?: boolean;
} & PropsOf<typeof Item>;

export type MenuProps = {
    items?: PropsWithKey<MenuItemProps>[];
} & Omit<PopoverProps, 'middleware' | 'unstyled'>;

Menu.displayName = 'Menu';

const elementClassNames = getElementClassNames(Menu.displayName);

export default function Menu<T extends ElementType = 'div'>({
    as,
    children,
    className,

    items,
    open = false,
    defaultOpen = open,
    placement = 'bottom',
    size = 'm',
    variant,
    onOpen,
    onClose,
    onOpenChange,
    ...props
}: ComponentProps<MenuProps, T>) {
    const [isOpen, setOpen] = useState<boolean>(defaultOpen);

    const handlePopoverOpen = useCallback((placement: Placement) => {
        setOpen(true);
        onOpen?.(placement);
    }, [onOpen]);

    const handlePopoverClose = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose]);

    const handleItemClick = useCallback((item: MenuItemProps, event: MouseEvent) => {
        if (typeof item?.onClick === 'function') {
            item?.onClick(event);
        }

        if (item.items) return;

        setOpen(false);
        onClose?.();
        onOpenChange?.(false, event);
    }, [onOpenChange, onClose]);

    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size]
    );

    const resolvedItems = items ||
        Children.toArray(children)
            .map(item => isValidElement<MenuItemProps>(item)
                ? item.props
                : isObject<MenuItemProps>(item)
                    ? item
                    : null
            )
            .filter((item): item is MenuItemProps => item !== null);

    return (
        <Popover
            open={isOpen}
            placement={placement}
            fallbackPlacements={['top', 'left', 'right']}
            middleware={[flip()]}
            size={size}
            variant={variant}
            onOpen={handlePopoverOpen}
            onClose={handlePopoverClose}
            {...props}
        >
            <Root className={classNames}>
                {resolvedItems?.map(item => {
                    const { key, type, items, selected, ...rest } = item;

                    if (type === 'divider') {
                        return (
                            <Divider
                                key={key}
                                className={cn(styles.divider)}
                            />
                        );
                    } else if (type === 'heading') {
                        return (
                            <Heading
                                key={key}
                                className={styles.heading}
                                content={item.content}
                                size="s"
                                muted
                            />
                        );
                    } else if (items) {
                        return (
                            <Menu
                                key={key}
                                trigger={
                                    <Item
                                        shape="rectangular"
                                        {...rest}
                                        end={
                                            <Icon
                                                name="chevron_right"
                                                size="s"
                                            />
                                        }
                                        active={selected}
                                        interactive
                                    />
                                }
                                placement="right-start"
                                fallbackPlacements={['right-end', 'left-start', 'left-end']}
                                items={items}
                                size={size}
                                variant={variant}
                                disabled={rest.disabled}
                                onClose={handlePopoverClose}
                            />
                        );
                    } else {
                        return (
                            <Item
                                key={key}
                                shape="rectangular"
                                {...rest}
                                interactive
                                active={selected}
                                onClick={(event: MouseEvent) => handleItemClick(item, event)}
                            />
                        );
                    }
                })}
            </Root>
        </Popover>
    );
}