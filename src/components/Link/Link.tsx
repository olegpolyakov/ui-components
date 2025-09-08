import { FunctionComponent, ReactNode, forwardRef } from 'react';

import type { Color, HTMLAnchorProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import cssClasses from './Link.module.scss';

export type LinkProps = PropsWithChildren<{
    as?: 'a' | FunctionComponent,
    content?: ReactNode;
    color?: Color;
    disabled?: boolean;
}, HTMLAnchorProps>;

const displayName = 'Link';
const elementClassNames = getElementClassNames(displayName);

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
    content,
    color = '',
    disabled,
    
    as: Tag = 'a',
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[color],
        disabled && cssClasses.disabled
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {children}
        </Tag>
    );
});

Link.displayName = displayName;

export default Link;