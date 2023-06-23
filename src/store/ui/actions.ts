import { createAction } from "@reduxjs/toolkit";
import { IModal } from "./interfaces/data.interface";

export const openSidebar = createAction<IModal>("ui/openSidebar");
export const closeSidebar = createAction<void>("ui/closeSidebar");