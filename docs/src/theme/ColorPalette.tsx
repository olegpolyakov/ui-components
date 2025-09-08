import React from 'react';

import { Flex, Heading, Provider } from '@/lib';

import Color from './Color';

const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ColorPalette({
    color
}: {
    color: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
}) {
    return (
        <Provider>
            <Heading>{color}</Heading>

            <Flex>
                {levels.map(level =>
                    <Color
                        key={level}
                        style={{
                            backgroundColor: `var(--ui-${color}-${level}-color)`,
                            color: `var(--ui-on-${color}-${level}-color)`
                        }}
                    >
                        {level}
                    </Color>
                )}
            </Flex>
        </Provider>
    );
}