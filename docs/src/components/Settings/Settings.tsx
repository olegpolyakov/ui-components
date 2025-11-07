import { useEffect, useState } from 'react';

import { Input, Flex, Field, RadioGroup, Select, Switch } from '~/components';

export type Setting = {
    name: string;
    description: string;
    required: boolean;
    type: { name: string; raw?: string; value?: {value: string}[] };
    defaultValue?: null | { value: string };
};

const forbiddenSettingNames = ['as', 'items'];

export default function Settings<T extends Record<string, any> = Record<string, any>>({
    data: initialData,
    settings = {},
    onChange
}: {
    data?: T;
    settings?: Record<string, Setting>;
    onChange?: (data: T) => void
}) {
    console.log({ initialData });
    const filteredSettings = Object.values(settings)
        .filter(setting => !forbiddenSettingNames.includes(setting.name) && !setting.name.startsWith('on'));

    const [data, setData] = useState(() => {
        return filteredSettings
            .reduce((acc, setting) => {
                acc[setting.name] = setting.defaultValue?.value ?? initialData?.[setting.name] ?? undefined;
                return acc;
            }, {} as Record<string, any>);
    });

    useEffect(() => {
        onChange?.(data as T);
    }, [data, onChange]);

    return (
        <Flex column gap="m">
            {filteredSettings.map((setting, index) => (
                <Setting
                    key={index}
                    setting={setting}
                    data={data}
                    setData={setData}
                />
            ))}
        </Flex>
    );
}

function Setting({ setting, data, setData }: {
    setting: Setting;
    data: Record<string, any>;
    setData: (data: Record<string, any>) => void;
}) {
    const type = setting.type.raw === 'ReactNode'
        ? 'string'
        : setting.type.raw === 'boolean'
            ? 'boolean'
            : setting.type.name;
    
    return (
        <Field label={setting.name} description={setting.description} required={setting.required}>
            {type === 'string' &&
                <Input
                    type="text"
                    name={setting.name}
                    value={data[setting.name]}
                    onChange={({ value }) => setData({
                        ...data,
                        [setting.name]: value
                    })}
                />
            }

            {type === 'number' &&
                <Input
                    type="number"
                    name={setting.name}
                    value={data[setting.name]}
                    onChange={({ value }) => setData({
                        ...data,
                        [setting.name]: value
                    })}
                />
            }

            {type === 'boolean' && (
                <Switch
                    name={setting.name}
                    checked={data[setting.name]}
                    onChange={({ checked }) => setData({
                        ...data,
                        [setting.name]: checked
                    })}
                />
            )}

            {type === 'enum' && (Array.isArray(setting.type.value)
                ? setting.type.value.length > 5 ? (
                    <Select
                        name={setting.name}
                        value={data[setting.name]}
                        options={setting.type.value?.map(option => ({
                            key: option.value,
                            label: option.value.replaceAll('"', ''),
                            value: option.value.replaceAll('"', '')
                        }))}
                        onChange={({ value }) => setData({
                            ...data,
                            [setting.name]: value
                        })}
                    />
                ) : (
                    <RadioGroup
                        name={setting.name}
                        radios={setting.type.value?.map(option => ({
                            key: option.value,
                            label: option.value.replaceAll('"', ''),
                            value: option.value.replaceAll('"', ''),
                            checked: data[setting.name] === option.value.replaceAll('"', ''),
                            onChange: ({ value }) => setData({
                                ...data,
                                [setting.name]: value
                            })
                        }))}
                    />
                ) : null)}
        </Field>
    );
}