import { useAppSelector } from './../index';
import { IModal } from "./interfaces/data.interface";

export const useSidebar = (): IModal => {
  return useAppSelector((state) => state.ui.sidebar);
};

