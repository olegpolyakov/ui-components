import type { ReactNode } from 'react';

import { ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './TableHead.module.scss';

export type TableHeadProps = {
    content?: ReactNode;
};

TableHead.displayName = 'TableHead';

const elementClassNames = getElementClassNames(TableHead.displayName);

export default function TableHead({
    className,
    children,

    content = children,
    ...props
}: ComponentProps<TableHeadProps, 'thead'>) {
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root
    );

    return (
        <thead className={classNames} {...props}>
            {content}
        </thead>
    );
}