import type { ReactNode } from 'react';

import type { ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './TableRow.module.scss';

export type TableRowProps = {
    content?: ReactNode;
    interactive?: boolean;
};

TableRow.displayName = 'TableRow';

const elementClassNames = getElementClassNames(TableRow.displayName);

export default function TableRow({
    className,
    children,

    content = children,
    interactive,
    ...props
}: ComponentProps<TableRowProps, 'tr'>) {
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root,
        interactive && styles.interactive
    );

    return (
        <tr className={classNames} {...props}>
            {content}
        </tr>
    );
}