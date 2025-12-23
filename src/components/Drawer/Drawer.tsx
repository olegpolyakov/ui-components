import { ReactNode, useRef } from 'react';

import type { ComponentProps, ElementType, Shadow, Slotted } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Modal from '../Modal';
import Slot from '../Slot';
import Transition from '../Transition';

import styles from './Drawer.module.scss';

export type DrawerProps = {
    open?: boolean;
    title?: Slotted<HeadingProps>;
    header?: ReactNode;
    content?: ReactNode;
    closeButton?: Slotted<ButtonProps>;
    type?: 'inline' | 'overlay' | 'modal';
    position?: 'left' | 'right' | 'top' | 'bottom';
    shadow?: Shadow;
    onClose?: () => void;
};

Drawer.displayName = 'Drawer';

const elementClassNames = getElementClassNames(
    Drawer.displayName,
    ['surface', 'header', 'title', 'content', 'closeButton']
);

export default function Drawer<T extends ElementType = 'div'>({
    as,
    className,
    children,

    open,
    content = children,
    header,
    title,
    closeButton = { icon: 'close' },
    type = 'inline',
    position = 'left',
    shadow = 'm',
    onClose,
    ...props
}: ComponentProps<DrawerProps, T>) {
    const surfaceRef = useRef<HTMLDivElement>(null);

    const Component = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        styles[position],
        styles[type]
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
                    className={cn(elementClassNames.surface, styles.surface, shadow && styles[`shadow-${shadow}`])}
                >
                    {(title || header || onClose) &&
                        <div className={cn(elementClassNames.header, styles.header)}>
                            {title &&
                                <Slot
                                    fallback={Heading}
                                    className={cn(elementClassNames.title, styles.title)}
                                    size="s"
                                >
                                    {title}
                                </Slot>
                            }

                            {header}

                            {closeButton && 
                                <Slot
                                    fallback={Button}
                                    className={cn(elementClassNames.closeButton, styles.closeButton)}
                                    icon="close"
                                    size="s"
                                    aria-label="Close dialog"
                                    onClick={onClose}
                                />
                            }
                        </div>
                    }

                    <div className={cn(elementClassNames.content, styles.content)}>
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