import type { ComponentProps } from '../../types';
import { classnames as cn } from '../../utils';

import styles from './SliderTrack.module.scss';

export type SliderTrackProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    discrete?: boolean;
    marks?: boolean;
};

SliderTrack.displayName = 'SliderTrack';

export default function SliderTrack({
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    discrete,
    marks,
    ...props
}: ComponentProps<SliderTrackProps, 'div'>) {
    const style = {
        transform: `scaleX(${(value - min) / (max - min)})`
    };

    return (
        <div className={styles.root} {...props}>
            <div className={styles.active} />

            <div className={styles.inactive}>
                <div
                    className={styles.activeFill}
                    style={style}
                />
            </div>

            {discrete && marks &&
                <div className={styles.trackMarks}>
                    {Array.from(new Array((max - min) / step + 1))
                        .map((_, i) => step * i + Number(min))
                        .map(tickValue =>
                            <div
                                key={tickValue}
                                data-value={tickValue}
                                className={
                                    cn({
                                        [styles.markActive]: tickValue <= value,
                                        [styles.markInactive]: tickValue > value
                                    })
                                }
                            />
                        )
                    }
                </div>
            }
        </div>
    );
}