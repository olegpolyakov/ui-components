import { cn } from '../../component';
import type { Align, ComponentProps, ElementType, PropsWithKey } from '../../types';

import Tab, { TabProps } from './Tab';

import styles from './TabGroup.module.scss';

export type TabGroupProps = {
    tabs?: PropsWithKey<TabProps>[];
    align?: Align;
    fluid?: boolean;
};

TabGroup.displayName = 'TabGroup';

export default function TabGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    tabs,
    align,
    fluid,
    ...props
}: ComponentProps<TabGroupProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        {
            [`align-${align}`]: align,
            fluid
        },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            {tabs?.map(tab =>
                <Tab
                    key={tab.key}
                    {...tab}
                />
            )}

            {children}
        </Component>
    );
}