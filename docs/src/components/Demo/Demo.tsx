import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from 'react';

import { Button } from '~/components';

import Code from '@/components/Code';

import Settings, { Setting } from './Settings';

import styles from './Demo.module.scss';

export default function Demo({
    setup,
    settings,
    code,
    children = code,
    ...props
}: {
    setup?: ReactNode;
    settings?: Setting[];
    code?: ReactNode;
    children?: ReactNode;
}) {
    const [settingsData, setSettingsData] = useState<Record<string, any>>();
    const [isCodeOpen, setCodeOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    return (
        <div className={styles.root} {...props}>
            <div className={styles.controls}>
                <Button
                    key="code"
                    icon={isCodeOpen ? 'code_off' : 'code'}
                    title={isCodeOpen ? 'Hide code' : 'Show code'} onClick={() => setCodeOpen(v => !v)}
                />

                {settings &&
                    <Button
                        key="settings"
                        icon="settings"
                        title="Настройки"
                        onClick={() => setSettingsOpen(v => !v)}
                    />
                }
            </div>

            <div className={styles.main}>
                {setup}

                {isValidElement(children) && settingsData
                    ? cloneElement(children as ReactElement, settingsData)
                    : children
                }
            </div>

            {isCodeOpen &&
                <div className={styles.code}>
                    <Code lang="jsx">
                        {children as ReactElement}
                    </Code>
                </div>
            }

            {settings &&
                <div className={styles.aside} style={{ display: isSettingsOpen ? 'block' : 'none' }}>
                    <Settings
                        settings={settings}
                        onChange={setSettingsData}
                    />
                </div>
            }
        </div>
    );
}
