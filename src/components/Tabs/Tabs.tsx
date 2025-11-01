import { useEffect, useMemo, useState } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import TabsContext from './TabsContext';
import TabsList, { TabsListProps } from './TabsList';
import TabPanel from './TabPanel';

import styles from './Tabs.module.scss';

type TabValue = string | number | readonly string[] | undefined;

export type TabsProps = {
    value?: TabValue;
    defaultValue?: TabValue;
    onChange?: (value: TabValue) => void;
} & TabsListProps;

Tabs.displayName = 'Tabs';
Tabs.List = TabsList;
Tabs.Panel = TabPanel;

const elementClassNames = getElementClassNames(Tabs.displayName);

export default function Tabs<T extends ElementType = 'div'>({
    as,
    className,
    children,

    value,
    defaultValue,
    items,
    align,
    fluid,
    onChange,
    ...props
}: ComponentProps<TabsProps, T>) {
    const [selectedValue, setSelectedValue] = useState<TabValue>(value || defaultValue);

    useEffect(() => {
        if (selectedValue) {
            onChange?.(selectedValue);
        }
    }, [selectedValue, onChange]);

    const contextValue = useMemo(() => ({
        selectedValue,
        setSelectedValue
    }), [selectedValue]);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root
    );

    return (
        <Component className={classNames} {...props}>
            <TabsContext.Provider value={contextValue}>
                {items &&
                    <TabsList
                        items={items}
                        align={align}
                        fluid={fluid}
                    />
                }
                
                {children}
            </TabsContext.Provider>
        </Component>
    );
}