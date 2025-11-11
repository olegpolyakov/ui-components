import { Flex, Heading } from '~/components';
import { Color as ColorType } from '~/types';
import styles from '~/styles/export.module.scss';

import Color from '@/components/Color';

const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Palette({
    name
}: {
    name: ColorType;
}) {
    return (
        <div>
            <Heading content={name} size="xs" />

            <Flex wrap>
                {levels.map(level =>
                    <Color
                        key={level}
                        name={level.toString()}
                        value={styles[`${name}${level}`]}
                        style={{
                            backgroundColor: `var(--kui-${name}-${level}-color)`,
                            color: `var(--kui-on-${name}-${level}-color)`
                        }}
                    />
                )}
            </Flex>
        </div>
    );
}