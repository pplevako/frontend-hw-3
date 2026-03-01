import { createContext, useContext } from 'react';

import RootStore from './RootStore';

const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
