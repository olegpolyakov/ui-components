import { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Intent, Shadow, Shape, Size, SizeExtended, Slotted, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

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

Alert.displayName = 'Alert';

const elementClassNames = getElementClassNames(
    Alert.displayName,
    ['start', 'content', 'icon', 'end', 'close-button']
);

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
    shape = 'rounded',
    variant = 'tinted',
    shadow,
    onClose,
    ...props
}: ComponentProps<AlertProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[color ? `${variant}-${color}` : variant],
        styles[size],
        styles[shape === 'rounded' ? `rounded-${size}` : shape],
        styles[variant],
        shadow && styles[`shadow-${shadow}`]
    );

    return (
        <Root
            className={classNames}
            {...props}
        >
            {start &&
                <div className={cn(elementClassNames.start, styles.start)}>
                    {start}
                </div>
            }

            {(icon || intent) &&
                <Slot
                    fallback={Icon}
                    className={cn(elementClassNames.icon, styles.icon)}
                    size={size}
                >
                    {icon || (intent && IntentIcon[intent])}
                </Slot>
            }
                
            <div className={cn(elementClassNames.content, styles.content)}>
                {content}
            </div>

            {end &&
                <div className={cn(elementClassNames.end, styles.end)}>
                    {end}
                </div>
            }

            {(closeButton || onClose) &&
                <Slot
                    fallback={Button}
                    className={cn(elementClassNames['close-button'], styles.closeButton)}
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