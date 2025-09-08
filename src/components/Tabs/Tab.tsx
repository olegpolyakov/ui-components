import { MouseEvent, ReactNode, forwardRef, useCallback, useContext } from 'react';

import { Props, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import TabsContext from './TabsContext';

import cssClasses from './Tab.module.scss';

export type TabProps = Props<{
    as?: 'button';
    value?: string | number;
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    active?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>;

const displayName = 'Tab';
const elementClassNames = getElementClassNames(displayName, ['container', 'content', 'start', 'end', 'icon']);

const Tab = forwardRef<HTMLButtonElement, TabProps>(({
    value,
    content,
    icon,
    start,
    end,
    size = 'medium',
    active,
    onClick,

    as: Tag = 'button',
    className,
    children = content,
    ...props
}, ref) => {
    const { setSelectedValue } = useContext(TabsContext);

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setSelectedValue(value);
        onClick?.(event);
    }, [value, setSelectedValue, onClick]);

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        active && cssClasses.active
    );

    return (
        <Tag
            ref={ref}
            className={classNames}
            type="button"
            value={value}
            onClick={handleClick}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {icon &&
                <Icon
                    className={cn(elementClassNames.icon, cssClasses.icon)}
                    size={size}
                >
                    {icon}
                </Icon>
            }

            <span className={cn(elementClassNames.content, cssClasses.content)}>
                {children}
            </span>

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Tag>
    );
});

Tab.displayName = displayName;

export default Tab;