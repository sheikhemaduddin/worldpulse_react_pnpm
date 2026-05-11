import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: { bookmarks: [], readArticles: [] },
  reducers: {
    toggleBookmark(state, { payload }) {
      const idx = state.bookmarks.indexOf(payload);
      if (idx >= 0) state.bookmarks.splice(idx, 1);
      else state.bookmarks.push(payload);
    },
    markRead(state, { payload }) {
      if (!state.readArticles.includes(payload)) state.readArticles.push(payload);
    },
  },
});
export const { toggleBookmark, markRead } = newsSlice.actions;
export default newsSlice.reducer;