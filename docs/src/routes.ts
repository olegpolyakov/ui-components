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
import Checkbox from './pages/Checkbox.mdx';
import Dialog from './pages/Dialog.mdx';
import Divider from './pages/Divider.mdx';
import Flex from './pages/Flex.mdx';
import Label from './pages/Label.mdx';

export default [
    { path: '/', component: Home, title: 'Home', exact: true },
    { path: '/accordion', component: Accordion, title: 'Accordion'  },
    { path: '/alert', component: Alert, title: 'Alert'  },
    { path: '/avatar', component: Avatar, title: 'Avatar'  },
    { path: '/avatar-group', component: AvatarGroup, title: 'Avatar Group'  },
    { path: '/badge', component: Badge, title: 'Badge'  },
    { path: '/breadcrumbs', component: Breadcrumbs, title: 'Breadcrumbs'  },
    { path: '/button', component: Button, title: 'Button'  },
    { path: '/button-group', component: ButtonGroup, title: 'Button Group'  },
    { path: '/card', component: Card, title: 'Card'  },
    { path: '/checkbox', component: Checkbox, title: 'Checkbox'  },
    { path: '/dialog', component: Dialog, title: 'Dialog'  },
    { path: '/divider', component: Divider, title: 'Divider'  },
    { path: '/flex', component: Flex, title: 'Flex'  },
    { path: '/label', component: Label, title: 'Label'  }
];