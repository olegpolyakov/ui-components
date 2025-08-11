import { ForwardRefExoticComponent, forwardRef } from 'react';

import { Props, PropsWithKey, Size } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import AccordionItem, { AccordionItemProps } from './AccordionItem';

import cssClasses from './Accordion.scss';

export type AccordionProps = Props<{
    as?: 'div';
    items?: PropsWithKey<AccordionItemProps>[];
    size?: Size;
}>;

const displayName = 'Accordion';
const elementClassNames = getElementClassNames(displayName);

const Accordion: ForwardRefExoticComponent<AccordionProps> & {
    Item?: typeof AccordionItem;
} = forwardRef<HTMLDivElement, AccordionProps>(({
    items = [],
    size = 'm',

    as: Tag = 'div',
    className,
    children,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[size]
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {items?.map((item, index) =>
                <AccordionItem
                    key={item.key || index}
                    size={size}
                    {...item}
                />
            )}

            {children}
        </Tag>
    );
});

Accordion.displayName = displayName;
Accordion.Item = AccordionItem;

export default Accordion;