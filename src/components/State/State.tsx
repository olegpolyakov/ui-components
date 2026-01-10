import type { ComponentProps, Slotted } from '../../types';
import { cn } from '../../utils';

import Button, { ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Image, { ImageProps } from '../Image';
import Slot from '../Slot';
import { Text, TextProps } from '../Text';

import styles from './State.module.scss';

export type StateProps = {
    image?: Slotted<ImageProps>;
    title?: Slotted<HeadingProps>;
    subtitle?: Slotted<HeadingProps>;
    description?: Slotted<TextProps>;
    action?: Slotted<ButtonProps>;
};

State.displayName = 'State';

export default function State({
    image,
    title,
    subtitle,
    description,
    action,
    className,
    children
}: ComponentProps<StateProps, 'div'>) {
    const classNames = cn(
        className,
        styles.root
    );

    return (
        <div className={classNames}>
            {image && (
                <Slot
                    fallback={Image}
                    className={styles.image}
                >
                    {image}
                </Slot>
            )}

            <div className={styles.main}>
                {title && (
                    <Slot
                        fallback={Heading}
                        as="h2"
                        className={styles.title}
                    >
                        {title}
                    </Slot>
                )}

                {subtitle && (
                    <Slot
                        fallback={Heading}
                        as="h3"
                        size="s"
                        className={styles.subtitle}
                    >
                        {subtitle}
                    </Slot>
                )}

                {description && (
                    <Slot
                        fallback={Text}
                        className={styles.description}
                    >
                        {description}
                    </Slot>
                )}
            </div>

            {action && (
                <Slot
                    fallback={Button}
                    className={styles.action}
                    color="brand"
                    variant="filled"
                >
                    {action}
                </Slot>
            )}

            {children}
        </div>
    );
}