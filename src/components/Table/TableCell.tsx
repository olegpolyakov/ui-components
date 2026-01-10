import type { ReactNode } from 'react';

import type { ComponentProps } from '../../types';
import { cn } from '../../utils';

import styles from './TableCell.module.scss';

export type TableCellProps = {
    content?: ReactNode;
    header?: boolean;
    alignH?: 'left' | 'center' | 'right';
    alignV?: 'top' | 'middle' | 'bottom';
};;

TableCell.displayName = 'TableCell';

export default function TableCell({
    className,
    children,

    content = children,
    header,
    alignH,
    alignV,
    ...props
}: ComponentProps<TableCellProps, 'td'>) {
    const Root = header ? 'th' : 'td';
    const classNames = cn(
        className,
        styles.root,
        alignH && styles[alignH],
        alignV && styles[alignV]
    );

    return (
        <Root className={classNames} {...props}>
            {content}
        </Root>
    );
}