import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "app/store";
import { IGenericSection, AllSectionNames, AppSection, AppSections, DynamicSectionNames } from "config";
import { mainAppSections, getSectionByComponentName } from "./config";

export interface NavigationState {
  value: AppSection;
}

const initialState: NavigationState = {
  value: mainAppSections[0]
}

export const seeection = <Name extends AllSectionNames>(name: Name, value: Omit<IGenericSection<Name>, 'componentName'>): IGenericSection<Name> => ({
  componentName: name,
  ...value
});

// why is AppSections[Name] a union with & instead of |

export const section = <Name extends AllSectionNames>(
  ...args: Name extends DynamicSectionNames ? [name: Name, value: Omit<AppSections[Name], 'componentName'>] : [name: Name]
): AppSection => {
  const [name, value] = args;
  return {
    componentName: name,
    title: name, // ?
    ...value
  }
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goto: (state, action: PayloadAction<AppSection>) => {
      const { componentName, title, data } = action.payload;
      const section = getSectionByComponentName(componentName) ?? state.value;
      state.value = {
        componentName,
        title: title ?? section.title ?? ':)', // todo add fallback title
        data
      }
    }
  }
});

export const { goto } = navigationSlice.actions;

export const selectSection = (state: RootState) => state.navigation.value;

export default navigationSlice.reducer;