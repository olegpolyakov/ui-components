import { useContext } from 'react';
import { createPortal } from 'react-dom';

import type { ComponentProps } from '../../types';
import { ProviderContext } from '../Provider';

export type PortalProps = {
    container?: HTMLElement;
};

Portal.displayName = 'Portal';

export default function Portal({
    container = document.body,
    children
}: ComponentProps<PortalProps, 'div'>) {
    const { rootElement } = useContext(ProviderContext);

    return createPortal(
        children,
        rootElement || container
    );
}