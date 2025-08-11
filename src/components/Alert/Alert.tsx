import { ReactNode, forwardRef } from 'react';

import type { Color, Intent, Props, Shadow, Shape, Size, Variant } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Icon from '../Icon';

import cssClasses from './Alert.scss';
import Button from '../Button';

const IntentIcon = {
    danger: 'error',
    info: 'info',
    success: 'done',
    warning: 'warning'
};

export type AlertProps = Props<{
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
}>;

const displayName = 'Alert';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'icon', 'end', 'close-button']);

const Alert = forwardRef<HTMLDivElement, AlertProps>(({
    content,
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

    children = content,
    className,
    ...props
}, ref) => {
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
                
                {children}
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
        </div>
    );
});

Alert.displayName = displayName;

export default Alert;