import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "app/store";
import * as ComponentList from "./components";

export type ComponentName = keyof ComponentList.IModalProps;

interface IModalValue<Name extends ComponentName> {
  name: Name;
  data: ComponentList.PropsFor<Name>;
}

export type ModalValue = IModalValue<ComponentName>;

export interface ModalState {
  value: ModalValue | null;
  status: 'idle' | 'goodbye';
}

const initialState: ModalState = {
  value: null,
  status: 'idle'
}

/**
 * Reducer payload wrapper that returns the exact same input it's given, but UNLIKE passing the payload object into the reducer directly (i.e. without the wrapper), this will throw a TS error if the 'data' arg is inconsistent with the 'name' arg. E.g., if 'name' is "ConfirmDeleteList", then 'data' will include a 'list' object; if 'name' is "ConfirmDeleteUser", then 'data' will include a 'user' object.
 */
export const getModal = <Name extends ComponentName>(value: IModalValue<Name>): IModalValue<Name> => value;

export const modalSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalValue>) => {
      state.value = action.payload;
      state.status = 'idle';
    },
    closeModal: (state) => {
      state.status = 'goodbye';
    },
    disposeModal: (state) => {
      state.value = null;
      state.status = 'idle';
    }
  }
});

export const { openModal, closeModal, disposeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.value;
export const selectModalStatus = (state: RootState) => state.modal.status;

export default modalSlice.reducer;