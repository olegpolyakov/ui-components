import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from 'react';

import { Button } from '~/components';

import Code from '@/components/Code';

import Settings, { Setting } from './Settings';

import styles from './Demo.module.scss';

export default function Demo<T extends Record<string, any> = Record<string, any>>({
    children,
    settings,
    setup,
    ...props
}: {
    settings?: Setting[];
    setup?: ReactNode | ((data: T, setData: (data: T) => void) => ReactNode);
    children?: ReactElement | ((data: T, setData: (data: T) => void) => ReactElement);
}) {
    const [settingsData, setSettingsData] = useState<T>({} as T);
    const [isCodeOpen, setCodeOpen] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const setupContent = typeof setup === 'function'
        ? setup(settingsData, setSettingsData)
        : setup;
    const content = typeof children === 'function'
        ? children(settingsData, setSettingsData)
        : isValidElement(children)
            ? cloneElement(children as ReactElement, settingsData)
            : children;

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
                {setupContent}
                {content}
            </div>

            {isCodeOpen &&
                <div className={styles.code}>
                    <Code lang="jsx">
                        {content as ReactElement}
                    </Code>
                </div>
            }

            {settings &&
                <div
                    className={styles.aside}
                    style={{
                        display: isSettingsOpen ? 'block' : 'none'
                    }}
                >
                    <Settings<T>
                        settings={settings}
                        onChange={setSettingsData}
                    />
                </div>
            }
        </div>
    );
}
