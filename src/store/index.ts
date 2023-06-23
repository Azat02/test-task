import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import ui from "./ui/reducer";

const store = configureStore({
  reducer: {
    ui,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<AppState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;