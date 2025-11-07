import { useContext } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import TabsContext from './TabsContext';

import cssClasses from './Tabs.module.scss';

export type TabPanelProps = {
    value: string | number;
    hidden?: boolean;
};

TabPanel.displayName = 'TabPanel';

const elementClassNames = getElementClassNames(TabPanel.displayName);

export default function TabPanel<T extends ElementType = 'div'>({
    as,
    className,
    children,

    value,
    hidden,
    ...props
}: ComponentProps<TabPanelProps, T>) {
    const { selectedValue } = useContext(TabsContext);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        hidden && cssClasses.hidden
    );

    if (value !== selectedValue) {
        return null;
    }

    return (
        <Component className={classNames} {...props}>
            {children}
        </Component>
    );
}