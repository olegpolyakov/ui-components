import { forwardRef, ReactElement, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import type { HTMLDivProps, PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button from '../Button';
import Modal from '../Modal';

import cssClasses from './Drawer.module.scss';

const displayName = 'Drawer';
const elementClassNames = getElementClassNames(displayName, ['overlay', 'surface', 'header', 'title', 'content', 'closeButton']);

export type DrawerProps = PropsWithChildren<{
    as?: 'div';
    title?: string;
    header?: ReactElement;
    content?: ReactNode;
    type?: 'inline' | 'overlay' | 'modal';
    position?: 'left' | 'right';
    open?: boolean;
    onClose?: () => void;
}, HTMLDivProps>;

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
    title,
    header,
    content,
    open,
    position = 'left',
    type = 'inline',
    onClose,

    as: Tag = 'div',
    children = content,
    className,
    ...props
}, ref) => {
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
        <CSSTransition
            in={open}
            timeout={200}
            classNames={transitionClassNames}
        //unmountOnExit
        >
            <Tag ref={ref} className={classNames} tabIndex={-1} {...props}>
                {/* <div className={cn(elementClassNames.overlay, cssClasses.overlay)} /> */}

                <div className={cn(elementClassNames.surface, cssClasses.surface)}>
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
                        {children}
                    </div>
                </div>
            </Tag>
        </CSSTransition>
    );

    return type === 'modal' ?
        <Modal fixed>
            {rootContent}
        </Modal> :
        rootContent;
});

Drawer.displayName = displayName;

export default Drawer;