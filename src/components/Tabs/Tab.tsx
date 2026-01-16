import { MouseEvent, ReactNode, useCallback, useContext } from 'react';

import { cn } from '../../component';
import { Size, type ComponentProps, type Variant } from '../../types';

import Icon, { type IconProps } from '../Icon';
import { Slot, type Slotted } from '../Slot';

import TabsContext from './TabsContext';

import styles from './Tab.module.scss';

export type TabProps = {
    value?: string | number;
    content?: ReactNode;
    icon?: Slotted<IconProps>;
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
    onClick,
    ...props
}: ComponentProps<TabProps, 'button'>) {
    const { selectedValue, setSelectedValue } = useContext(TabsContext);

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setSelectedValue(value);
        onClick?.(event);
    }, [value, setSelectedValue, onClick]);

    const Root = as || 'button';
    const classNames = cn(
        className,
        { variant, active: value === selectedValue },
        styles
    );

    return (
        <Root
            className={classNames}
            type="button"
            value={value}
            data-active={value === selectedValue}
            onClick={handleClick}
            {...props}
        >
            {start &&
                <span className={styles.start}>
                    {start}
                </span>
            }

            {icon &&
                <Slot
                    fallback={Icon}
                    className={styles.icon}
                    size={size}
                >
                    {icon}
                </Slot>
            }

            <span className={styles.content}>
                {content}
            </span>

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </Root>
    );
}