import { type ReactElement, forwardRef } from 'react';

import type { Color, HTMLLabelProps, PropsWithChildren, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Label.module.scss';

export type LabelProps = PropsWithChildren<{
    as?: 'label';
    content?: string | ReactElement;
    start?: string | ReactElement;
    end?: string | ReactElement;
    color?: Color;
    size?: Size;
    inline?: boolean;
}, HTMLLabelProps>;

const displayName = 'Label';
const elementClassNames = getElementClassNames(displayName, ['start', 'end']);

const Label = forwardRef<HTMLLabelElement, LabelProps>(({
    content,
    start,
    end,
    color = '',
    size = 'medium',
    inline,

    as: Tag = 'label',
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[color],
        cssClasses[size],
        inline && cssClasses.inline
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {children}

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Tag>
    );
});

Label.displayName = displayName;

export default Label;