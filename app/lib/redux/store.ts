// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import employeeReducer from "./slices/employeeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
