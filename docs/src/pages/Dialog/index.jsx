import { useState } from 'react';
import {
    Button,
    Dialog
} from 'mdc-react';

import Demo from '@/components/Demo';
import Page from '@/components/Page';

const id = 'dialog';
const title = 'Dialog';
const description = 'Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.';
const links = {
    docs: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog',
    guide: 'https://material.io/components/dialogs'
};

const scrollableContent = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum quibusdam dolor hic accusamus, deserunt libero? Deleniti ratione libero, eveniet neque aliquam repellat dicta obcaecati atque, sequi voluptatem explicabo beatae!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi vel cupiditate eveniet? Laudantium recusandae illo minus saepe itaque dolores fugiat, perferendis nostrum! Assumenda fugiat fuga deserunt omnis odit dicta!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium a quisquam in repudiandae et ullam cum dignissimos exercitationem, blanditiis perspiciatis alias hic vel, laudantium aliquam omnis recusandae nemo animi.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum quibusdam dolor hic accusamus, deserunt libero? Deleniti ratione libero, eveniet neque aliquam repellat dicta obcaecati atque, sequi voluptatem explicabo beatae!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi vel cupiditate eveniet? Laudantium recusandae illo minus saepe itaque dolores fugiat, perferendis nostrum! Assumenda fugiat fuga deserunt omnis odit dicta!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium a quisquam in repudiandae et ullam cum dignissimos exercitationem, blanditiis perspiciatis alias hic vel, laudantium aliquam omnis recusandae nemo animi.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum quibusdam dolor hic accusamus, deserunt libero? Deleniti ratione libero, eveniet neque aliquam repellat dicta obcaecati atque, sequi voluptatem explicabo beatae!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi vel cupiditate eveniet? Laudantium recusandae illo minus saepe itaque dolores fugiat, perferendis nostrum! Assumenda fugiat fuga deserunt omnis odit dicta!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium a quisquam in repudiandae et ullam cum dignissimos exercitationem, blanditiis perspiciatis alias hic vel, laudantium aliquam omnis recusandae nemo animi.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum quibusdam dolor hic accusamus, deserunt libero? Deleniti ratione libero, eveniet neque aliquam repellat dicta obcaecati atque, sequi voluptatem explicabo beatae!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi vel cupiditate eveniet? Laudantium recusandae illo minus saepe itaque dolores fugiat, perferendis nostrum! Assumenda fugiat fuga deserunt omnis odit dicta!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium a quisquam in repudiandae et ullam cum dignissimos exercitationem, blanditiis perspiciatis alias hic vel, laudantium aliquam omnis recusandae nemo animi.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum quibusdam dolor hic accusamus, deserunt libero? Deleniti ratione libero, eveniet neque aliquam repellat dicta obcaecati atque, sequi voluptatem explicabo beatae!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi vel cupiditate eveniet? Laudantium recusandae illo minus saepe itaque dolores fugiat, perferendis nostrum! Assumenda fugiat fuga deserunt omnis odit dicta!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium a quisquam in repudiandae et ullam cum dignissimos exercitationem, blanditiis perspiciatis alias hic vel, laudantium aliquam omnis recusandae nemo animi.

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt earum quibusdam dolor hic accusamus, deserunt libero? Deleniti ratione libero, eveniet neque aliquam repellat dicta obcaecati atque, sequi voluptatem explicabo beatae!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi vel cupiditate eveniet? Laudantium recusandae illo minus saepe itaque dolores fugiat, perferendis nostrum! Assumenda fugiat fuga deserunt omnis odit dicta!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium a quisquam in repudiandae et ullam cum dignissimos exercitationem, blanditiis perspiciatis alias hic vel, laudantium aliquam omnis recusandae nemo animi.
`;

export default function DialogPage() {
    const [isBasicOpen, setBasicOpen] = useState(false);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [isStackingOpen, setStackingOpen] = useState(false);
    const [isScrollableOpen, setScrollableOpen] = useState(false);
    const [isFullscreenOpen, setFullscreenOpen] = useState(false);
    const [isFloatingSheetOpen, setFloatingSheetOpen] = useState(false);

    return (
        <Page id={id} title={title} description={description} links={links}>
            <Demo
                title="Basic dialog"
                setup={
                    <Button onClick={() => setBasicOpen(v => !v)}>Open</Button>
                }
            >
                <Dialog
                    title="Title"
                    content="Content"
                    open={isBasicOpen}
                    onClose={() => setBasicOpen(v => !v)}
                />
            </Demo>

            <Demo
                title="Confirmation dialog"
                setup={
                    <Button onClick={() => setConfirmationOpen(v => !v)}>Open</Button>
                }
            >
                <Dialog
                    title="Title"
                    content="Are you sure?"
                    open={isConfirmationOpen}
                    persistent
                    actions={[
                        <Button key="close" onClick={() => setConfirmationOpen(v => !v)}>Close</Button>,
                        <Button key="confirm">Confirm</Button>
                    ]}
                    onClose={() => setConfirmationOpen(v => !v)}
                />
            </Demo>

            <Demo
                title="Dialog with stacking buttons"
                setup={
                    <Button onClick={() => setStackingOpen(v => !v)}>Open</Button>
                }
            >
                <Dialog
                    title="Title"
                    content="Content"
                    open={isStackingOpen}
                    autoStackButtons
                    actions={[
                        <Button key="close" onClick={() => setStackingOpen(v => !v)}>A very very very very very long button</Button>,
                        <Button key="confirm">A very very very very very long button</Button>
                    ]}
                    onClose={() => setStackingOpen(v => !v)}
                />
            </Demo>

            <Demo
                title="Scrollable dialog"
                setup={
                    <Button onClick={() => setScrollableOpen(v => !v)}>Open</Button>
                }
            >
                <Dialog
                    title="Title"
                    open={isScrollableOpen}
                    actions={[
                        <Button key="close" onClick={() => setScrollableOpen(v => !v)}>Close</Button>
                    ]}
                    onClose={() => setScrollableOpen(v => !v)}
                >
                    {scrollableContent}
                </Dialog>
            </Demo>

            <Demo
                title="Fullscreen dialog"
                setup={
                    <Button onClick={() => setFullscreenOpen(v => !v)}>Open</Button>
                }
            >
                <Dialog
                    title="Fullscreen Dialog"
                    open={isFullscreenOpen}
                    fullscreen
                    actions={<Button key="close" onClick={() => setFullscreenOpen(v => !v)}>Close</Button>}
                    onClose={() => setFullscreenOpen(v => !v)}
                >
                    {scrollableContent}
                </Dialog>
            </Demo>

            <Demo
                title="Floating sheet"
                setup={
                    <Button onClick={() => setFloatingSheetOpen(true)}>Open</Button>
                }
            >
                <Dialog
                    open={isFloatingSheetOpen}
                    sheet
                    onClose={() => setFloatingSheetOpen(false)}
                >
                    <h3>Sheets</h3>
                    There are no action buttons. Any HTML content can go here. Title is also defined through content.
                </Dialog>
            </Demo>
        </Page>
    );
}