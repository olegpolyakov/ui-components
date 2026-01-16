import { Flex, Heading } from '~/components';
import { PaletteColor as ColorType } from '~/types';

import Color from '@/components/Color';


const levels = new Array(11).fill(null).map((_, i) => i);

export default function Palette({
    name,
    alpha = true
}: {
    name: ColorType;
    alpha?: boolean;
}) {
    return (
        <Flex column gap="m">
            <Flex column gap="xxs">
                <Heading content={name} size="xs" capitalize />

                <Flex gap="xxs" wrap>
                    {levels.map(level =>
                        <Color
                            key={level}
                            name={level.toString()}
                            style={{
                                backgroundColor: `var(--kui-${name}-${level}-color)`,
                                color: `var(--kui-${name}-${level}-contrast-color)`
                            }}
                        />
                    )}
                </Flex>

                {alpha &&
                    <Flex gap="xxs" wrap>
                        {levels.map(level =>
                            <Color
                                key={level}
                                name={`a${level.toString()}`}
                                style={{
                                    backgroundColor: `var(--kui-${name}-a${level}-color)`,
                                    color: `var(--kui-${name}-a${level}-contrast-color)`
                                }}
                            />
                        )}
                    </Flex>
                }
            </Flex>
        </Flex>
    );
}