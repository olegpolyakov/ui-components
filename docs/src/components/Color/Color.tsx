import { Flex, Text } from '~/components';
import { classnames as cn } from '~/utils';

import styles from './Color.module.scss';

export default function Color({
    name,
    value,
    dark,
    light,
    ...props
}: {
    name: string;
    value: string;
    dark?: boolean;
    light?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(styles.root, {
                [styles.dark]: dark,
                [styles.light]: light
            })}
            style={{ backgroundColor: value }}
            {...props}
        >
            <Flex column gap="xs" align="center">
                <Text
                    content={name}
                    color="inherit"
                    size="m"
                />
            
                <Text
                    content={value}
                    color="inherit"
                    size="xs"
                    muted
                />
            </Flex>
        </div>
    );
}