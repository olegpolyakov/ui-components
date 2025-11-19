import { Input, Flex, Field, RadioGroup, Select, Switch } from '~/components';

export type Setting = {
    name: string;
    description: string;
    required: boolean;
    type: { name: string; raw?: string; value?: {value: string}[] };
    defaultValue?: null | { value: string };
};

export default function Settings<T extends Record<string, any> = Record<string, any>>({
    data,
    settings = [],
    onChange
}: {
    data: T;
    settings: Setting[];
    onChange: (data: T) => void
}) {
    return (
        <Flex column gap="m">
            {settings.map((setting, index) => (
                <Setting
                    key={index}
                    setting={setting}
                    data={data}
                    onChange={onChange}
                />
            ))}
        </Flex>
    );
}

function Setting<T extends Record<string, any> = Record<string, any>>({ setting, data, onChange }: {
    setting: Setting;
    data: T;
    onChange: (data: T) => void;
}) {
    const type = setting.type.raw === 'ReactNode'
        ? 'string'
        : setting.type.raw === 'boolean'
            ? 'boolean'
            : setting.type.name;
    
    return (
        <Field
            label={setting.name}
            required={setting.required}
        >
            {type === 'string' &&
                <Input
                    type="text"
                    name={setting.name}
                    value={data[setting.name]}
                    onChange={({ value }) => onChange({
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
                    onChange={({ value }) => onChange({
                        ...data,
                        [setting.name]: value
                    })}
                />
            }

            {type === 'boolean' && (
                <Switch
                    name={setting.name}
                    checked={data[setting.name]}
                    onChange={({ checked }) => onChange({
                        ...data,
                        [setting.name]: checked
                    })}
                />
            )}

            {type === 'enum' &&
                <Enum 
                    setting={setting}
                    data={data}
                    onChange={onChange}
                />
            }
        </Field>
    );
}

function Enum<T extends Record<string, any> = Record<string, any>>({
    setting,
    data,
    onChange
}: {
    setting: Setting;
    data: T;
    onChange: (data: T) => void
}) {
    const options = Array.isArray(setting.type.value)
        ? (setting.type.raw?.toLowerCase().includes('size')
            ? setting.type.value?.toSorted(sortSizeOptions)
            : setting.type.value
        ).map(option => ({
            key: option.value,
            label: option.value.replaceAll('"', ''),
            value: option.value.replaceAll('"', '')
        }))
        : [];

    return (setting.type.value?.length ?? 0) > 5 ? (
        <Select
            name={setting.name}
            value={data[setting.name]}
            options={options}
            onChange={({ value }) => onChange({
                ...data,
                [setting.name]: value
            })}
        />
    ) : (
        <RadioGroup
            name={setting.name}
            radios={options.map(option => ({
                ...option,
                key: option.key,
                checked: data[setting.name] === option.value,
                onChange: ({ value }) => onChange({
                    ...data,
                    [setting.name]: value
                })
            }))}
        />
    );
}

const sizeOrder = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'auto'];

function sortSizeOptions(a: {value: string}, b: {value: string}) {
    const aIndex = sizeOrder.indexOf(a.value.replaceAll('"', ''));
    const bIndex = sizeOrder.indexOf(b.value.replaceAll('"', ''));

    return aIndex - bIndex;
}