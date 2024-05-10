import { forwardRef, type MouseEvent, type ReactNode } from 'react';

import { useOption } from '@mui/base/useOption';
import { type SelectOptionDefinition } from '@mui/base/useSelect';

import type { Merge } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Option.scss';

export type OptionProps<T = string> = Merge<{
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    value: T;
    label?: string;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;

    className?: string;
    children?: ReactNode;
}, SelectOptionDefinition<T>>;

const displayName = 'Option';
const elementClassNames = getElementClassNames(displayName, ['start', 'content', 'end']);

const Option = forwardRef<HTMLLinkElement, OptionProps>(({
    content,
    start,
    end,
    value,
    label = typeof content === 'string' ? content : undefined,
    disabled = false,
    onClick,

    className,
    children = label,
    ...props
}, ref) => {
    const { getRootProps, highlighted, selected } = useOption({
        label: children,
        value,
        disabled,
        rootRef: ref
    });

    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        highlighted && cssClasses.highlighted,
        selected && cssClasses.selected
    );

    return (
        <li
            className={classNames}
            data-value={value}
            onClickCapture={onClick}
            {...getRootProps()}
            {...props}
        >
            {start &&
                <span className={cn(elementClassNames.start, cssClasses.start)}>
                    {start}
                </span>
            }

            {children &&
                <span className={cn(elementClassNames.content, cssClasses.content)}>
                    {children}
                </span>
            }

            {end &&
                <span className={cn(elementClassNames.end, cssClasses.end)}>
                    {end}
                </span>
            }
        </li>
    );
});

Option.displayName = displayName;

export default Option;