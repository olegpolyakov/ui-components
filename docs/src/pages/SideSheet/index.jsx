import { useState } from 'react';
import {
    Button,
    SideSheet
} from 'mdc-react';

import Demo from '@/components/Demo';
import FieldSet from '@/components/FieldSet';
import Page from '@/components/Page';

const id = 'side-sheet';
const title = 'Side Sheet';
const description = 'Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen.';
const links = {
    guide: 'https://material.io/components/sheets-side'
};

export default function SideSheetPage() {
    const [isDismissibleOpen, setDismissibleOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo title="Basic side sheet">
                <SideSheet title="Title">
                    Content
                </SideSheet>
            </Demo>

            <Demo title="Dismissible side sheet"
                setup={
                    <Button
                        label="Toggle"
                        outlined
                        onClick={() => setDismissibleOpen(v => !v)}
                    />
                }
            >
                <SideSheet
                    title="Title"
                    closeIcon="close"
                    open={isDismissibleOpen}
                    dismissible
                    onClose={() => setDismissibleOpen(false)}
                >
                    Content
                </SideSheet>
            </Demo>

            <Demo
                title="Modal side sheet"
                setup={
                    <Button
                        label="Open"
                        outlined
                        onClick={() => setModalOpen(true)}
                    />
                }
            >
                <SideSheet
                    title="Title"
                    closeIcon="close"
                    open={isModalOpen}
                    modal
                    onClose={() => setModalOpen(false)}
                >
                    Content
                </SideSheet>
            </Demo>
        </Page>
    );
}