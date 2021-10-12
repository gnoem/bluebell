import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { mainAppSections, getSectionByComponentName, IAppSection } from "../../config";
import { Obj } from "../../types";

export interface NavigationState {
  value: IAppSection;
  data?: Obj; 
}

const initialState: NavigationState = {
  value: mainAppSections[0],
}

interface INavPayload {
  componentName: string;
  sectionTitle?: string;
  data?: Obj;
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goto: (state, action: PayloadAction<INavPayload>) => {
      const { componentName, sectionTitle, data } = action.payload;
      const section = getSectionByComponentName(componentName) ?? state.value;
      state.value = {
        componentName,
        title: sectionTitle ?? section.title ?? ':)' // todo add fallback title
      } ?? state.value; // todo add fallback "Something went wrong" section
      state.data = data ?? {}; // todo think about if there's any reason we'd want to keep the previous state's data unless new data is specified
    }
  }
});

export const { goto } = navigationSlice.actions;

export const selectSection = (state: RootState) => state.navigation.value;
export const selectSectionData = (state: RootState) => state.navigation.data;

export default navigationSlice.reducer;