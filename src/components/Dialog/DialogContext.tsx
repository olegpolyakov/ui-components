import { ReactNode, createContext, useContext } from 'react';

import { noop } from '../../utils';
import useDialog from './useDialog';

type ContextShape = {
    showDialog: (
        title: string,
        getContent: (onClose: () => void) => JSX.Element,
        closeOnClickOutside?: boolean
    ) => void;
};

export const Context = createContext<ContextShape>({
    showDialog: noop
});

export default function DialogContext({
    children
}: {
    children: ReactNode;
}): JSX.Element {
    const [dialog, showDialog] = useDialog();

    return (
        <Context.Provider value={{ showDialog }}>
            {children}

            {dialog}
        </Context.Provider>
    );
}

export function useDialogContext(): ContextShape {
    return useContext(Context);
}