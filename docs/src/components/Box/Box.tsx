import type { ReactNode } from 'react';
import styles from './Box.module.scss';

export default function Box({ className, children, ...props }: { className?: string; children: ReactNode }) {
    return <div className={`${styles.root} ${className ?? ''}`} {...props}>{children}</div>;
}