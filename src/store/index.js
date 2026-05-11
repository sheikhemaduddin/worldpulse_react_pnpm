import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import uiReducer from "./slices/uiSlice";
export const store = configureStore({ reducer: { news: newsReducer, ui: uiReducer } });