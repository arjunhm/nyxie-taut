import { createSlice } from '@reduxjs/toolkit';

const currentTabSlice = createSlice({
  name: 'currentTab',
  initialState: { tab: 'blog', page: 1, from: 0, to: 5 },
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeFromAndTo: (state, action) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
  },
});

export const { changeTab, changePage, changeFromAndTo } =
  currentTabSlice.actions;
export default currentTabSlice.reducer;
