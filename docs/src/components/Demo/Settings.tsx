import { useEffect, useState } from 'react';

export type Setting = {
    type: 'boolean' | 'select' | 'text' | 'number';
    name: string;
    label: string;
    description?: string;
    defaultValue?: any;
    options?: any[];
};

const defaultValueByType: Record<string, any> = {
    boolean: false,
    select: '',
    color: '#000000',
    text: '',
    number: 0
};

export default function Settings<T extends Record<string, any> = Record<string, any>>({
    settings,
    onChange
}: {
    settings: Setting[];
    onChange?: (data: T) => void
}) {
    const [data, setData] = useState(settings.reduce((acc, setting) => {
        acc[setting.name] = setting.defaultValue ?? defaultValueByType[setting.type];
        return acc;
    }, {} as Record<string, any>));

    useEffect(() => {
        onChange?.(data as T);
    }, [data, onChange]);

    return (
        <div>
            {settings.map((setting, index) => (
                <fieldset key={index}>
                    {setting.label &&
                        <legend>{setting.label}</legend>
                    }

                    {setting.description &&
                        <p>{setting.description}</p>
                    }

                    {setting.type === 'text' &&
                        <input
                            type="text"
                            name={setting.name}
                            value={data[setting.name]}
                            onChange={e => setData({
                                ...data,
                                [setting.name]: e.target.value
                            })}
                        />
                    }

                    {setting.type === 'number' &&
                        <input
                            type="number"
                            name={setting.name}
                            value={data[setting.name]}
                            onChange={e => setData({
                                ...data,
                                [setting.name]: e.target.value
                            })}
                        />
                    }

                    {setting.type === 'boolean' && (
                        <input
                            type="checkbox"
                            name={setting.name}
                            checked={data[setting.name]}
                            onChange={e => setData({
                                ...data,
                                [setting.name]: e.target.checked
                            })}
                        />
                    )}

                    {setting.type === 'select' && setting.options && (
                        <select
                            name={setting.name}
                            value={data[setting.name]}
                            onChange={e => setData({
                                ...data,
                                [setting.name]: e.target.value
                            })}
                        >
                            {setting.options.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </fieldset>
            ))}
        </div>
    );
}