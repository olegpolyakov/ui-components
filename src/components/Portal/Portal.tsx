import { createPortal } from 'react-dom';

import type { Children } from '../../types';

import Provider from '../Provider';

export type PortalProps = {
    container?: HTMLElement;
    children: Children;
};

Portal.displayName = 'Portal';

export default function Portal({
    container = document.body,
    children
}: PortalProps) {
    return createPortal(
        container === document.body ? (
            <Provider>
                {children}
            </Provider>
        ) : children,
        container
    );
}