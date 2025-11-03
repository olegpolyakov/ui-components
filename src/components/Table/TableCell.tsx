import type { ReactNode } from 'react';

import type { ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './TableCell.module.scss';

export type TableCellProps = {
    content?: ReactNode;
    header?: boolean;
    alignH?: 'left' | 'center' | 'right';
    alignV?: 'top' | 'middle' | 'bottom';
};;

TableCell.displayName = 'TableCell';

const elementClassNames = getElementClassNames(TableCell.displayName);

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
        elementClassNames.root,
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