import { ReactNode, useRef } from 'react';

import type { ComponentProps, ElementType } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button from '../Button';
import Modal from '../Modal';
import Transition from '../Transition';

import cssClasses from './Drawer.module.scss';

export type DrawerProps = {
    title?: string;
    header?: ReactNode;
    content?: ReactNode;
    type?: 'inline' | 'overlay' | 'modal';
    position?: 'left' | 'right' | 'top' | 'bottom';
    open?: boolean;
    onClose?: () => void;
};

Drawer.displayName = 'Drawer';

const elementClassNames = getElementClassNames(
    Drawer.displayName,
    ['backdrop', 'surface', 'header', 'title', 'content', 'closeButton']
);

export default function Drawer<T extends ElementType = 'div'>({
    as,
    className,
    children,

    content = children,
    header,
    title,
    open,
    position = 'left',
    type = 'inline',
    onClose,
    ...props
}: ComponentProps<DrawerProps, T>) {
    const surfaceRef = useRef<HTMLDivElement>(null);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[position],
        cssClasses[type]
    );

    const rootContent = (
        <Component
            className={classNames}
            tabIndex={-1}
            data-open={open ? true : undefined}
            {...props}
        >
            <Transition
                nodeRef={surfaceRef}
                in={open}
                timeout={200}
                type={`slide-${position}`}
                appear
                disabled={type === 'inline'}
            >
                <div
                    ref={surfaceRef}
                    className={cn(elementClassNames.surface, cssClasses.surface)}
                >
                    {(title || header || onClose) &&
                        <div className={cn(elementClassNames.header, cssClasses.header)}>
                            {title &&
                                <h5 className={cn(elementClassNames.title, cssClasses.title)}>
                                    {title}
                                </h5>
                            }

                            {header}

                            {onClose &&
                                <Button
                                    className={cn(elementClassNames.closeButton, cssClasses.closeButton)}
                                    type="button"
                                    icon="close"
                                    size="s"
                                    aria-label="Close drawer"
                                    onClick={onClose}
                                />
                            }
                        </div>
                    }

                    <div className={cn(elementClassNames.content, cssClasses.content)}>
                        {content}
                    </div>
                </div>
            </Transition>
        </Component>
    );

    return type === 'modal' ?
        <Modal open={open} backdrop fixed>
            {rootContent}
        </Modal> :
        rootContent;
}