import { ReactNode, createContext, useContext } from 'react';

import { noop } from '../../utils';
import type { DialogProps } from './Dialog';

export type DialogContext = {
    openDialog: (
        props: Partial<DialogProps>,
        getContent: (onClose: () => void) => ReactNode,
    ) => void;
    closeDialog: () => void;
};

const DialogContext = createContext<DialogContext>({
    openDialog: noop,
    closeDialog: noop
});

export function useDialogContext(): DialogContext {
    return useContext(DialogContext);
}

export default DialogContext;