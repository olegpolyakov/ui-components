import { cloneElement, isValidElement, useMemo, useState, type ReactElement } from 'react';

import { Button, Drawer } from '~/components';
import { classnames as cn } from '~/utils';

import Code from '@/components/Code';
import Settings, { Setting } from '@/components/Settings';

import styles from './Demo.module.scss';

const filteredOutSettingNames = [
    'as',
    'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
    'ar'
];

type Props = Record<string, any>;

export default function Demo<T extends Props = Props>({
    children,
    settings = {},
    align,
    setup,
    wrap,
    props,
    ...rest
}: {
    settings?: Record<string, Setting>;
    align?: 'start' | 'center' | 'end';
    setup?: ReactElement | ((data: T, setData: (data: T) => void) => ReactElement);
    wrap?: ReactElement | ((content: ReactElement, data: T) => ReactElement);
    props?: T;
    children?: ReactElement | ((data: T, setData: (data: T) => void) => ReactElement);
}) {
    const filteredSettings = useMemo(() =>
        Object.values(settings).filter(setting =>
            !filteredOutSettingNames.includes(setting.name) &&
            !setting.name.startsWith('on') &&
            !setting.type.name.endsWith('Props') &&
            !setting.type.name.includes('[]') &&
            !setting.name.includes('Ref') &&
            !setting.name.includes('Element')
        ),
    [settings]);

    const [data, setData] = useState(() => {
        const initialData = typeof children === 'function'
            ? children({} as T, () => {}).props as T
            : isValidElement(children)
                ? (children.props as T)
                : {} as T;

        return filteredSettings
            .reduce((acc, setting) => {
                acc[setting.name] = initialData?.[setting.name] ?? setting.defaultValue?.value ?? undefined;
                return acc;
            }, {} as Record<string, any>) as T;
    });
    
    const [isSettingsOpen, setSettingsOpen] = useState(true);
    const [isCodeOpen, setCodeOpen] = useState(false);

    const setupContent = typeof setup === 'function'
        ? setup(data, setData)
        : setup;
    const content = typeof children === 'function'
        ? children(data, setData)
        : isValidElement(children)
            ? cloneElement(children as ReactElement, data)
            : children;
    const enhancedContent = props
        ? cloneElement(content as ReactElement, props)
        : content;
    const wrappedContent = typeof wrap === 'function'
        ? wrap(enhancedContent as ReactElement, data)
        : isValidElement(wrap)
            ? cloneElement(wrap as ReactElement, {}, enhancedContent as ReactElement)
            : enhancedContent;

    return (
        <div
            className={cn(styles.root, align && styles[`align-${align}`])}
            {...rest}
        >
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
                    open
                    onClose={() => setSettingsOpen(false)}
                >
                    <Settings<T>
                        data={data}
                        settings={filteredSettings}
                        onChange={setData}
                    />
                </Drawer>
            }
        </div>
    );
}
