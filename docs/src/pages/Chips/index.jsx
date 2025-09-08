import { useState } from 'react';
import {
    Avatar,
    ChipSet, Chip
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'chips';
const title = 'Chips';
const description = 'Chips are compact elements that allow users to enter information, select a choice, filter content, or trigger an action.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips',
    guide: 'https://material.io/components/chips'
};

export default function ChipsPage() {
    const [choiceChip, setChoiceChips] = useState('foo');
    const [filterChips, setFilterChips] = useState(['foo']);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic chips">
                <ChipSet>
                    <Chip text="Foo" />
                    <Chip text="Bar" />
                    <Chip text="Baz" />
                </ChipSet>
            </Demo>

            <Demo title="Chips with icons">
                <ChipSet>
                    <Chip text="Foo" icon="star" />
                    <Chip text="Bar" icon="star" />
                    <Chip text="Baz" icon="star" />
                </ChipSet>
            </Demo>

            <Demo title="Chips with trailing icons">
                <ChipSet>
                    <Chip text="Foo" trailingIcon="delete" />
                    <Chip text="Bar" trailingIcon="delete" />
                    <Chip text="Baz" trailingIcon="delete" />
                </ChipSet>
            </Demo>

            <Demo title="Chips with avatars">
                <ChipSet>
                    <Chip text="Foo" avatar={<Avatar image="https://placeimg.com/128/128/people" size="small" />} />
                    <Chip text="Bar" avatar={<Avatar image="https://placeimg.com/128/128/people" size="small" />} />
                    <Chip text="Baz" avatar={<Avatar image="https://placeimg.com/128/128/people" size="small" />} />
                </ChipSet>
            </Demo>

            <Demo title="Choice chips">
                <ChipSet value={choiceChip} onChange={value => setChoiceChips(value)}>
                    <Chip value="foo" text="Foo" />
                    <Chip value="bar" text="Bar" />
                    <Chip value="baz" text="Baz" />
                </ChipSet>
            </Demo>

            <Demo title="Filter chips">
                <ChipSet value={filterChips} onChange={value => setFilterChips(value)}>
                    <Chip value="foo" text="Foo" />
                    <Chip value="bar" text="Bar" />
                    <Chip value="baz" text="Baz" />
                </ChipSet>
            </Demo>
        </Page>
    );
}