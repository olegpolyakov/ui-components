import { createContext } from 'react';

export type TabValue = string | number | readonly string[] | undefined;

export type TabsContext = {
    selectedValue?: TabValue;
    setSelectedValue: (value: TabValue) => void;
};

const noop = () => { return; };

export default createContext<TabsContext>({
    selectedValue: undefined,
    setSelectedValue: noop
});