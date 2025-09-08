import {
    Checkbox,
    List, ListItem,
    Radio,
    Switch
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'list';
const title = 'List';
const description = 'Lists present multiple line items vertically as a single continuous element.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-list',
    guide: 'https://material.io/components/lists'
};

export default function ListPage() {
    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Single-line list">
                <List>
                    <ListItem
                        text="Item 1"
                    />

                    <ListItem
                        text="Item 2"
                    />

                    <ListItem
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="Two-line list">
                <List>
                    <ListItem
                        primaryText="Item 1"
                        secondaryText="Secondary text"
                    />

                    <ListItem
                        primaryText="Item 2"
                        secondaryText="Secondary text"
                    />

                    <ListItem
                        primaryText="Item 3"
                        secondaryText="Secondary text"
                    />
                </List>

                <List>
                    <ListItem
                        overlineText="Overline"
                        primaryText="Item 1"
                    />

                    <ListItem
                        overlineText="Overline"
                        primaryText="Item 2"
                    />

                    <ListItem
                        overlineText="Overline"
                        primaryText="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="Three-line list">
                <List>
                    <ListItem
                        overlineText="Overline"
                        primaryText="Item 1"
                        secondaryText="Secondary text"
                    />

                    <ListItem
                        overlineText="Overline"
                        primaryText="Item 2"
                        secondaryText="Secondary text"
                    />

                    <ListItem
                        overlineText="Overline"
                        primaryText="Item 3"
                        secondaryText="Secondary text"
                    />
                </List>
            </Demo>

            <Demo title="List with icons">
                <List>
                    <ListItem
                        icon="star"
                        text="Item 1"
                    />

                    <ListItem
                        icon="star"
                        text="Item 2"
                    />

                    <ListItem
                        icon="star"
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with images">
                <List>
                    <ListItem
                        image={
                            <img src="https://placeimg.com/56/56/any" />
                        }
                        text="Item 1"
                    />

                    <ListItem
                        image={
                            <img src="https://placeimg.com/56/56/any" />
                        }
                        text="Item 2"
                    />

                    <ListItem
                        image={
                            <img src="https://placeimg.com/56/56/any" />
                        }
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with thumbnails">
                <List>
                    <ListItem
                        thumbnail={
                            <img src="https://placeimg.com/40/40/people" />
                        }
                        text="Item 1"
                    />

                    <ListItem
                        thumbnail={
                            <img src="https://placeimg.com/40/40/people" />
                        }
                        text="Item 2"
                    />

                    <ListItem
                        thumbnail={
                            <img src="https://placeimg.com/40/40/people" />
                        }
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with videos">
                <List>
                    <ListItem
                        video={
                            <img src="https://placeimg.com/100/56/people" />
                        }
                        text="Item 1"
                    />

                    <ListItem
                        video={
                            <img src="https://placeimg.com/100/56/people" />
                        }
                        text="Item 2"
                    />

                    <ListItem
                        video={
                            <img src="https://placeimg.com/100/56/people" />
                        }
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with checkboxes">
                <List>
                    <ListItem
                        leadingCheckbox={
                            <Checkbox defaultChecked={false} />
                        }
                        text="Item 1"
                    />

                    <ListItem
                        leadingCheckbox={
                            <Checkbox defaultChecked={false} />
                        }
                        text="Item 2"
                    />

                    <ListItem
                        leadingCheckbox={
                            <Checkbox defaultChecked={false} />
                        }
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with radios">
                <List>
                    <ListItem
                        leadingRadio={
                            <Radio />
                        }
                        text="Item 1"
                    />

                    <ListItem
                        leadingRadio={
                            <Radio checked />
                        }
                        text="Item 2"
                    />

                    <ListItem
                        leadingRadio={
                            <Radio />
                        }
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with switches">
                <List>
                    <ListItem
                        leadingSwitch={
                            <Switch />
                        }
                        text="Item 1"
                    />

                    <ListItem
                        leadingSwitch={
                            <Switch checked />
                        }
                        text="Item 2"
                    />

                    <ListItem
                        leadingSwitch={
                            <Switch />
                        }
                        text="Item 3"
                    />
                </List>
            </Demo>

            <Demo title="List with trailing icons">
                <List>
                    <ListItem
                        text="Item 1"
                        trailingIcon="info"
                    />

                    <ListItem
                        text="Item 2"
                        trailingIcon="info"
                    />

                    <ListItem
                        text="Item 3"
                        trailingIcon="info"
                    />
                </List>
            </Demo>

            <Demo title="List with trailing meta">
                <List>
                    <ListItem
                        text="Item 1"
                        meta="Meta"
                    />

                    <ListItem
                        text="Item 2"
                        meta="Meta"
                    />

                    <ListItem
                        text="Item 3"
                        meta="Meta"
                    />
                </List>
            </Demo>

            <Demo title="List with trailing checkboxes">
                <List>
                    <ListItem
                        text="Item 1"
                        trailingCheckbox={
                            <Checkbox />
                        }
                    />

                    <ListItem
                        text="Item 2"
                        trailingCheckbox={
                            <Checkbox checked />
                        }
                    />

                    <ListItem
                        text="Item 3"
                        trailingCheckbox={
                            <Checkbox />
                        }
                    />
                </List>
            </Demo>

            <Demo title="List with trailing radios">
                <List>
                    <ListItem
                        text="Item 1"
                        trailingRadio={
                            <Radio />
                        }
                    />

                    <ListItem
                        text="Item 2"
                        trailingRadio={
                            <Radio checked />
                        }
                    />

                    <ListItem
                        text="Item 3"
                        trailingRadio={
                            <Radio />
                        }
                    />
                </List>
            </Demo>

            <Demo title="List with trailing switches">
                <List>
                    <ListItem
                        text="Item 1"
                        trailingSwitch={
                            <Switch />
                        }
                    />

                    <ListItem
                        text="Item 2"
                        trailingSwitch={
                            <Switch selected />
                        }
                    />

                    <ListItem
                        text="Item 3"
                        trailingSwitch={
                            <Switch />
                        }
                    />
                </List>
            </Demo>
        </Page>
    );
}