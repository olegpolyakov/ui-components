import { Children, cloneElement, isValidElement } from 'react';

import type { Align, ComponentProps, ElementType, Orientation, PropsWithKey } from '../../types';
import { cn } from '../../utils';

import Radio from './Radio';

import styles from './RadioGroup.module.scss';

type RadioProps = Parameters<typeof Radio>[0];

export type RadioGroupProps = {
    name?: string;
    radios?: PropsWithKey<RadioProps>[];
    size?: RadioProps['size'];
    align?: Align;
    orientation?: Orientation;
};

RadioGroup.displayName = 'RadioGroup';

export default function RadioGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    name,
    radios = [],
    size,
    align = 'start',
    orientation = 'horizontal',
    ...props
}: ComponentProps<RadioGroupProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className, 
        styles.root,
        styles[`${orientation}-${align}`]
    );

    return (
        <Root className={classNames} {...props}>
            {radios?.map(({ key, ...props }) =>
                <Radio
                    key={key}
                    className={styles.radio}
                    name={name}
                    size={size}
                    {...props}
                />
            )}

            {Children.map(children, child =>
                isValidElement<RadioProps>(child) &&
                cloneElement<RadioProps>(child, {
                    className: cn(child.props.className, styles.radio),
                    name,
                    size
                })
            )}
        </Root>
    );
}