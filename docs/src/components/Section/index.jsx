import { Typography } from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

export default function Section({ title, children, className, ...props }) {
    const classNames = classnames('section', className);

    return (
        <section className={classNames} {...props}>
            {title &&
                <Typography className="section-title" type="headline6">{title}</Typography>
            }

            {children}
        </section>
    );
}