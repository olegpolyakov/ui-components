import { cn, resolveChildren } from '../../component';
import type { ComponentProps, ElementType, PropsWithKey, Size } from '../../types';

import Pill, { type PillProps } from './Pill';

import styles from './PillGroup.module.scss';

export type PillGroupProps = {
    pills?: PropsWithKey<PillProps>[];
    color?: PillProps['color'];
    shape?: PillProps['shape'];
    size?: PillProps['size'];
    variant?: PillProps['variant'];
    gap?: Size;
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
    gap,
    maxCount = 0,
    interactive,
    ...props
}: ComponentProps<PillGroupProps, T>) {
    const resolvedChildren = resolveChildren(children, pills);
    const shownChildren = (maxCount > 0 && resolvedChildren.length > maxCount)
        ? resolvedChildren.slice(0, maxCount)
        : resolvedChildren;
    const hiddenCount = resolvedChildren.length - shownChildren.length;
    
    const Root = as || 'div';
    const classNames = cn(className, {
        gap
    }, styles);

    return (
        <Root className={classNames} {...props}>
            {shownChildren?.map(pill =>
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

            {hiddenCount > 0 &&
                <Pill
                    className={styles.pill}
                    content={`+${hiddenCount}`}
                    shape={shape}
                    size={size}
                    variant={variant}
                />
            }
        </Root>
    );
}