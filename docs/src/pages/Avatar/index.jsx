import { useState } from 'react';
import {
    Avatar,
    SegmentedButton
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'avatar';
const title = 'Avatar';
const description = 'Avatars are found throughout material design with uses in everything from tables to dialog menus.';

export default function AvatarPage() {
    const [size, setSize] = useState('medium');
    const [content, setContent] = useState('image');

    return (
        <Page
            id={id}
            title={title}
            description={description}
        >
            <Demo
                title="Demo"
                settings={<>
                    <FieldSet legend="Content">
                        <SegmentedButton
                            segments={[
                                { value: 'image', label: 'Image' },
                                { value: 'icon', label: 'Icon' },
                                { value: 'text', label: 'Text' }
                            ]}
                            value={content}
                            onChange={setContent}
                        />
                    </FieldSet>

                    <FieldSet legend="Size">
                        <SegmentedButton
                            segments={[
                                { value: 'small', label: 'Small' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'large', label: 'Large' }
                            ]}
                            value={size}
                            onChange={setSize}
                        />
                    </FieldSet>
                </>}
            >
                <Avatar
                    image={content === 'image' ? 'https://placeimg.com/128/128/people' : undefined}
                    icon={content === 'icon' ? 'star' : undefined}
                    text={content === 'text' ? 'MD' : undefined}
                    size={size}
                />
            </Demo>
        </Page>
    );
}