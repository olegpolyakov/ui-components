import { type ReactNode, forwardRef } from 'react';
import Dropdown, { type DropdownItemProps } from '@restart/ui/Dropdown';

import type { Merge, PropsWithChildren, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import cssClasses from './MenuItem.scss';

export type MenuItemProps = PropsWithChildren<Merge<DropdownItemProps, {
    type?: string;
    icon?: ReactNode;
    start?: ReactNode;
    content?: ReactNode;
    end?: ReactNode;
    selected?: boolean;
    items?: PropsWithKey<MenuItemProps>[];
}>>;

const displayName = 'MenuItem';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'end']);

const MenuItem = forwardRef<HTMLElement, MenuItemProps>(({
    icon,
    start,
    content,
    end,
    selected,
    disabled,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        selected && cssClasses.selected,
        disabled && cssClasses.disabled
    );

    return (
        <Dropdown.Item
            ref={ref}
            className={classNames}
            active={selected}
            disabled={disabled}
            {...props}
        >
            {(start || icon) &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {typeof icon === 'string' ?
                        <Icon name={icon} /> :
                        icon
                    }

                    {start}
                </span>
            }

            {children &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {children}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Dropdown.Item>
    );
});

MenuItem.displayName = displayName;

export default MenuItem;