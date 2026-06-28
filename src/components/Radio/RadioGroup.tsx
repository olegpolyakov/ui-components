import { cn, resolveChildren } from '../../component';
import type { Align, ComponentProps, ElementType, Orientation, PropsWithKey, Size } from '../../types';

import Radio, { RadioProps } from './Radio';

import styles from './RadioGroup.module.scss';

export type RadioGroupProps = {
    name?: string;
    radios?: PropsWithKey<RadioProps>[];
    size?: RadioProps['size'];
    align?: Align;
    orientation?: Orientation;
    gap?: Size;
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
    gap = size,
    ...props
}: ComponentProps<RadioGroupProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        {
            [`${orientation}-${align}`]: true,
            gap
        },
        styles
    );

    return (
        <Root className={classNames} {...props}>
            {resolveChildren(children, radios, Radio).map(({ key, ...props }) =>
                <Radio
                    key={key}
                    className={styles.radio}
                    name={name}
                    size={size}
                    {...props}
                />
            )}
        </Root>
    );
}