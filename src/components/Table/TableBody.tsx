import type { ReactNode } from 'react';

import type { ComponentProps } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import styles from './TableBody.module.scss';

export type TableBodyProps = {
    content?: ReactNode;
};

TableBody.displayName = 'TableBody';

const elementClassNames = getElementClassNames(TableBody.displayName);

export default function TableBody({
    children,
    className,

    content = children,
    ...props
}: ComponentProps<TableBodyProps, 'tbody'>) {
    const classNames = cn(
        className,
        elementClassNames.root,
        styles.root
    );

    return (
        <tbody className={classNames} {...props}>
            {content}
        </tbody>
    );
}