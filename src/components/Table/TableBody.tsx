import type { ReactNode } from 'react';

import type { ComponentProps } from '../../types';
import { cn } from '../../utils';

import styles from './TableBody.module.scss';

export type TableBodyProps = {
    content?: ReactNode;
};

TableBody.displayName = 'TableBody';

export default function TableBody({
    children,
    className,

    content = children,
    ...props
}: ComponentProps<TableBodyProps, 'tbody'>) {
    const classNames = cn(
        className,
        styles.root
    );

    return (
        <tbody className={classNames} {...props}>
            {content}
        </tbody>
    );
}