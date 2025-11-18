import { useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';

import { Button, Heading, List, Provider } from '~/components';

import styles from './App.module.scss';

import routes from './routes';
import type { Theme } from '~/types';

export default function App() {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <Provider theme={theme}>
            <Router basename={import.meta.env.BASE_URL}>
                <div className={styles.root}>
                    <aside className={styles.aside}>
                        <header className={styles.header}>
                            <Heading
                                className={styles.title}
                                content="Kantan UI"
                                size="m"
                            />

                            <Button
                                icon={`${theme}_mode`}
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            />
                        </header>

                        <Nav />

                        <footer className={styles.footer}>
                            
                        </footer>
                    </aside>

                    <main className={styles.main}>
                        <article className="markdown">
                            <Switch>
                                {routes.map(route => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                    />
                                ))}
                            </Switch>
                        </article>
                    </main>
                </div>
            </Router>
        </Provider>
    );
}

function Nav() {
    const location = useLocation();

    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        ref.current
            ?.querySelector('[data-active="true"]')
            ?.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, []);

    return (
        <List ref={ref} className={styles.nav} as="nav">
            {routes.map(route => (
                <List.Item
                    key={route.path}
                    className={styles.link}
                    as={Link}
                    to={route.path}
                    content={route.title}
                    shape="rectangular"
                    active={location.pathname === route.path}
                    interactive
                />
            ))}
        </List>
    );
}