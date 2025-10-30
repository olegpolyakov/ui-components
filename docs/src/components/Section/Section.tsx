import classnames from 'classnames';

import styles from './Section.module.scss';

export default function Section({
    title,
    description,
    content,
    children = content,
    className,
    ...props
}: {
    title?: string;
    description?: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}) {
    const classNames = classnames(styles.section, className);

    return (
        <section className={classNames} {...props}>
            {title &&
                <h2 className={styles.title}>{title}</h2>
            }

            {description &&
                <p>{description}</p>
            }

            {children}
        </section>
    );
}