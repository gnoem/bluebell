import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import listsReducer from '../features/lists/listsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navigation: navigationReducer,
    lists: listsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
