import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { appSections, getSectionByTitle, IAppSection } from "../../config";
import { Obj } from "../../types";

export interface NavigationState {
  value: IAppSection;
  data?: Obj;
}

const initialState: NavigationState = {
  value: appSections[0],
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goto: (state, action: PayloadAction<string>, data?: Obj) => {
      state.value = getSectionByTitle(action.payload) ?? state.value;
      state.data = data ?? {}; // todo think about if there's any reason we'd want to keep the previous state's data unless new data is specified
    }
  }
});

export const { goto } = navigationSlice.actions;

export const selectSection = (state: RootState) => state.navigation.value;

export default navigationSlice.reducer;