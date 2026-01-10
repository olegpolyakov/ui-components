import { MouseEvent, ReactNode, useCallback, useContext } from 'react';

import { Size, type ComponentProps, type Variant } from '../../types';
import { cn } from '../../utils';

import Icon from '../Icon';

import TabsContext from './TabsContext';

import styles from './Tab.module.scss';

export type TabProps = {
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
        styles.root,
        styles[size],
        styles[variant],
        active && styles.active
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
                <span className={styles.start}>
                    {start}
                </span>
            }

            {icon &&
                <Icon
                    className={styles.icon}
                    size={size}
                >
                    {icon}
                </Icon>
            }

            <span className={styles.content}>
                {content}
            </span>

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </Component>
    );
}