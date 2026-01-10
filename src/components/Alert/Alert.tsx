import { ReactNode } from 'react';

import { cn } from '../../component';
import type { Color, ComponentProps, ElementType, Intent, Shadow, Shape, Size, SizeExtended, Slotted, Variant } from '../../types';

import Button, { ButtonProps } from '../Button';
import Icon, { IconProps } from '../Icon';
import Slot from '../Slot';

import styles from './Alert.module.scss';

export type AlertProps = {
    content?: ReactNode;
    icon?: Slotted<IconProps>;
    start?: ReactNode;
    end?: ReactNode;
    closeButton?: Slotted<ButtonProps>;
    intent?: Intent;
    color?: Color;
    size?: Size;
    shape?: Shape;
    shadow?: Shadow;
    variant?: Variant;
    onClose?: () => void;
};

const IntentIcon = {
    danger: 'error',
    info: 'info',
    success: 'check_circle',
    warning: 'warning'
};

const closeButtonSizeMap: Record<Size, SizeExtended> = {
    s: 'xs',
    m: 's',
    l: 'm'
};

Alert.displayName = 'Alert';

export default function Alert<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    icon,
    start,
    end,
    closeButton,
    intent,
    color = intent,
    size = 'm',
    shape,
    variant = 'tinted',
    shadow,
    onClose,
    ...props
}: ComponentProps<AlertProps, T>) {
    const Root = as || 'div';
    const classNames = cn(className, {
        color,
        size,
        shape,
        variant,
        shadow,
        interactive: false
    }, styles);

    return (
        <Root
            className={classNames}
            {...props}
        >
            {start &&
                <div className={styles.start}>
                    {start}
                </div>
            }

            {(icon || intent) &&
                <Slot
                    fallback={Icon}
                    className={styles.icon}
                    size={size}
                >
                    {icon || (intent && IntentIcon[intent])}
                </Slot>
            }
                
            <div className={styles.content}>
                {content}
            </div>

            {end &&
                <div className={styles.end}>
                    {end}
                </div>
            }

            {(closeButton || onClose) &&
                <Slot
                    fallback={Button}
                    className={styles.closeButton}
                    icon="close"
                    size={closeButtonSizeMap[size]}
                    onClick={onClose}
                >
                    {closeButton}
                </Slot>
            }
        </Root>
    );
}