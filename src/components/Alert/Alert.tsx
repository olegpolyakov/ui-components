import { ReactNode } from 'react';

import type { Color, ComponentProps, ElementType, Intent, Shadow, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import cssClasses from './Alert.module.scss';
import Button from '../Button';

export type AlertProps = {
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
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
    success: 'done',
    warning: 'warning'
};

export default function Alert<T extends ElementType = 'div'>({
    as,
    children,
    className,

    content = children,
    icon,
    start,
    end,
    intent,
    color = intent,
    shape = 'rounded',
    size = 'm',
    variant = 'tinted',
    shadow,
    onClose,

    ...props
}: ComponentProps<AlertProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant],
        cssClasses[color ? `${variant}-${color}` : variant],
        shadow && cssClasses[`shadow-${shadow}`]
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {start &&
                <div className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </div>
            }

            {(icon || intent) && 
                <Icon
                    className={cn(elementClassNames.icon, cssClasses.icon)}
                    name={typeof icon === 'string' ? icon : undefined}
                    size={size}
                >
                    {icon || (intent && IntentIcon[intent])}
                </Icon>
            }
                
            <div className={cn(elementClassNames.content, cssClasses.content)}>
                {content}
            </div>

            {end &&
                <div className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </div>
            }

            {onClose &&
                <Button
                    className={cn(elementClassNames['close-button'], cssClasses.closeButton)}
                    icon="close"
                    size={size}
                    onClick={onClose}
                />
            }
        </Component>
    );
}