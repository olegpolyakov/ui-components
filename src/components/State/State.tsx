import type { ReactNode } from 'react';

import type { PropsWithChildren } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Button, { ButtonProps } from '../Button';
import { HeadingProps } from '../Heading';
import Image, { ImageProps } from '../Image';
import Slot from '../Slot';
import { TextProps } from '../Text';

import cssClasses from './State.scss';

const displayName = 'State';
const elementClassNames = getElementClassNames(displayName, [
    'image', 'main', 'title', 'subtitle', 'description', 'action'
]);

export type StateProps = PropsWithChildren<{
  image?: ReactNode | ImageProps;
  title?: ReactNode | HeadingProps;
  subtitle?: ReactNode | HeadingProps;
  description?: ReactNode | TextProps;
  action?: ReactNode | ButtonProps;
}>;

export default function EmptyState({
    image,
    title,
    subtitle,
    description,
    action,
    className,
    children
}: StateProps) {
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <div className={classNames}>
            {image && (
                <Slot className={cn(elementClassNames.image, cssClasses.image)} element={Image}>
                    {image}
                </Slot>
            )}

            <div className={cn(elementClassNames.main, cssClasses.main)}>
                {title && (
                    <Slot className={cn(elementClassNames.title, cssClasses.title)} element="h2">
                        {title}
                    </Slot>
                )}

                {subtitle && (
                    <Slot className={cn(elementClassNames.subtitle, cssClasses.subtitle)} element="h3">
                        {subtitle}
                    </Slot>
                )}

                {description && (
                    <Slot className={cn(elementClassNames.description, cssClasses.description)} element="p">
                        {description}
                    </Slot>
                )}
            </div>

            {action && (
                <Slot
                    className={cn(elementClassNames.action, cssClasses.action)}
                    element={Button}
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