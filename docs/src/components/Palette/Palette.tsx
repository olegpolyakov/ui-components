import { Box, Flex, Heading } from '~/components';
import { Color as ColorType } from '~/types';

import vars from '~/styles/vars.module.scss';

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

            <Box color={name} variant="tinted" padding="xxs">
                <Flex gap="xxs" wrap>
                    {levels.map(level =>
                        <Color
                            key={level}
                            name={level.toString()}
                            value={vars[`${name}${level}`]}
                            style={{
                                backgroundColor: `var(--kui-${name}-${level}-color)`,
                                color: `var(--kui-${name}-${level}-contrast-color)`
                            }}
                        />
                    )}
                </Flex>
            </Box>
        </div>
    );
}