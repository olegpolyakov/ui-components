import { ReactNode, createContext } from 'react';

import { noop } from '../../utils';

export type DialogContext = {
    showDialog: (
        title: string,
        getContent: (onClose: () => void) => ReactNode,
        closeOnClickOutside?: boolean
    ) => void;
};

export default createContext<DialogContext>({
    showDialog: noop
});