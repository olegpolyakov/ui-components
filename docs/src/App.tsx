import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import { Heading, Button, Provider } from '~/components';
import { useTheme } from '~/hooks/theme';

import styles from './App.module.scss';

import routes from './routes';

export default function App() {
    const [theme, setTheme] = useTheme('light');

    return (
        <Provider>
            <Router>
                <div className={styles.root}>
                    <aside className={styles.aside}>
                        <header className={styles.header}>
                            <Heading
                                className={styles.title}
                                content="Kantan UI"
                            />

                            <Button
                                icon={`${theme}_mode`}
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            />
                        </header>

                        <nav className={styles.nav}>
                            {routes.map(route => (
                                <NavLink
                                    key={route.path}
                                    to={route.path}
                                    exact={route.exact}
                                >
                                    {route.title}
                                </NavLink>
                            ))}
                        </nav>

                        <footer className={styles.footer}>
                            
                        </footer>
                    </aside>

                    <main className={styles.main}>
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
                    </main>
                </div>
            </Router>
        </Provider>
    );
}