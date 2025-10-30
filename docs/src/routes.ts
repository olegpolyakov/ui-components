import Home from './pages/Home.mdx';
import Accordion from './pages/Accordion.mdx';
import Alert from './pages/Alert.mdx';
import Avatar from './pages/Avatar.mdx';
import AvatarGroup from './pages/AvatarGroup.mdx';
import Badge from './pages/Badge.mdx';
import Breadcrumbs from './pages/Breadcrumbs.mdx';
import Button from './pages/Button.mdx';
import ButtonGroup from './pages/ButtonGroup.mdx';
import Card from './pages/Card.mdx';

export default [
    { path: '/', component: Home, title: 'Home', exact: true },
    { path: '/accordion', component: Accordion, title: 'Accordion', exact: true },
    { path: '/alert', component: Alert, title: 'Alert', exact: true },
    { path: '/avatar', component: Avatar, title: 'Avatar', exact: true },
    { path: '/avatar-group', component: AvatarGroup, title: 'Avatar Group', exact: true },
    { path: '/badge', component: Badge, title: 'Badge', exact: true },
    { path: '/breadcrumbs', component: Breadcrumbs, title: 'Breadcrumbs', exact: true },
    { path: '/button', component: Button, title: 'Button', exact: true },
    { path: '/button-group', component: ButtonGroup, title: 'Button Group', exact: true },
    { path: '/card', component: Card, title: 'Card', exact: true }
];