import { ReactElement, ReactNode, forwardRef } from 'react';

import type { Color, Intent, Props, Shadow, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import cssClasses from './Alert.scss';

const IntentIcon = {
    danger: 'danger',
    info: 'info',
    success: 'success',
    warning: 'warning'
};

export type AlertProps = Props<{
    content?: ReactNode;
    icon?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    action?: ReactElement;
    closeButtonLabel?: string;
    intent?: Intent;
    color?: Color;
    size?: Size;
    shape?: Shape;
    shadow?: Shadow;
    variant?: Variant;
    onClose?: () => void;
}>;

const displayName = 'Alert';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'icon', 'end', 'close-button']);

const Alert = forwardRef<HTMLDivElement, AlertProps>(({
    content,
    icon,
    start,
    end,
    closeButtonLabel = 'Скрыть',
    intent,
    color = intent,
    shape = 'rounded',
    size = 'medium',
    variant = 'plain',
    shadow,
    onClose,

    children = content,
    className,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        cssClasses[size],
        cssClasses[shape],
        cssClasses[variant],
        shadow && cssClasses[`shadow-${size}`]
    );

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            {start &&
                <div className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </div>
            }

            <div className={cn(elementClassNames.content, cssClasses.content)}>
                {(icon || intent) && 
                    <Icon
                        className={cn(elementClassNames.icon, cssClasses.icon)}
                        name={typeof icon === 'string' ? icon : undefined}
                        size={size}
                    >
                        {icon || (intent && IntentIcon[intent])}
                    </Icon>
                }
                
                {children}
            </div>

            {end &&
                <div className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </div>
            }

            {onClose &&
                <button
                    className={cn(elementClassNames['close-button'], cssClasses.closeButton)}
                    onClick={onClose}
                >
                    {closeButtonLabel}
                </button>
            }
        </div>
    );
});

Alert.displayName = displayName;

export default Alert;