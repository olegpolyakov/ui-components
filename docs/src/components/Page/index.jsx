import { List, Typography } from 'mdc-react';

import './index.scss';

export default function Page({
    id,
    title,
    description,
    links,

    children,
    ...props
}) {
    return (
        <article id={`${id}-page`} className="page" {...props}>
            {title &&
                <header className="page-header">
                    <Typography className="page-title" type="headline4" noMargin>{title}</Typography>

                    {description &&
                        <Typography className="page-description" type="body1" noMargin>{description}</Typography>
                    }

                    {links &&
                        <ul>
                            {links.guide &&
                                <li>
                                    <a href={links.guide} target="_blank" rel="noreferrer">Guide</a>
                                </li>
                            }

                            {links.docs &&
                                <li>
                                    <a href={links.docs} target="_blank" rel="noreferrer">Docs</a>
                                </li>
                            }
                        </ul>
                    }
                </header>
            }

            <div className="page-content">
                {children}
            </div>
        </article>
    );
}