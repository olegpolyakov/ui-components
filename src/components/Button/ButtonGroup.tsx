import { forwardRef } from 'react';

import type { PropsWithChildren, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { type ButtonProps } from './Button';
import cssClasses from './ButtonGroup.scss';

export type ButtonGroupProps = PropsWithChildren<{
    buttons?: PropsWithKey<ButtonProps>[];
    color?: ButtonProps['color'];
    shape?: ButtonProps['shape'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    joined?: boolean;
    vertical?: boolean;
}>;

const displayName = 'ButtonGroup';
const elementClassNames = getElementClassNames(displayName);

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({
    buttons,
    color,
    shape,
    size,
    variant= 'plain',
    joined,
    vertical,

    className,
    children,
    ...props
}, ref): JSX.Element => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        variant && cssClasses[variant],
        joined && cssClasses.joined,
        vertical && cssClasses.vertical
    );

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            {buttons?.map(button =>
                <Button
                    key={button.key}
                    color={color}
                    shape={shape}
                    size={size}
                    variant={variant}
                    {...button}
                />
            )}

            {children}
        </div>
    );
});

ButtonGroup.displayName = displayName;

export default ButtonGroup;