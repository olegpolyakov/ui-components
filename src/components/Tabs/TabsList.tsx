import { useContext } from 'react';

import type { Align, ComponentProps, ElementType, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import TabsContext from './TabsContext';
import Tab, { TabProps } from './Tab';

import styles from './TabsList.module.scss';

export type TabsListProps = {
    items?: PropsWithKey<TabProps>[];
    align?: Align;
    fluid?: boolean;
};

TabsList.displayName = 'TabsList';

const elementClassNames = getElementClassNames(TabsList.displayName);

export default function TabsList<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items,
    align,
    fluid,
    ...props
}: ComponentProps<TabsListProps, T>) {
    const { selectedValue } = useContext(TabsContext);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        align && styles[`align-${align}`],
        fluid && styles.fluid
    );

    return (
        <Component className={classNames} {...props}>
            {items?.map(item =>
                <Tab
                    key={item.key}
                    active={item.value === selectedValue}
                    {...item}
                />
            )}

            {children}
        </Component>
    );
}