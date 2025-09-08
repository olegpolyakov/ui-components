import { useState } from 'react';
import {
    Card,
    IconButton,
    SideSheet,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import Code from '@/components/Code';

import './index.scss';

export default function Demo({
    title = 'Demo',
    description,
    setup,
    settings,
    code,
    children = code,
    ...props
}) {
    const [isCodeOpen, setCodeOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const classNames = classnames('demo', {
        'demo--with-settings': settings
    });

    return (
        <Card element="article" className={classNames} outlined {...props}>
            <Card.Header
                title={title}
                actions={[
                    <IconButton
                        key="code"
                        icon={isCodeOpen ? 'code_off' : 'code'}
                        title={isCodeOpen ? 'Hide code' : 'Show code'} onClick={() => setCodeOpen(v => !v)}
                    />,
                    settings ?
                        <IconButton
                            key="settings"
                            icon="settings"
                            title="Настройки"
                            onClick={() => setSettingsOpen(true)}
                        /> : null
                ]}
            />

            {description &&
                <Card.Section secondary>
                    <Typography noMargin>{description}</Typography>
                </Card.Section>
            }

            <Card.Section primary>
                {setup}
                {children}
            </Card.Section>

            {isCodeOpen &&
                <Card.Section secondary>
                    <Code lang="jsx">{children}</Code>
                </Card.Section>
            }

            {settings &&
                <SideSheet
                    title="Settings"
                    open={isSettingsOpen}
                    // appear
                    closeIcon="close"
                    onClose={() => setSettingsOpen(false)}
                    dismissible
                >
                    <SideSheet.Content>
                        {settings}
                    </SideSheet.Content>
                </SideSheet>
            }
        </Card>
    );
}