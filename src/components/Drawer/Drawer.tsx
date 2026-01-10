import { ReactNode, useRef } from 'react';

import { cn as ccn } from '../../component';
import type { ComponentProps, ElementType, Shadow, Shape, Size, SizeExtended, Slotted } from '../../types';
import { cn } from '../../utils';

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
    size?: Size;
    shape?: Exclude<Shape, 'circular'>;
    shadow?: Shadow;
    backdrop?: boolean;
    inset?: boolean;
    onClose?: () => void;
};

const sizeMap: Record<Size, SizeExtended> = {
    s: 'xs',
    m: 's',
    l: 'm'
};

Drawer.displayName = 'Drawer';

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
    size = 'm',
    shadow,
    shape,
    backdrop = true,
    inset = false,
    onClose,
    ...props
}: ComponentProps<DrawerProps, T>) {
    const surfaceRef = useRef<HTMLDivElement>(null);

    const Component = as || 'div';
    const rootClassNames = cn(
        className,
        styles.root,
        styles[type],
        styles[size],
        styles[position],
        inset && styles.inset
    );
    const surfaceClassNames = ccn(styles.surface, {
        root: false,
        shape,
        shadow
    }, styles);

    const rootContent = (
        <Component
            className={rootClassNames}
            tabIndex={-1}
            data-open={open ? true : undefined}
            data-position={position}
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
                    className={surfaceClassNames}
                >
                    {(title || header || onClose) &&
                        <div className={styles.header}>
                            {title &&
                                <Slot
                                    fallback={Heading}
                                    className={styles.title}
                                    size={sizeMap[size]}
                                >
                                    {title}
                                </Slot>
                            }

                            {header}

                            {closeButton && 
                                <Slot
                                    fallback={Button}
                                    className={styles.closeButton}
                                    icon="close"
                                    size={sizeMap[size]}
                                    aria-label="Close dialog"
                                    onClick={onClose}
                                />
                            }
                        </div>
                    }

                    <div className={styles.content}>
                        {content}
                    </div>
                </div>
            </Transition>
        </Component>
    );

    return type === 'modal' ?
        <Modal open={open} backdrop={backdrop} fixed>
            {rootContent}
        </Modal> :
        rootContent;
}