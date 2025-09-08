import { useState } from 'react';
import {
    TabBar, Tab
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'tabs';
const title = 'Tabs';
const description = 'Tabs organize content across different screens, data sets, and other interactions.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar',
    guide: 'https://material.io/components/tabs'
};

export default function SwitchPage() {
    const [basic, setBasic] = useState(0);
    const [minWidth, setMinWidth] = useState(0);
    const [minWidthIndicator, setMinWidthIndicator] = useState(0);
    const [minWidthWithMinWidthIndicator, setMinWidthWithMinWidthIndicator] = useState(0);
    const [fade, setFade] = useState(0);
    const [icons, setIcons] = useState(0);
    const [stackedIcons, setStackedIcons] = useState(0);
    const [onlyIcons, setOnlyIcons] = useState(0);
    const [iconIndicator, setIconIndicator] = useState(0);
    const [scroll, setScroll] = useState(0);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic tabs">
                <TabBar
                    value={basic}
                    onChange={value => setBasic(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                </TabBar>
            </Demo>

            <Demo title="Min width tabs">
                <TabBar
                    value={minWidth}
                    minWidth
                    onChange={value => setMinWidth(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                </TabBar>
            </Demo>

            <Demo title="Tabs with min width indicator">
                <TabBar
                    value={minWidthIndicator}
                    minWidthIndicator
                    onChange={value => setMinWidthIndicator(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                </TabBar>
            </Demo>

            <Demo title="Min width tabs with min width indicator">
                <TabBar
                    value={minWidthWithMinWidthIndicator}
                    minWidth
                    minWidthIndicator
                    onChange={value => setMinWidthWithMinWidthIndicator(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                </TabBar>
            </Demo>

            <Demo title="Tabs with fading indicator">
                <TabBar
                    value={fade}
                    fade
                    onChange={value => setFade(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                </TabBar>
            </Demo>

            <Demo title="Tabs with icons">
                <TabBar
                    value={icons}
                    onChange={value => setIcons(value)}
                >
                    <Tab
                        icon="star"
                        label="Tab 1"
                    />

                    <Tab
                        icon="favorite"
                        label="Tab 2"
                    />

                    <Tab
                        icon="settings"
                        label="Tab 3"
                    />
                </TabBar>
            </Demo>

            <Demo title="Tabs with stacked icons">
                <TabBar
                    value={stackedIcons}
                    stacked
                    onChange={value => setStackedIcons(value)}
                >
                    <Tab
                        icon="star"
                        label="Tab 1"
                    />

                    <Tab
                        icon="favorite"
                        label="Tab 2"
                    />

                    <Tab
                        icon="settings"
                        label="Tab 3"
                    />
                </TabBar>
            </Demo>

            <Demo title="Tabs with icons only">
                <TabBar
                    value={onlyIcons}
                    indicatorIcon="star"
                    onChange={value => setOnlyIcons(value)}
                >
                    <Tab
                        icon="star"
                    />

                    <Tab
                        icon="favorite"
                    />

                    <Tab
                        icon="settings"
                    />
                </TabBar>
            </Demo>

            <Demo title="Tabs with icon indicator">
                <TabBar
                    value={iconIndicator}
                    onChange={value => setIconIndicator(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                </TabBar>
            </Demo>

            <Demo title="Scrolling tabs">
                <TabBar
                    value={scroll}
                    onChange={value => setScroll(value)}
                >
                    <Tab label="Tab 1" />
                    <Tab label="Tab 2" />
                    <Tab label="Tab 3" />
                    <Tab label="Tab 4" />
                    <Tab label="Tab 5" />
                    <Tab label="Tab 6" />
                    <Tab label="Tab 7" />
                    <Tab label="Tab 8" />
                    <Tab label="Tab 9" />
                    <Tab label="Tab 10" />
                    <Tab label="Tab 11" />
                    <Tab label="Tab 12" />
                    <Tab label="Tab 13" />
                    <Tab label="Tab 14" />
                    <Tab label="Tab 15" />
                </TabBar>
            </Demo>
        </Page>
    );
}