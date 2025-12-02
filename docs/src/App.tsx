import { useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';

import { Button, ButtonGroup, Heading, Item, List, Provider, Text } from '~/components';
import type { Theme } from '~/types';

import styles from './App.module.scss';

import routes from './routes';
import GitHubIcon from './assets/github.svg';

export default function App() {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <Provider theme={theme}>
            <Router basename={import.meta.env.BASE_URL}>
                <div className={styles.root}>
                    <aside className={styles.aside}>
                        <header className={styles.header}>
                            <Heading
                                as={Link}
                                to="/"
                                className={styles.title}
                                content="Kantan UI"
                                size="m"
                            />

                            <ButtonGroup gap="xxs">
                                <Button
                                    icon={`${theme}_mode`}
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                />

                                <Button as="a" href="https://github.com/olegpolyakov/kantanui" target='_blank' icon>
                                    <svg width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" version="1.1">
                                        <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z" fill="currentColor"></path>
                                    </svg>
                                </Button>
                            </ButtonGroup>
                        </header>

                        <Nav />

                        <footer className={styles.footer}>
                            
                        </footer>
                    </aside>

                    <main className={styles.main}>
                        <article className="markdown">
                            <Switch>
                                {routes
                                    .flatMap(route => typeof route === 'object'
                                        ? route.routes || route
                                        : route
                                    ).map(route => (
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
        <nav ref={ref} className={styles.nav}>
            {routes.map(route => <>
                <Text
                    className={styles.subtitle}
                    content={route.name}
                    size="xxs"
                    tone="subtle"
                    decorative
                    uppercase
                />

                <List as="div">
                    {route.routes.filter(route => !route.hidden).map(route => 
                        <Item
                            key={route.path}
                            className={styles.link}
                            as={Link}
                            to={route.path}
                            content={route.title}
                            shape="rectangular"
                            active={location.pathname === route.path}
                            size="m"
                            interactive
                        />
                    )}
                </List>
            </>)}
        </nav>
    );
}