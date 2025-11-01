import { ReactNode } from 'react';

import type { ComponentProps, ElementType, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import styles from './MenuItem.module.scss';

export type MenuItemProps = {
    type?: string;
    icon?: ReactNode;
    start?: ReactNode;
    content?: ReactNode;
    end?: ReactNode;
    disabled?: boolean;
    selected?: boolean;
    items?: PropsWithKey<MenuItemProps>[];
    onClick?: (event: React.MouseEvent) => void;
};

MenuItem.displayName = 'MenuItem';

const elementClassNames = getElementClassNames(
    MenuItem.displayName,
    ['start', 'content', 'end']
);

export default function MenuItem<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    icon,
    start,
    end,
    selected,
    disabled,
    ...props
}: ComponentProps<MenuItemProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        selected && styles.selected,
        disabled && styles.disabled
    );

    return (
        <Root className={classNames} {...props}>
            {(start || icon) &&
                <span className={cn(elementClassNames.start, styles.start)}>
                    {typeof icon === 'string' ?
                        <Icon name={icon} /> :
                        icon
                    }

                    {start}
                </span>
            }

            {content &&
                <span className={cn(elementClassNames.content, styles.content)}>
                    {content}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, styles.end)}>
                    {end}
                </span>
            }
        </Root>
    );
}