import type { ComponentProps, ElementType, PropsWithKey } from '../../types';
import { cn } from '../../utils';

import Pill, { type PillProps } from './Pill';

import styles from './PillGroup.module.scss';

export type PillGroupProps = {
    pills?: PropsWithKey<PillProps>[];
    shape?: PillProps['shape'];
    size?: PillProps['size'];
    variant?: PillProps['variant'];
    maxCount?: number;
    interactive?: boolean;
};

PillGroup.displayName = 'PillGroup';

export default function PillGroup<T extends ElementType = 'div'>({
    as,
    className,
    children,

    pills = [],
    shape,
    size,
    variant,
    maxCount = 0,
    interactive,
    ...props
}: ComponentProps<PillGroupProps, T>) {
    const shownPills = (maxCount > 0 && pills.length > maxCount)
        ? pills.slice(0, maxCount)
        : pills;
    const hiddenPillsCount = pills.length - shownPills.length;
    
    const Component = as || 'div';
    const classNames = cn(
        className,
        styles.root
    );

    return (
        <Component className={classNames} {...props}>
            {shownPills?.map(pill =>
                <Pill
                    key={pill.key}
                    className={styles.pill}
                    shape={shape}
                    size={size}
                    variant={variant}
                    interactive={interactive}
                    {...pill}
                />
            )}

            {hiddenPillsCount > 0 &&
                <Pill
                    className={styles.pill}
                    content={`+${hiddenPillsCount}`}
                    shape={shape}
                    size={size}
                    variant={variant}
                />
            }

            {children}
        </Component>
    );
}