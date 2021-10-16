import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "app/store";
import { IListData } from "types";
import { fetchLists } from "./listsAPI";

export interface ListsState {
  value: IListData[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ListsState = {
  value: [],
  status: 'idle'
}

export const loadListsAsync = createAsyncThunk(
  'lists/fetchLists',
  fetchLists
);

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadListsAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loadListsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    });
  }
});

export const selectLists = (state: RootState) => state.lists.value;

export default listsSlice.reducer;