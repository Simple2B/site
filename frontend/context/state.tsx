import { createContext, useContext } from "react";

const defaultContextState = {
  modalActive: false,
  openModal: () => {},
  closeModal: () => {},
};

export const AppContext = createContext(defaultContextState);

export const useAppContext = () => {
  return useContext(AppContext);
};
