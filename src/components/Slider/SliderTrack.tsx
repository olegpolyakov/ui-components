import { forwardRef } from 'react';

import { classnames as cn } from '../../utils';

import cssClasses from './Slider.module.scss';

export type SliderTrackProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    discrete?: boolean;
    marks?: boolean;
};

const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(({
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    discrete,
    marks
}, ref) => {
    const style = {
        transform: `scaleX(${(value - min) / (max - min)})`
    };

    return (
        <div ref={ref} className={cssClasses.track}>
            <div className={cssClasses.trackActive} />

            <div className={cssClasses.trackInactive}>
                <div
                    className={cssClasses.trackActiveFill}
                    style={style}
                />
            </div>

            {discrete && marks &&
                <div className={cssClasses.trackMarks}>
                    {Array.from(new Array((max - min) / step + 1))
                        .map((_, i) => step * i + Number(min))
                        .map(tickValue =>
                            <div
                                key={tickValue}
                                data-value={tickValue}
                                className={
                                    cn({
                                        [cssClasses.TICK_MARK_ACTIVE]: tickValue <= value,
                                        [cssClasses.TICK_MARK_INACTIVE]: tickValue > value
                                    })
                                }
                            />
                        )
                    }
                </div>
            }
        </div>
    );
});

SliderTrack.displayName = 'SliderTrack';

export default SliderTrack;