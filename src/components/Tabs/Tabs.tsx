import { Children, ForwardRefExoticComponent, ReactElement, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useState } from 'react';

import { Align, Props, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Tab, { TabProps } from './Tab';
import TabPanel, { TabPanelProps } from './TabPanel';
import TabsContext from './TabsContext';

import cssClasses from './Tabs.module.scss';

type TabsComponent = ForwardRefExoticComponent<TabsProps> & {
    Panel: typeof TabPanel;
};

type TabValue = string | number | readonly string[] | undefined;

export type TabsProps = Props<{
    value?: TabValue;
    items?: PropsWithKey<TabProps>[];
    align?: Align;
    fluid?: boolean;
    underlined?: boolean;
    onChange?: (value: TabValue) => void;
}>;

const displayName = 'Tabs';
const elementClassNames = getElementClassNames(displayName, ['list']);

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
    value,
    defaultValue,
    items,
    align,
    fluid,
    underlined,
    onChange,

    className,
    children,
    ...props
}, ref) => {
    const [selectedValue, setSelectedValue] = useState<TabValue>(value || defaultValue);

    const contextValue = useMemo(() => ({
        selectedValue,
        setSelectedValue
    }), [selectedValue]);

    useEffect(() => {
        if (selectedValue)
            onChange?.(selectedValue);
    }, [selectedValue, onChange]);

    const classNames = cn(
        className,
        elementClassNames.root,
        align && cssClasses[`align-${align}`],
        fluid && cssClasses.fluid,
        underlined && cssClasses.underlined
    );

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            <TabsContext.Provider value={contextValue}>
                <div className={cn(elementClassNames.list, cssClasses.list)}>
                    {items?.map(item =>
                        <Tab
                            key={item.key}
                            active={item.value === selectedValue}
                            {...item}
                        />
                    )}
                </div>

                {Children.map(children, tab =>
                    (tab as ReactElement<TabPanelProps>).props.value === selectedValue && (
                        isValidElement(tab) ? cloneElement(tab) : tab
                    )
                )}
            </TabsContext.Provider>
        </div>
    );
});

Tabs.displayName = displayName;
(Tabs as TabsComponent).Panel = TabPanel;

export default Tabs as TabsComponent;