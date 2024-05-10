import { forwardRef } from 'react';

import { Props } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Tabs.scss';

export type TabPanelProps = Props<{
    as?: 'div';
    value: any;
    hidden?: boolean;
}>;

const displayName = 'TabPanel';
const elementClassNames = getElementClassNames(displayName);

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(({
    hidden,

    as: Tag = 'div',
    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        hidden && cssClasses.hidden
    );

    return (
        <Tag
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </Tag>
    );
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;