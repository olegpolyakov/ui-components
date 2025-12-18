import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames, resolveChildren } from '../../utils';

import AccordionItem, { AccordionItemProps } from './AccordionItem';

import styles from './Accordion.module.scss';

Accordion.displayName = 'Accordion';
Accordion.Item = AccordionItem;

const elementClassNames = getElementClassNames(Accordion.displayName);

export type AccordionProps = {
    items?: PropsWithKey<AccordionItemProps>[];
    size?: Size;
};

export default function Accordion<T extends ElementType = 'div'>({
    as,
    className,
    children,

    items = [],
    size = 'm',
    ...props
}: ComponentProps<AccordionProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[size]
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