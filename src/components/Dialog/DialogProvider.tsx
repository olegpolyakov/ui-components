import { ReactNode, useCallback, useMemo, useState } from 'react';

import Dialog, { DialogProps } from './Dialog';
import DialogContext from './DialogContext';

export default function DialogProvider({
    children
}: {
    children: ReactNode;
}) {
    const [dialogProps, setDialogProps] = useState<Partial<DialogProps> | null>(null);

    const onClose = useCallback(() => {
        setDialogProps(null);
    }, []);

    const showDialog = useCallback((
        title: string,
        getContent: (onClose: () => void) => ReactNode,
        closeOnClickOutside = false
    ) => {
        setDialogProps({
            title,
            content: getContent(onClose),
            closeOnClickOutside
        });
    }, [onClose]);

    const value = useMemo(() => ({
        showDialog
    }), [showDialog]);

    return (
        <DialogContext.Provider value={value}>
            {children}

            <Dialog
                {...dialogProps}
                onClose={onClose}
            />
        </DialogContext.Provider>
    );
}