import { useContext } from 'react';

import DialogContext, { type DialogContext as DialogContextValue } from './DialogContext';

export function useDialogContext(): DialogContextValue {
    return useContext(DialogContext);
}