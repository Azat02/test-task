import { createReducer } from "@reduxjs/toolkit";
import {
    closeSidebar,
  openSidebar,
} from "./actions";
import { IUIState } from "./interfaces/data.interface";

export const initialState: IUIState = {
  sidebar: {
    data: null,
    open: false,
  },
};

export default createReducer<IUIState>(initialState, (buiilder) =>
  buiilder
    .addCase(
      openSidebar,
      (state): IUIState => ({
        ...state,
        sidebar: {
          ...state.sidebar,
          open: true,
        },
      })
    )
    .addCase(
        closeSidebar,
      (state): IUIState => ({
        ...state,
        sidebar: {
          ...state.sidebar,
          open: false,
        },
      })
    )
);