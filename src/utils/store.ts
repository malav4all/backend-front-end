import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";

const loadState = () => {
  try {
    const loadedState = localStorage.getItem("state");
    if (loadedState === null) return undefined;
    return JSON.parse(loadedState);
  } catch (error: any) {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
