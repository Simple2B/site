"use client"

import { createContext, useContext } from 'react';

interface IContextState {
  modalActive: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const defaultContextState: IContextState = {
  modalActive: false,
  openModal: () => { },
  closeModal: () => { },
};

export const AppContext = createContext(defaultContextState);

export const useAppContext = () => {
  return useContext(AppContext);
};
