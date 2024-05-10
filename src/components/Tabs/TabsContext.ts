import { createContext } from 'react';

export type TabsContext = {
    selectedValue?: unknown;
    setSelectedValue: (value: any) => void;
};

const noop = () => { return; };

export default createContext<TabsContext>({
    selectedValue: undefined,
    setSelectedValue: noop
});