import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import { Button, Provider } from '~/components';
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
                        {/* <header className={styles.header}>
                            <h1 className={styles.title}>UI Components</h1>
                        </header> */}

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
                            <Button
                                icon={`${theme}_mode`}
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            />
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