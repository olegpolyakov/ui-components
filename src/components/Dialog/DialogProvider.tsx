import { ReactNode, useCallback, useMemo, useState } from 'react';

import Dialog, { DialogProps } from './Dialog';
import DialogContext from './DialogContext';

export default function DialogProvider({
    children
}: {
    children: ReactNode;
}) {
    const [props, setProps] = useState<Partial<DialogProps> | null>(null);

    const closeDialog = useCallback(() => {
        setProps({
            open: false
        });
    }, []);

    const openDialog = useCallback((
        props: Partial<DialogProps>,
        getContent: (onClose: () => void) => ReactNode
    ) => {
        setProps({
            ...props,
            open: true,
            content: getContent(closeDialog)
        });
    }, [closeDialog]);

    const value = useMemo(() => ({
        openDialog,
        closeDialog
    }), [openDialog, closeDialog]);

    return (
        <DialogContext.Provider value={value}>
            {children}

            <Dialog
                {...props}
                onClose={closeDialog}
            />
        </DialogContext.Provider>
    );
}