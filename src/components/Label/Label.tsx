import type { ReactNode } from 'react';

import { cn } from '../../component';
import type { ComponentProps, Size, TextColor } from '../../types';

import styles from './Label.module.scss';

export type LabelProps = {
    content?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    color?: TextColor | 'inherit';
    size?: Size;
    inline?: boolean;
};

Label.displayName = 'Label';

export default function Label({
    as,
    className,
    children,

    content = children,
    start,
    end,
    color,
    size = 'm',
    inline,
    ...props
}: ComponentProps<LabelProps, 'label'>) {
    const Component = as || 'label';
    const classNames = cn(
        className,
        { color, size, inline },
        styles
    );

    return (
        <Component className={classNames} {...props}>
            {start &&
                <span className={styles.start}>
                    {start}
                </span>
            }

            {content}

            {end &&
                <span className={styles.end}>
                    {end}
                </span>
            }
        </Component>
    );
}