import { createPortal } from 'react-dom';

import type { Children } from '../../types';

import Provider from '../Provider';

export type PortalProps = {
    container?: HTMLElement;
    children: Children;
};

const displayName = 'Portal';

const Portal = ({
    container = document.body,

    children
}: PortalProps) => {
    return createPortal(
        container === document.body ? (
            <Provider>
                {children}
            </Provider>
        ) : children,
        container
    );
};

Portal.displayName = displayName;

export default Portal;