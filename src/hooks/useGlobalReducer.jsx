import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, actions as createActions } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  // Bind actions con dispatch y store
  const boundActions = createActions(dispatch, () => store);

  return (
    <StoreContext.Provider value={{ store, dispatch, actions: boundActions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const { store, dispatch, actions } = useContext(StoreContext);
  return { store, dispatch, actions };
}
