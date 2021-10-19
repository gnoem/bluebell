import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { RootState } from "app/store";
import { IListData } from "types";
import { createList, fetchLists, updateList } from "./listsAPI";

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

export const updateListAsync = createAsyncThunk(
  'lists/updateList',
  updateList
);

export const createListAsync = createAsyncThunk(
  'lists/createList',
  createList
);

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const updateStore = (store: WritableDraft<IListData>[], object: IListData): IListData[] => {
      const index = store.findIndex(list => list.id === object.id);
      if (index >= 0) store.splice(index, 1, object);
      return store;
    }
    builder
      .addCase(loadListsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadListsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(updateListAsync.fulfilled, (state, { payload }) => {
        state.value = updateStore(state.value, payload);
      })
      .addCase(createListAsync.fulfilled, (state, { payload }) => {
        state.value = updateStore(state.value, payload);
      });
  }
});

export const selectLists = (state: RootState) => state.lists.value;

export default listsSlice.reducer;