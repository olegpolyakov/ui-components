import { createPortal } from 'react-dom';

import type { ComponentProps } from '../../types';

export type PortalProps = {
    container?: HTMLElement;
};

Portal.displayName = 'Portal';

export default function Portal({
    container = document.body,
    children
}: ComponentProps<PortalProps, 'div'>) {
    return createPortal(
        container === document.body
            ? children
            : children,
        container
    );
}