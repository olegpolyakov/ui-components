import type { ReactNode } from 'react';

import { cn } from '../../component';
import type { ComponentProps } from '../../types';

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
        {},
        styles
    );

    return (
        <tbody className={classNames} {...props}>
            {content}
        </tbody>
    );
}