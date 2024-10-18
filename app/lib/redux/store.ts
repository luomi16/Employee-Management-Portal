// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import employeeReducer from "./slices/employeeSlice";
import userReducer from "./slices/userSlice";
import documentReducer from "./slices/documentSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer,
    document: documentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
