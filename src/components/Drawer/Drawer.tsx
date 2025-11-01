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
    position?: 'left' | 'right';
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
    ref,
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
    const rootRef = useRef<HTMLDivElement>(null);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root,
        cssClasses[position],
        cssClasses[type]
    );

    const transitionClassNames = {
        appear: cssClasses.appear,
        appearActive: cssClasses.appearActive,
        appearDone: cssClasses.appearDone,
        enter: cssClasses.enter,
        enterActive: cssClasses.enterActive,
        enterDone: cssClasses.enterDone,
        exit: cssClasses.exit,
        exitActive: cssClasses.exitActive,
        exitDone: cssClasses.exitDone
    };

    const rootContent = (
        <Transition
            in={open}
            nodeRef={rootRef}
            timeout={200}
            classNames={transitionClassNames}
        >
            <Component
                ref={rootRef}
                className={classNames}
                tabIndex={-1}
                {...props}
            >
                <div className={cn(elementClassNames.backdrop, cssClasses.backdrop)} />

                <div ref={ref} className={cn(elementClassNames.surface, cssClasses.surface)}>
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
            </Component>
        </Transition>
    );

    return type === 'modal' ?
        <Modal fixed>
            {rootContent}
        </Modal> :
        rootContent;
}