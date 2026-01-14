import { flip, size as popoverSize } from '@floating-ui/react';

import type { ComponentProps } from '../../types';

import Popover, { PopoverProps } from '../Popover';

export type DropdownProps = PopoverProps & {
    maxHeight?: number;
};

Dropdown.displayName = 'Dropdown';

export default function Dropdown({
    className,
    children,

    open,
    content = children,
    trigger,
    maxHeight,
    ...props
}: ComponentProps<DropdownProps, 'div'>) {
    return (
        <Popover
            className={className}
            trigger={trigger}
            open={open}
            placement="bottom"
            fallbackPlacements={['top']}
            arrow={false}
            middleware={[
                flip(),
                popoverSize({
                    apply: ({ availableHeight, elements }) => {
                        elements.floating.style.width = elements.reference.getBoundingClientRect().width + 'px';

                        elements.floating.style.maxHeight = maxHeight
                            ? Math.min(availableHeight, maxHeight) + 'px'
                            : availableHeight + 'px';
                    }
                })
            ]}
            attached
            {...props}
        >
            {content}
        </Popover>
    );
}