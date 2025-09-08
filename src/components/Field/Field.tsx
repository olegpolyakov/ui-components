import { type ReactElement, forwardRef, isValidElement } from 'react';

import type { HTMLDivProps, PropsWithChildren, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Label, { LabelProps } from '../Label';

import cssClasses from './Field.module.scss';

const displayName = 'Field';
const elementClassNames = getElementClassNames(displayName);

export type FieldProps = PropsWithChildren<{
    as?: 'div';
    label?: string | ReactElement;
    control?: ReactElement;
    size?: Size;
    inline?: boolean;
    labelProps?: LabelProps;
}, HTMLDivProps>;

const Field = forwardRef<HTMLDivElement, FieldProps>(({
    label,
    control,
    size = 'medium',
    inline,
    labelProps,

    as: Tag = 'div',
    className,
    children = control,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size],
        inline && cssClasses.inline
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {label && (isValidElement<LabelProps>(label) ? label :
                <Label size={size} {...labelProps}>{label}</Label>
            )}
            {children}
        </Tag>
    );
});

Field.displayName = displayName;

export default Field;