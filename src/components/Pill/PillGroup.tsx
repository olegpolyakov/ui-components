import { forwardRef } from 'react';

import type { HTMLDivProps, PropsWithChildren, PropsWithKey } from '../../types';
import { classnames as cn, getElementClassNames } from '../../utils';

import Pill, { type PillProps } from './Pill';

import cssClasses from './PillGroup.scss';

export type PillGroupProps = PropsWithChildren<{
    as?: 'div';
    pills?: PropsWithKey<PillProps>[];
    shape?: PillProps['shape'];
    size?: PillProps['size'];
    variant?: PillProps['variant'];
    maxCount?: number;
    interactive?: boolean;
}, HTMLDivProps>;

// TODO: Add sequential colors

const displayName = 'PillGroup';
const elementClassNames = getElementClassNames(displayName);

const PillGroup = forwardRef<HTMLDivElement, PillGroupProps>(({
    pills = [],
    shape,
    size,
    variant,
    maxCount = 0,
    interactive,

    as: Tag = 'div',
    className,
    children,
    ...props
}, ref) => {
    const shownPills = (maxCount > 0 && pills.length > maxCount) ?
        pills.slice(0, maxCount) : pills;
    const hiddenPillsCount = pills.length - shownPills.length;
    
    const classNames = cn(
        className,
        elementClassNames.root,
        cssClasses.root
    );

    return (
        <Tag ref={ref} className={classNames} {...props}>
            {shownPills?.map(pill =>
                <Pill
                    key={pill.key}
                    shape={shape}
                    size={size}
                    variant={variant}
                    interactive={interactive}
                    {...pill}
                />
            )}

            {hiddenPillsCount > 0 &&
                <Pill
                    content={`+${hiddenPillsCount}`}
                    shape={shape}
                    size={size}
                    variant={variant}
                />
            }

            {children}
        </Tag>
    );
});

PillGroup.displayName = displayName;

export default PillGroup;