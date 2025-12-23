import type { ComponentProps, ElementType, PropsWithKey, Size, Space } from '../../types';
import { classnames as cn, resolveChildren } from '../../utils';

import AccordionItem, { AccordionItemProps } from './AccordionItem';

import baseStyles from '../../styles/classes.module.scss';
import styles from './Accordion.module.scss';

export type AccordionProps = {
    items?: PropsWithKey<AccordionItemProps>[];
    size?: Size;
    gap?: Space;
};

Accordion.displayName = 'Accordion';
Accordion.Item = AccordionItem;

export default function Accordion<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items = [],
    size = 'm',
    gap,
    ...props
}: ComponentProps<AccordionProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        styles.root,
        styles[size],
        gap && baseStyles[`gap-${gap}`]
    );

    return (
        <Root className={classNames} {...props}>
            {resolveChildren(children, items).map((item, index) =>
                <AccordionItem
                    key={item.key || index}
                    size={size}
                    {...item}
                />
            )}
        </Root>
    );
}