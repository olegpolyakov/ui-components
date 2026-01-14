import styles from './ToastGroup.module.scss';

export default function ToastGroup({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.root}>{children}</div>
    );
}