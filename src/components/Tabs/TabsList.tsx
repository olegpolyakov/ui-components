import { useContext } from 'react';

import type { Align, ComponentProps, ElementType, PropsWithKey } from '../../types';
import { cn } from '../../utils';

import TabsContext from './TabsContext';
import Tab, { TabProps } from './Tab';

import styles from './TabsList.module.scss';

export type TabsListProps = {
    items?: PropsWithKey<TabProps>[];
    align?: Align;
    fluid?: boolean;
};

TabsList.displayName = 'TabsList';

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