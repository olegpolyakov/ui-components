import { type ReactElement, type ReactNode, isValidElement } from 'react';

import type { ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label, { LabelProps } from '../Label';

import cssClasses from './Field.module.scss';

Field.displayName = 'Field';

const elementClassNames = getElementClassNames(Field.displayName);

export type FieldProps = {
    label?: ReactNode;
    content?: ReactNode;
    size?: Size;
    inline?: boolean;
    labelProps?: LabelProps;
};

export default function Field({
    as,
    className,
    children,

    label,
    content = children,
    size = 'm',
    inline,
    labelProps,
    ...props
}: ComponentProps<FieldProps, 'div'>) {
    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        inline && cssClasses.inline
    );

    return (
        <Component className={classNames} {...props}>
            {label && (isValidElement<LabelProps>(label) ? label :
                <Label size={size} {...labelProps}>{label}</Label>
            )}

            {content}
        </Component>
    );
}