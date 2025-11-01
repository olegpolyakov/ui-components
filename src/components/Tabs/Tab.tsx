import { MouseEvent, ReactNode, useCallback, useContext } from 'react';

import { Size, type ComponentProps, type Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import TabsContext from './TabsContext';

import cssClasses from './Tab.module.scss';

export type TabProps = {
    as?: 'button';
    value?: string | number;
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    size?: Size;
    variant?: Variant;
    active?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

Tab.displayName = 'Tab';

const elementClassNames = getElementClassNames(
    Tab.displayName,
    ['container', 'content', 'start', 'end', 'icon']
);

export default function Tab({
    as,
    className,
    children,

    value,
    content = children,
    icon,
    start,
    end,
    size = 'm',
    variant = 'plain',
    active,
    onClick,
    ...props
}: ComponentProps<TabProps, 'button'>) {
    const { setSelectedValue } = useContext(TabsContext);

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setSelectedValue(value);
        onClick?.(event);
    }, [value, setSelectedValue, onClick]);

    const Component = as || 'button';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        cssClasses[variant],
        active && cssClasses.active
    );

    return (
        <Component
            className={classNames}
            type="button"
            value={value}
            data-active={active}
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
                {content}
            </span>

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Component>
    );
}