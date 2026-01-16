import { useEffect, useMemo, useState } from 'react';

import { cn } from '../../component';
import type { ComponentProps, ElementType } from '../../types';

import Context, { type TabValue } from './TabsContext';
import Group, { TabGroupProps } from './TabGroup';
import Panel from './TabPanel';

import styles from './Tabs.module.scss';

export type TabsProps = {
    value?: TabValue;
    defaultValue?: TabValue;
    onChange?: (value: TabValue) => void;
} & TabGroupProps;

Tabs.displayName = 'Tabs';
Tabs.Group = Group;
Tabs.Panel = Panel;

export default function Tabs<T extends ElementType = 'div'>({
    as,
    className,
    children,

    value,
    defaultValue,
    tabs,
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

    const Root = as || 'div';
    const classNames = cn(
        className,
        {},
        styles
    );

    return (
        <Root className={classNames} {...props}>
            <Context.Provider value={contextValue}>
                {tabs &&
                    <Group
                        tabs={tabs}
                        align={align}
                        fluid={fluid}
                    />
                }
                
                {children}
            </Context.Provider>
        </Root>
    );
}