import { useCallback, useMemo, useState } from 'react';

import Dialog, { DialogProps } from './Dialog';

export default function useDialog(): [JSX.Element | null, (title: string, showDialog: (onClose: () => void) => JSX.Element) => void] {
    const [dialogProps, setDialogProps] = useState<Partial<DialogProps> | null>(null);

    const onClose = useCallback(() => {
        setDialogProps(null);
    }, []);

    const dialog = useMemo(() => {
        if (dialogProps === null) return null;

        const { title, content, closeOnClickOutside } = dialogProps;

        return (
            <Dialog
                title={title}
                onClose={onClose}
                open
                closeOnClickOutside={closeOnClickOutside}
            >
                {content}
            </Dialog>
        );
    }, [dialogProps, onClose]);

    const showDialog = useCallback((
        title: string,
        getContent: (onClose: () => void) => JSX.Element,
        closeOnClickOutside = false
    ) => {
        setDialogProps({
            title,
            content: getContent(onClose),
            closeOnClickOutside
        });
    }, [onClose]);

    return [dialog, showDialog];
}