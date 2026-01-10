import type { ReactNode } from 'react';

import { ComponentProps } from '../../types';
import { cn } from '../../utils';

import styles from './TableHead.module.scss';

export type TableHeadProps = {
    content?: ReactNode;
};

TableHead.displayName = 'TableHead';

export default function TableHead({
    className,
    children,

    content = children,
    ...props
}: ComponentProps<TableHeadProps, 'thead'>) {
    const classNames = cn(
        className,
        styles.root
    );

    return (
        <thead className={classNames} {...props}>
            {content}
        </thead>
    );
}