import { createContext } from 'react';

export type TabsContext = {
    selectedValue?: unknown;
    setSelectedValue: (value: unknown) => void;
};

const noop = () => { return; };

export default createContext<TabsContext>({
    selectedValue: undefined,
    setSelectedValue: noop
});