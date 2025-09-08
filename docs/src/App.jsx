import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import { Provider } from '@/lib';

import Home from './pages/Home.mdx';
import Button from './pages/Button.mdx';

export default function App() {
    return (
        <Router>
            <Provider>
                <div className="app">
                    <nav>
                        <NavLink exact to="/">Home</NavLink>
                        {' / '}
                        <NavLink to="/button">Button</NavLink>
                    </nav>

                    <main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/button" component={Button} />
                        </Switch>
                    </main>
                </div>
            </Provider>
        </Router>
    );
}