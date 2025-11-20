import type { ComponentProps, Slotted } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { ButtonProps } from '../Button';
import Heading, { HeadingProps } from '../Heading';
import Image, { ImageProps } from '../Image';
import Slot from '../Slot';
import { Text, TextProps } from '../Text';

import styles from './State.module.scss';

const displayName = 'State';
const elementClassNames = getElementClassNames(displayName, [
    'image', 'main', 'title', 'subtitle', 'description', 'action'
]);

export type StateProps = {
  image?: Slotted<ImageProps>;
  title?: Slotted<HeadingProps>;
  subtitle?: Slotted<HeadingProps>;
  description?: Slotted<TextProps>;
  action?: Slotted<ButtonProps>;
};

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
        elementClassNames.root,
        styles.root
    );

    return (
        <div className={classNames}>
            {image && (
                <Slot
                    fallback={Image}
                    className={cn(elementClassNames.image, styles.image)}
                >
                    {image}
                </Slot>
            )}

            <div className={cn(elementClassNames.main, styles.main)}>
                {title && (
                    <Slot
                        fallback={Heading}
                        as="h2"
                        className={cn(elementClassNames.title, styles.title)}
                    >
                        {title}
                    </Slot>
                )}

                {subtitle && (
                    <Slot
                        fallback={Heading}
                        as="h3"
                        size="s"
                        className={cn(elementClassNames.subtitle, styles.subtitle)}
                    >
                        {subtitle}
                    </Slot>
                )}

                {description && (
                    <Slot
                        fallback={Text}
                        className={cn(elementClassNames.description, styles.description)}
                    >
                        {description}
                    </Slot>
                )}
            </div>

            {action && (
                <Slot
                    fallback={Button}
                    className={cn(elementClassNames.action, styles.action)}
                    color="primary"
                    variant="filled"
                >
                    {action}
                </Slot>
            )}

            {children}
        </div>
    );
}