import { MouseEvent } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { cn } from '../../utils';

import Item, { ItemProps } from '../Item';

import cssClasses from './Option.module.scss';

export type OptionProps = ItemProps & {
    value: string;
    label?: string;
    selected?: boolean;
    onClick?: (event: MouseEvent) => void;
};

Option.displayName = 'Option';

export default function Option<T extends ElementType = 'li'>({
    className,
    children,

    label,
    content = label || children,
    value,
    disabled,
    selected,
    onClick,
    ...props
}: ComponentProps<OptionProps, T>) {
    const classNames = cn(
        className,
        cssClasses.root
    );

    return (
        <Item
            className={classNames}
            content={content}
            active={selected}
            disabled={disabled}
            shape="rectangular"
            interactive
            data-value={value}
            onClickCapture={onClick}
            {...(props as ItemProps)}
        />
    );
}