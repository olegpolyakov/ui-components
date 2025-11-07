import type { ComponentProps, ElementType, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Radio, { type RadioProps } from './Radio';

import styles from './RadioGroup.module.scss';

export type RadioGroupProps = {
    name?: string;
    radios?: PropsWithKey<RadioProps>[];
    size?: RadioProps['size'];
    orientation?: 'horizontal' | 'vertical';
};

RadioGroup.displayName = 'RadioGroup';

const elementClassNames = getElementClassNames(RadioGroup.displayName);

export default function RadioGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    name,
    radios = [],
    size,
    orientation,
    ...props
}: ComponentProps<RadioGroupProps, T>) {
    const Root = as || 'div';
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        orientation && styles[orientation]
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

            {children}
        </Root>
    );
}