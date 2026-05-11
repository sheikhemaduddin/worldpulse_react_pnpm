import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: { darkMode: false, searchQuery: "", activeCategory: "all" },
  reducers: {
    toggleDark(s) { s.darkMode = !s.darkMode; document.body.classList.toggle("dark", !s.darkMode ? false : true); },
    setSearch(s, { payload }) { s.searchQuery = payload; },
    setCategory(s, { payload }) { s.activeCategory = payload; },
  },
});
export const { toggleDark, setSearch, setCategory } = uiSlice.actions;
export default uiSlice.reducer;