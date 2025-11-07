import type { ReactNode } from 'react';

import type { Color, ComponentProps, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Label.module.scss';

export type LabelProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: Color;
    size?: Size;
    inline?: boolean;
};

Label.displayName = 'Label';

const elementClassNames = getElementClassNames(
    Label.displayName,
    ['start', 'end']
);

export default function Label({
    as,
    className,
    children,

    content = children,
    start,
    end,
    color,
    size = 'm',
    inline,
    ...props
}: ComponentProps<LabelProps, 'label'>) {
    const Component = as || 'label';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        color && cssClasses[color],
        cssClasses[size],
        inline && cssClasses.inline
    );

    return (
        <Component className={classNames} {...props}>
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {content}

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Component>
    );
}