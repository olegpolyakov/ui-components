import Home from './pages/Home.mdx';
import Colors from './pages/Colors.mdx';
import Palettes from './pages/Palettes.mdx';

import Accordion from './pages/Accordion.mdx';
import Alert from './pages/Alert.mdx';
import Avatar from './pages/Avatar.mdx';
import AvatarGroup from './pages/AvatarGroup.mdx';
import Badge from './pages/Badge.mdx';
import Box from './pages/Box.mdx';
import Breadcrumbs from './pages/Breadcrumbs.mdx';
import Button from './pages/Button.mdx';
import ButtonGroup from './pages/ButtonGroup.mdx';
import Card from './pages/Card.mdx';
import Checkbox from './pages/Checkbox.mdx';
import Combobox from './pages/Combobox.mdx';
import Dialog from './pages/Dialog.mdx';
import Divider from './pages/Divider.mdx';
import Drawer from './pages/Drawer.mdx';
import Field from './pages/Field.mdx';
import Flex from './pages/Flex.mdx';
import Grid from './pages/Grid.mdx';
import Heading from './pages/Heading.mdx';
import Icon from './pages/Icon.mdx';
import Image from './pages/Image.mdx';
import Input from './pages/Input.mdx';
import Item from './pages/Item.mdx';
import Label from './pages/Label.mdx';
import Link from './pages/Link.mdx';
import List from './pages/List.mdx';
import Menu from './pages/Menu.mdx';
import Pill from './pages/Pill.mdx';
import Popover from './pages/Popover.mdx';
import ProgressBar from './pages/ProgressBar.mdx';
import ProgressCircle from './pages/ProgressCircle.mdx';
import Radio from './pages/Radio.mdx';
import Select from './pages/Select.mdx';
import Slider from './pages/Slider.mdx';
import Spinner from './pages/Spinner.mdx';
import State from './pages/State.mdx';
import Switch from './pages/Switch.mdx';
import Table from './pages/Table.mdx';
import Tabs from './pages/Tabs.mdx';
import Text from './pages/Text.mdx';
import Textarea from './pages/Textarea.mdx';
import Toast from './pages/Toast.mdx';
import Tooltip from './pages/Tooltip.mdx';

export default [
    {
        type: 'section',
        name: 'Base',
        routes: [
            { path: '/', component: Home, title: 'Home', exact: true, hidden: true },
            { path: '/colors', component: Colors, title: 'Colors' },
            { path: '/palettes', component: Palettes, title: 'Palettes' }
        ]
    },
    {
        type: 'section',
        name: 'Components',
        routes: [
            { path: '/accordion', component: Accordion, title: 'Accordion' },
            { path: '/alert', component: Alert, title: 'Alert' },
            { path: '/avatar', component: Avatar, title: 'Avatar' },
            { path: '/avatar-group', component: AvatarGroup, title: 'Avatar Group' },
            { path: '/badge', component: Badge, title: 'Badge' },
            { path: '/box', component: Box, title: 'Box' },
            { path: '/breadcrumbs', component: Breadcrumbs, title: 'Breadcrumbs' },
            { path: '/button', component: Button, title: 'Button' },
            { path: '/button-group', component: ButtonGroup, title: 'Button Group' },
            { path: '/card', component: Card, title: 'Card' },
            { path: '/checkbox', component: Checkbox, title: 'Checkbox' },
            { path: '/combobox', component: Combobox, title: 'Combobox' },
            { path: '/dialog', component: Dialog, title: 'Dialog' },
            { path: '/divider', component: Divider, title: 'Divider' },
            { path: '/drawer', component: Drawer, title: 'Drawer' },
            { path: '/field', component: Field, title: 'Field' },
            { path: '/flex', component: Flex, title: 'Flex' },
            { path: '/grid', component: Grid, title: 'Grid' },
            { path: '/heading', component: Heading, title: 'Heading' },
            { path: '/icon', component: Icon, title: 'Icon' },
            { path: '/image', component: Image, title: 'Image' },
            { path: '/input', component: Input, title: 'Input' },
            { path: '/item', component: Item, title: 'Item' },
            { path: '/label', component: Label, title: 'Label' },
            { path: '/link', component: Link, title: 'Link' },
            { path: '/list', component: List, title: 'List' },
            { path: '/menu', component: Menu, title: 'Menu' },
            { path: '/pill', component: Pill, title: 'Pill' },
            { path: '/popover', component: Popover, title: 'Popover' },
            { path: '/progress-bar', component: ProgressBar, title: 'Progress Bar' },
            { path: '/progress-circle', component: ProgressCircle, title: 'Progress Circle' },
            { path: '/radio', component: Radio, title: 'Radio' },
            { path: '/select', component: Select, title: 'Select' },
            { path: '/slider', component: Slider, title: 'Slider' },
            { path: '/spinner', component: Spinner, title: 'Spinner' },
            { path: '/state', component: State, title: 'State' },
            { path: '/switch', component: Switch, title: 'Switch' },
            { path: '/table', component: Table, title: 'Table' },
            { path: '/tabs', component: Tabs, title: 'Tabs' },
            { path: '/text', component: Text, title: 'Text' },
            { path: '/textarea', component: Textarea, title: 'Textarea' },
            { path: '/toast', component: Toast, title: 'Toast' },
            { path: '/tooltip', component: Tooltip, title: 'Tooltip' }
        ]
    }
];