import { type MouseEvent, type ReactNode } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Option.module.scss';

export type OptionProps = {
    value: string;
    label?: string;
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    disabled?: boolean;
    active?: boolean;
    selected?: boolean;
    onClick?: (event: MouseEvent) => void;
};

Option.displayName = 'Option';

const elementClassNames = getElementClassNames(
    Option.displayName,
    ['start', 'content', 'end']
);

export default function Option<T extends ElementType = 'li'>({
    as,
    className,
    children,

    label,
    content = label || children,
    start,
    end,
    value,
    disabled,
    active,
    selected,
    onClick,
    ...props
}: ComponentProps<OptionProps, T>) {
    const Root = as || 'li';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        disabled && cssClasses.disabled,
        active && cssClasses.active,
        selected && cssClasses.selected
    );

    return (
        <Root
            className={classNames}
            data-value={value}
            onClickCapture={onClick}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {content &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {content}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </Root>
    );
}