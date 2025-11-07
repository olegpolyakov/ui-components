import { cloneElement, isValidElement, useState, type ReactElement } from 'react';

import { classnames as cn } from '~/utils';

import { Button, Drawer } from '~/components';

import Code from '@/components/Code';
import Settings, { Setting } from '@/components/Settings';

import styles from './Demo.module.scss';

export default function Demo<T extends Record<string, any> = Record<string, any>>({
    children,
    settings,
    setup,
    wrap,
    align,
    ...props
}: {
    settings?: Record<string, Setting>;
    align?: 'start' | 'center' | 'end';
    setup?: ReactElement | ((data: T, setData: (data: T) => void) => ReactElement);
    wrap?: ReactElement | ((content: ReactElement, data: T) => ReactElement);
    children?: ReactElement | ((data: T, setData: (data: T) => void) => ReactElement);
}) {
    const [settingsData, setSettingsData] = useState<T>({} as T);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isCodeOpen, setCodeOpen] = useState(false);

    const setupContent = typeof setup === 'function'
        ? setup(settingsData, setSettingsData)
        : setup;
    const content = typeof children === 'function'
        ? children(settingsData, setSettingsData)
        : isValidElement(children)
            ? cloneElement(children as ReactElement, settingsData)
            : children;
    const wrappedContent = typeof wrap === 'function'
        ? wrap(content as ReactElement, settingsData)
        : isValidElement(wrap)
            ? cloneElement(wrap as ReactElement, {}, content as ReactElement)
            : content;

    return (
        <div className={cn(styles.root, align && styles[`align-${align}`])} {...props}>
            <div className={styles.main}>
                <div className={styles.actions}>
                    <Button
                        icon={isCodeOpen ? 'code_off' : 'code'}
                        title={isCodeOpen ? 'Hide code' : 'Show code'}
                        size="s"
                        onClick={() => setCodeOpen(v => !v)}
                    />

                    {settings && !isSettingsOpen &&
                        <Button
                            icon="settings"
                            title="Open settings"
                            size="s"
                            onClick={() => setSettingsOpen(true)}
                        />
                    }
                </div>
                

                {setupContent}
                {wrappedContent}
            </div>

            {isCodeOpen &&
                <div className={styles.code}>
                    <Code lang="jsx">
                        {content as ReactElement}
                    </Code>
                </div>
            }

            {settings && isSettingsOpen &&
                <Drawer
                    className={styles.drawer}
                    title="Settings"
                    position="right"
                    type="inline"
                    onClose={() => setSettingsOpen(false)}
                >
                    <Settings<T>
                        data={isValidElement(content) ? (content.props as T) : {} as T}
                        settings={settings}
                        onChange={setSettingsData}
                    />
                </Drawer>
            }
        </div>
    );
}
