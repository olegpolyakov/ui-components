import type { ComponentProps, ElementType, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { type ButtonProps } from './Button';
import cssClasses from './ButtonGroup.module.scss';

export type ButtonGroupProps = {
    buttons?: PropsWithKey<ButtonProps>[];
    color?: ButtonProps['color'];
    shape?: ButtonProps['shape'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    joined?: boolean;
    vertical?: boolean;
};

ButtonGroup.displayName = 'ButtonGroup';

const elementClassNames = getElementClassNames(ButtonGroup.displayName);

export default function ButtonGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    buttons,
    color,
    shape,
    size,
    variant= 'plain',
    joined,
    vertical,
    ...props
}: ComponentProps<ButtonGroupProps, T>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        variant && cssClasses[variant],
        joined && cssClasses.joined,
        vertical && cssClasses.vertical
    );

    return (
        <Component
            className={classNames}
            {...props}
        >
            {buttons?.map(({ key, ...props }) =>
                <Button
                    key={key}
                    color={color}
                    shape={shape}
                    size={size}
                    variant={variant}
                    {...props}
                />
            )}

            {children}
        </Component>
    );
}